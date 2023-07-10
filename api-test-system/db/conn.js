const mongoose = require("mongoose");

async function main() {
    try {

        mongoose.set("strictQuery", true)
        await mongoose.connect("");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
