const Book = require("../models/book")
// Show a list of book
const getBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result) return res.status(400).json({ err: "ERROR" })
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" })
  }
}
//Add a new book
const addBook = async (req, res) => {
    console.log("Add New Book:",req.body)
    const NewBook = new Book(req.body)
    try {
      await NewBook.save((err,data)=> {
        console.log(err)
        console.log(data)
      });
      res.status(201).send({NewBook});
    } catch (err) {
      console.log(err.message)
    }
  }
// Update un existing book
  const updateBook = async (req, res) => {
    try{
      const { id } = req.params;
      console.log("le id est:", {id})
      if (!id) res.status(400).json({ 
          message:"This book not exit try again...",
          data:{}
       })
      const result = await Book.findOneAndUpdate({_id: req.params.id},req.body)
      if (!result) return res.status(400).json({ msg: "ERROR" });
      return res.status(200).json({
           message:"book updated successfully",
           data: {}
        }) 
      
    }
    catch(err){
      res.status(500).send
    }
  }
  //Delete un exiosting book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ err: "ERROR" });
    const result = await Book.deleteOne({ _id: id });
    if (!result) return res.status(400).json({ msg: "ERROR" });
    return res.status(200).json({ result });
  } catch (err) {
    console.log("erreur de id:",err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
}
module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
}