//funcion para consultar el archivo en la ruta

function index(req, res) {
    res.render('tasks/index');
}

function agregar(req, res) {
    res.render('tasks/agregar');
}

//se exportan los modulos para ser enlazados
module.exports = {
    index: index,
    agregar: agregar,
}