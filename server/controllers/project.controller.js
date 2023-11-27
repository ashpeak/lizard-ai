const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const connectDB = require('../configs/db');

const project = {};

project.create = async (req, res) => {
    try {
        const token = req.headers.token;
        if(!token) return res.status(401).json({ msg: "Unauthorized" });
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        const { name, idea, isAiGenerated } = req.body;

        if (!name || (isAiGenerated && !idea)) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        await connectDB();

        const newProject = await Project.create({
            name,
            user: id
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
        if(!token) return res.status(401).json({ msg: "Unauthorized" });

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

module.exports = project;