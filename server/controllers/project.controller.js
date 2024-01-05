const Project = require('../models/Project');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const connectDB = require('../configs/db');
const axios = require('axios');

const project = {};

const generateScript = (idea, language) => {
    return new Promise((resolve, reject) => {
        try {
            let headersList = {
                "Accept": "*/*",
                "origin": "https://scripai.com",
                "pragma": "no-cache",
                "referer": "https://scripai.com/yt-shorts-script",
                "sec-ch-ua-platform": '"Windows"',
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({ "prompt": { "title": idea, "description": "", "keywords": "", "language": language, "tone": "Professional", "time": "30-to-60 seconds" }, "slug": "yt-shorts-script" });

            let reqOptions = {
                url: "https://scripai.com/api/getGPTdata",
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }

            let response = axios.request(reqOptions)
                .then((response) => {
                    resolve(response.data.result);
                }
                ).catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    });
}

project.create = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ message: "Unauthorized" });

        const { name, idea, template, language } = req.body;

        if (!name || (template !== "empty" && !idea)) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        let scenes = null;
        if (template === "idea") {
            if (idea.length > 600) {
                return res.status(400).json({ message: 'Idea must be less than 600 characters.' });
            }

            const line = await generateScript(idea, language);
            scenes = line.split(/\n+/);
        }
        await connectDB();

        const script = scenes ? scenes.map((scene) => {
            return {
                dialogue: scene,
                image: '',
                type: '',
                download: '',
                height: 'auto'
            }
        }) : [{
            dialogue: '',
            image: '',
            type: '',
            download: '',
            height: 'auto'
        }];

        const newProject = await Project.create({
            name,
            user: id,
            script: script,
            language,
        });

        if (!newProject) return res.status(500).json({ message: 'Internal server error.' });

        res.status(200).json({ message: 'Project created successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

project.getAll = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        await connectDB();
        const projects = await Project.find({ user: id });

        if (!projects) return res.status(500).json({ message: 'No projects found' });

        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

project.getById = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ message: "Unauthorized" });

        await connectDB();
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found.' });

        if (project.user.toString() !== id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

project.delete = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        await connectDB();

        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found.' });

        if (project.user.toString() !== id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await Project.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(id, { $pull: { projects: req.params.id } });

        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Save project
project.update = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        let { script, music, voiceover, subtitlePosition, bgMusic, voiceoverModel } = req.body;

        if (!script || script.length < 1) return res.status(400).json({ message: 'Add atleast 1 scene.' });
        if (!bgMusic || !bgMusic.preview || !bgMusic.name) bgMusic = { preview: '', name: '' };

        await connectDB();

        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found.' });

        if (project.user.toString() !== id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            $set: {
                script,
                music,
                voiceover,
                subtitlePosition,
                bgMusic,
                voiceoverModel
            }
        }, { new: true });

        if (!updatedProject) return res.status(500).json({ message: 'Internal server error.' });
        
        res.status(200).json({ message: 'Project saved successfully.' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = project;