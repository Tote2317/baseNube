/*jshint esversion: 6 */ 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const config = require('./config');

require('dotenv').config({ path: 'variables.env'}); 

const app = express();

// $ npm i -S method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//configuracion para body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Motor de vistas hbs
app.engine('.hbs', hbs({
    defaultLayout : 'index', 
    extname : 'hbs'
}));

app.set('view engine', '.hbs');

// Declaracion de carpeta STATIC
app.use('/static',express.static('public'));

// route our app
const router = require('./routes/routes');
app.use('/', router);

//Conexion a BD y levantar Servidor
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('El servidor esta funcionando');
});
