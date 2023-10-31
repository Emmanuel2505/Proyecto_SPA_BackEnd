const express = require("express");
const adminAccess = require("../admin");
const upload = require("../storage");
const ensureToken = require("../token");
const router = express.Router();


const Product = require("../models/product")
const {allProducts, getName, getProductId, addProduct, updateProductWithImage, updateProductWithoutImage, deleteState, editQuan} = require('../controllers/products.controllers')
//const {state, all, deleteProduct} = require('../controllers/products.controllers')
router.get('/',allProducts);

router.get('/getProduct/:name', getName);

router.get('/getProductId/:id', getProductId);

router.post('/addProduct', ensureToken, adminAccess, upload.single("image"), addProduct);

router.put('/deleteState/:id', ensureToken, adminAccess, deleteState);

router.put('/updateProductWithImage/:id', ensureToken, adminAccess, upload.single("image"), updateProductWithImage);

router.put('/updateProductWithoutImage/:id', ensureToken, adminAccess, updateProductWithoutImage);

router.put('/editQuan/:id', ensureToken, editQuan);


/*
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/all', all);
router.put('/state/:id', state);*/


module.exports = router; 