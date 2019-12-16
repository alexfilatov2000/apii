let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('product', productSchema);
