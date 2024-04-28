// Se importan las librerías de node dependencias
const express = require('express');
// Express-handlebars es una librería para crear plantillas HTML
const {engine} = require('express-handlebars');
// Acceder a la conexión desde cualquier lugar de los enrutadores durante el ciclo de vida de la solicitud
const myconnection = require('express-myconnection');
// Se importa la librería body-parser para procesar los datos de solicitudes HTTP como JSON
const bodyParser = require('body-parser');
// Se requiere la librería de mysql para almacenar los datos en la base de datos.
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');

const app = express();

// Pasar número del puerto
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(bodyParser.json());

// Se configura el llamado a las vistas
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');


// Configurar conexión a base de datos desde RDS AWS 
app.use(myconnection(mysql, {
  host: 'crud-task-nodejs.cdi6euka616j.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'root2024',
  port: '3306',
  database: 'crud_nodejs'
}));

// Middleware para procesar datos en solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Verificar escucha en el puerto
app.listen(app.get('port'), () => {
  console.log('Escuchando desde el puerto', app.get('port'));
});

app.use('/', tasksRoutes);

// Se procede a mostrar la vista home
app.get('/', (req, res) => {
  res.render('home');
});
