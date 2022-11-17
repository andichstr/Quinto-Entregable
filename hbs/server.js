const express = require('express');
const { Router } = express;
const Container = require('./container/container');
const { engine } = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(express.static('public'));


const routerProductos = new Router();
const PORT = 8080;
const container = new Container();

routerProductos.get('/', (req, res) => {
    const products = container.getAll();
    res.render('index', {products});
})

routerProductos.get('/:id', (req, res) => {
    const id = req.params.id;
    const producto = container.getProduct(parseInt(id));
    res.json(producto);
})

routerProductos.post('/', (req, res) => {
    const producto = req.body;
    const id = container.addProduct(producto);
    res.redirect('/');
})

routerProductos.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const producto = req.body;
    const response = container.editProduct(parseInt(id), producto);
    res.send(response);
})

routerProductos.delete('/:id', (req, res) => {
    const id = req.params.id;
    const response = container.deleteProduct(parseInt(id));
    res.send(response);
})

app.use('/api/productos', routerProductos);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})