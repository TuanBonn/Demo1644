var mongoose = require('mongoose');
var CarSchema = mongoose.Schema(
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
        quantity:Number,
        image: {
            type: String,
            required: [true, 'Image can not be empty']
        },
    }
);
var CarModel = mongoose.model('car', CarSchema, 'car');
module.exports = CarModel;