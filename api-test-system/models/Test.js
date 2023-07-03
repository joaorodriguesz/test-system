const mongoose = require("mongoose");

const { Schema } = mongoose;

const { questionSchema } = require("./Question");

const testSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        questions:{
            type: [questionSchema],
            required: true,
        }
    },
    {timestamps: true}
);

const Test = mongoose.model("Test", testSchema);
module.exports = {
    Test,
    testSchema
}
