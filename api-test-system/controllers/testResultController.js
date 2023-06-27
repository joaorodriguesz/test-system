const TestResult = require('../models/TestResult');

const testResultController  = {
    
    create: async(req, res) => {
        try {
            const testResult = {
                title: req.body.title,
                questions: req.body.questions,
            };

            const response = await TestResult.create(testResult);
            
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const tests = await  TestResult.find();

            res.json(tests)
        } catch (error) {
            console.error(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const testResult = await TestResult.findById(id);
            
            if(!testResult){
                return res.status(404).json("Register not found");
            }

            res.json(testResult)
        } catch (error) {
            console.error(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const testResult = await TestResult.findById(id);
    
            if(!testResult){
                return res.status(404).json("Register not found");
            }

            const deleteTest = await TestResult.findByIdAndDelete(id);

            res.status(200).json(deleteTest);
        } catch (error) {
            console.error(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const testResult = {
                title: req.body.title,
                questions: req.body.questions,
            };

            const updatedTest = await TestResult.findByIdAndUpdate(id, testResult);

            if(!testResult){
                return res.status(404).json("Register not found");
            }

            res.status(200).json(testResult);

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = testResultController;