const express = require("express");
const navegateRoutes = require('./src/routes/primary.routes');
const testRoutes = require('./src/routes/test.routes');
const app = express();

app.use('/', navegateRoutes);
app.use('/test', testRoutes);

app.listen(8081, ()=>{
    console.log("Servidor online na url: http:/localhost:8081");
});
