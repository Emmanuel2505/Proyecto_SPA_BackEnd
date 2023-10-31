const express = require('express');
const router = express.Router();
const upload = require("../storage");
const ensureToken = require("../token");

const {getCart, addCart, editQuanTotal, deleteCart, buyCart} = require('../controllers/cart.controllers')

const {allCart} = require('../controllers/cart.controllers')

router.get('/', allCart)

//Obtener los productos del carrito de una persona
router.get('/getCart', ensureToken, getCart);

//Añadir productos al carrito
router.post('/addCart', ensureToken, addCart);

//Editar los datos de un producto del carrito
router.put('/editCart', ensureToken, editQuanTotal);

//Eliminar un producto del carrito
router.delete('/deleteCart/:id', ensureToken, deleteCart);

//Realizar la compra
router.put('/buy', ensureToken, buyCart);

module.exports = router;