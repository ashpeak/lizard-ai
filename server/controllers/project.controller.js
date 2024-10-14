const Project = require('../models/Project');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const connectDB = require('../configs/db');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const project = {};

const generateScript = (idea, language) => {

    const prompt = `Create a professional, 60-second YouTube Shorts script titled '${idea}' The output should be an array of objects where each object represents a scene, concise fact. Each object should contain a 'text' field. The tone should be educational and professional, targeted at a general audience. Keep the language simple yet accurate and ensure that the overall length fits within 60 seconds when spoken at a moderate pace.\n\nOutput format:\n\nAn improved and better title with title field and an Array of objects with a Text field containing a short, engaging fact.\n\n-The tone is professional.\n-The script is in ${language}.\n-The duration is 60 seconds.`;

    return new Promise((resolve, reject) => {
        try {
            model.generateContent(prompt)
            .then(result => {
                console.log(result.response.text());                
                let parsed = JSON.parse(result.response.text().slice(7, -3));
                console.log(parsed);                
                resolve(parsed);
            }).catch(error => {
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

        let script = null;
        if (template === "idea") {
            if (idea.length > 600) {
                return res.status(400).json({ message: 'Idea must be less than 600 characters.' });
            }

            script = await generateScript(idea, language);
        }
        await connectDB();

        const scenes = script ? script.scenes.map((scene) => {
            return {
                dialogue: scene.text,
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
            name: script ? script.title : name,
            user: id,
            script: scenes,
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