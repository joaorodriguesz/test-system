const express = require("express");
const navegateRoutes = require('./src/routes/primary.routes');
const testRoutes = require('./src/routes/test.routes');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
global.token = false;

// Teamplate Engine
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '/src', 'views'));

//  Directories 
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/src'));
    app.use(express.static(__dirname + '/data'));

// Session
    app.use(session({
        secret: 'meu-segredo',
        resave: true,
        saveUninitialized: true,
    }));
  
// middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

//  Routes
    app.use('/', navegateRoutes);
    app.use('/test', testRoutes);

app.listen(8080, ()=>{
    console.log("Online: http://localhost:8080");
});
