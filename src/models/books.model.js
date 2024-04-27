const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    category: {
        //  look into categories later....
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum : ["First-Hand" , "Second-Hand"],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Book  = mongoose.model('Book' , bookSchema);
module.exports = Book ; 