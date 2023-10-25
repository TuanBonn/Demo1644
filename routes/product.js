var express = require('express');
var router = express.Router();

const ProductModel = require('../models/ProductModel')

router.get('/', async (req, res) => {
    var products = await ProductModel.find();
    res.render('product/index', {products: products})
    // res.send(products);
})

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/detail', {product: product});
});

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    console.log('Delete product succeed');
    res.redirect('/product');
})

router.get('/add', (req, res) => {
    res.render('product/add');
})

router.post('/add', async (req, res) => {
    var product = req.body;
    await ProductModel.create(product);
    console.log('Add product succeed !');
    res.redirect('/product');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/edit', { product: product })
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = req.body;
    await ProductModel.findByIdAndUpdate(id, product);
    console.log('Update product succeed !');
    res.redirect('/product');
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    var products = await ProductModel.find({ name: new RegExp(keyword, "i") });
    res.render('product/index', { products: products });
})

router.get('/priceasc', async (req, res) => {
    var products = await ProductModel.find().sort({ price: 1 });
    res.render('product/index', { products: products });
});

router.get('/pricedesc', async (req, res) => {
    var products = await ProductModel.find().sort({ price: -1 });
    res.render('product/index', { products: products });

});

router.get('/nameasc', async (req, res) => {
    //1: ascending,  -1: descending
    var products = await ProductModel.find().sort({ name: 1 });
    res.render('product/index', { products: products });
})

router.get('/namedesc', async (req, res) => {
    var products = await ProductModel.find().sort({ name: -1 });
    res.render('product/index', { products: products });
})

module.exports = router;