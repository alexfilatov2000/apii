const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3002;

mongoose.connect('mongodb://localhost:27017/apii', { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', function () {
    console.log('connected to Mongodb');
});

db.on('error', function (err) {
    console.log(err);
});

const app = express();

let Product = require('./models/product');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', function (request, response) {
        Product.find({}, function (err, products) {
        if (err){
            console.log(err);
        } else {
            console.log(products);
            response.render('index', {
                title: 'Products',
                products:products
            })
        }
    })
});

app.get('/products/add', function (req, res) {
    res.render('add_products', {
        title: 'Add product'
    })
});


app.post('/products/add', function (req, res) {
    let product = new Product;
    product.name = req.body.name;
    product.author = req.body.price;
    product.body = req.body.img;

    product.save(function (err) {
        if (err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }

    })
});




app.listen(PORT);
