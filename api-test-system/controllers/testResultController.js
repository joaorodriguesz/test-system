const TestResult = require('../models/TestResult');
const { Test } = require('../models/Test');

const testResultController  = {
    
    create: async(req, res) => {

        try {
            const testResult = {
                studantName: req.body.studantName,
                test: await Test.findById(req.params.idTest),
                answeredQuestionsCount: req.body.answeredQuestionsCount,
                correctQuestionsCount: req.body.correctQuestionsCount,
                questionsCount: req.body.questionsCount
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
            const id = req.params.idResult;
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
            const id = req.params.idResult;
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
            const id = req.params.idResult;

            const testResult = {
                studantName: req.body.studantName,
                test: await Test.findById(req.params.idTest),
                answeredQuestionsCount: req.body.answeredQuestionsCount,
                correctQuestionsCount: req.body.correctQuestionsCount,
                questionsCount: req.body.questionsCount
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