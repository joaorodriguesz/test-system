const mongoose = require("mongoose");

const { Schema } = mongoose;

const { testSchema } = require("./Test");

const testResultSchema = new Schema({
        test: {
            type: testSchema,
            required: true
        },
        answeredQuestionsCount: {
            type: Number,
            required: true
        },
        correctQuestionsCount: {
            type: Number,
            required: true
        },
        questionsCount: {
            type: Number,
            required: true
        },
    },
    {timestamps: true}
);

const TestResult = mongoose.model("TestResult", testResultSchema);
module.exports = TestResult;




