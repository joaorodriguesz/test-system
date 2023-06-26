const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema({
        description: {
            type: String,
            required: true
        },
        optionA: {
            type: String,
            required: true
        },
        optionB: {
            type: String,
            required: true
        },
        optionC: {
            type: String,
            required: true
        },
        optionD: {
            type: String,
            required: true
        },
        optionE: {
            type: String,
            required: true
        },
        correctOption: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = {
    Question,
    questionSchema
}