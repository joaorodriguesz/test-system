const mongoose = require("mongoose");
const URL_CONECTION = require("./urlConection");

async function main() {
    try {

        mongoose.set("strictQuery", true)
        await mongoose.connect(URL_CONECTION);
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;