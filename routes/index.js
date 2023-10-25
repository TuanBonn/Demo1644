var express = require('express');
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/ProductModel");
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', async (req, res) => {
  var login = await UserModel.findOne(
      {
        username: req.body.username,
        password: req.body.password
      }
  )
  //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
  if (login)  //login == true
    res.redirect('/product')
  else
    res.redirect('/login');
})


router.get('/', async (req, res) => {
  var products = await ProductModel.find();
  res.render('index', {products: products})
  // res.send(products);
})

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  var product = await ProductModel.findById(id);
  res.render('detail', {product: product});
});

router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var products = await ProductModel.find({ name: new RegExp(keyword, "i") });
  res.render('index', { products: products });
})

router.get('/priceasc', async (req, res) => {
  var products = await ProductModel.find().sort({ price: 1 });
  res.render('index', { products: products });
});

router.get('/pricedesc', async (req, res) => {
  var products = await ProductModel.find().sort({ price: -1 });
  res.render('index', { products: products });

});

router.get('/nameasc', async (req, res) => {
  //1: ascending,  -1: descending
  var products = await ProductModel.find().sort({ name: 1 });
  res.render('index', { products: products });
})

router.get('/namedesc', async (req, res) => {
  var products = await ProductModel.find().sort({ name: -1 });
  res.render('index', { products: products });
})

module.exports = router;
