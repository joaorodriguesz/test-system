const mongoose = require("mongoose");

async function main() {
    try {

        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb+srv://systemowner:systemowner@systemowner.kys0noh.mongodb.net/?retryWrites=true&w=majority");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;