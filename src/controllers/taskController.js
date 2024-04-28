// Middleware para parsear datos de formulario
const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

// Función para renderizar la vista index
function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tasks', (err, tasks) =>{
            if(err){
                res.json(err);
            }
            res.render('tasks/index', { tasks });
        });
    });
    
    
}

// Función para renderizar la vista crear
function crear(req, res) {
    res.render('tasks/crear');
}

// Función para almacenar datos en la base de datos
function store(req, res) {
    const data = req.body;

    // Obtener una conexión a la base de datos
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en la conexión a la base de datos');
        }
        
        // Insertar datos en la tabla tasks
        conn.query('INSERT INTO tasks SET ?', data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al insertar datos en la base de datos');
            }
            console.log(result);
            res.redirect('/'); // Redirigir a la página de inicio después de la inserción
        });
    });
}

function destroy(req, res){
    const id = req.body.id;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tasks WHERE id = ?', [id], (err, rows) => {
          res.redirect('/tasks');  
        });
    });
}

function edit(req, res) {
    
    const id = req.params.id;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tasks WHERE id = ?', [id], (err, tasks) =>{
            if(err){
                res.json(err);
            }
            res.render('tasks/edit', { tasks });
        });
    });
}

function actualizar(req, res){
    const id = req.params.id;
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE tasks SET ? WHERE id = ?', [data, id], (err, rows) => {
           res.redirect('/tasks');
        });
    });
}
// Se exportan los módulos para ser enlazados
module.exports = {
    index,
    crear,
    store,
    destroy,
    edit,
    actualizar,
    router
};

