var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 100,
            required: [true, 'Name can not be empty']
        },
        price: {
            type: Number,
            required: [true, 'Price can not be empty']
        },
        description: String,
        theme: {
            type: String,
            enum: ['City', 'Friends', 'Ideas', 'Architecture', 'Technic', 'Classic']
        },
        image: {
            type: String,
            required: [true, 'Image can not be empty']
        }
    }
);
var ProductModel = mongoose.model('product', ProductSchema, 'product');
module.exports = ProductModel;