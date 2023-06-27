const { Test } = require('../models/Test');

const testController  = {
    
    create: async(req, res) => {
        try {
            const test = {
                title: req.body.title,
                questions: req.body.questions,
            };

            const response = await TestModel.create(test);
            
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const tests = await  TestModel.find();

            res.json(tests)
        } catch (error) {
            console.error(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const test = await TestModel.findById(id);
            
            if(!test){
                return res.status(404).json("Register not found");
            }

            res.json(test)
        } catch (error) {
            console.error(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const test = await TestModel.findById(id);
    
            if(!test){
                return res.status(404).json("Register not found");
            }

            const deleteTest = await TestModel.findByIdAndDelete(id);

            res.status(200).json(deleteTest);
        } catch (error) {
            console.error(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const test = {
                title: req.body.title,
                questions: req.body.questions,
            };

            const updatedTest = await TestModel.findByIdAndUpdate(id, test);

            if(!test){
                return res.status(404).json("Register not found");
            }

            res.status(200).json(test);

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = testController;