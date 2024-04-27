const Book = require('../models/books.model.js');
const homeController = async (req, res)=>{
    return res.status(200).send("Home Page is working fine!!!")
}
const buyController = async (req, res)=>{
    const page = req.page ;
    const limit = req.limit ;
    try{
        const books = Book.find().skip((page-1)*limit).limit(limit);
        return res.status(200).send({ message : "Buying Page is working fine!!!" , book : books});
    }
    catch(error){
        return res.status(500).send(error.message);
    }
}
const buyBookController = async (req, res)=>{
    const bookID = req.id ;
    try{
        const book = Book.find({_id : bookID});
        if(!book){
            return res.status(400).send("No such book was found");
        }
        return res.status(200).send({message : "Selling is working fine!!!" , book : book});
    }
    catch(error){
        return res.status(500).send(error.message);
    }
    
}
const sellBookController = async (req, res)=>{
    const {imageUrl , name , author  , price , description , type , category} = req.body ;
    const newBook = new Book({
        name ,
        author ,
        price ,
        description ,
        category ,
        type ,
        imageUrl
    });
    await newBook.save();
    return res.status(200).send("Buying a book is working fine!!!")
}

module.exports = {homeController , buyController  ,buyBookController , sellBookController};