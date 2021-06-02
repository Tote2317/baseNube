/*jshint esversion: 6 */ 

//import modules
const express = require('express');
const Product = require('../models/product')
const path = require('path');

// Create a router object
const router = express.Router();

// export our router
module.exports = router;

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/product', (req,res)=>{
    res.render('product');
});

router.get('/api/product', (req, res)=>{
    Product.find({}, (err, products)=>{

        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });

        if(!products) return res.status(404).send({
            message: `No existen productos`
        });

        res.render('products', {
            products:products
        });
        //res.status(200).send({products: [products]});
    }).lean();
});

router.post('/api/product', (req, res) =>{
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;

    product.save((err, prodGuardado) =>{
        console.log(prodGuardado);
        if (err) res.status(500).send({
            message: `Error al salvar en BD ${err}`
        });
        res.redirect('/api/product');
    });// $ npm i -S method-override

const methodOverride = require('method-override')

router.use(methodOverride('_method'))
});

router.get('/api/product/:productId', (req, res) => {

    let productId = req.params.productId;

    console.log(req.body);

    Product.findById(productId, (err, products) => {
     //Product.find({price:productId},(err,todook)=>{
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion${err}`
        });

        if (!products) return res.status(404).send({
            message: `El producto no existe`
        });

        //res.status(200).send({product:todook})
        res.render('editar', {
            products:products
        });
    }).lean();
});

router.put('/api/product/:dato', (req, res)=>{

    let productID =req.params.dato;
    let update = req.body;

    Product.findOneAndUpdate({_id:productID}, update, (err, product)=>{

        if (err) return res.status(500).send({
            message: `Error al actualizar la BD${err}`
        });

        res.redirect('/api/product');

    });
});

router.delete('/api/product/:productId', (req, res) => {

    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {

        if (err) res.status(500).send({
            message: `Error al borrar el producto ${err}`
        });

        product.remove(err => {

            if (err) res.status(500).send({
                message: `Error al borrar el producto ${err}`
            });
            //res.status(200).send({message:'El producto ha sido eliminado'})
            res.redirect('/api/product');

        });
    });
});