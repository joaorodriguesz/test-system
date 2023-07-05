const { Question } = require("../models/Question");

const questionController = {
    create: async (req, res) => {
        try {
            const question = {
                description: req.body.description,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                optionE: req.body.optionE,
                correctOption: req.body.correctOption,
            };

            const response = await Question.create(question);

            res.status(201).json(response);
        } catch (error) {
            console.error(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const questions = await Question.find();

            res.json(questions)
        } catch (error) {
            console.error(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const question = await Question.findById(id);

            if (!question) {
                return res.status(404).json("Register not found");
            }

            res.json(question)
        } catch (error) {
            console.error(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const question = await Question.findById(id);

            if (!question) {
                return res.status(404).json("Register not found");
            }

            const deleteQuestion = await Question.findByIdAndDelete(id);

            res.status(200).json(deleteQuestion);
        } catch (error) {
            console.error(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const question = {
                description: req.body.description,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                optionE: req.body.optionE,
                correctOption: req.body.correctOption,
            };

            const updatedQuestion = await Question.findByIdAndUpdate(id, question);

            if (!updatedQuestion) {
                return res.status(404).json("Register not found");
            }

            res.status(200).json(question);

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = questionController;