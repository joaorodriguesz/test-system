const express = require("express");
const navegateRoutes = require('./src/routes/primary.routes');
const testRoutes = require('./src/routes/test.routes');

const app = express();

//Directories 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));

//Routes
app.use('/', navegateRoutes);
app.use('/test', testRoutes);

app.listen(8081, ()=>{
    console.log("Online: http://localhost:8081");
});
