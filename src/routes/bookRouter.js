const express = require("express");
require("../db/mongoose")
const bookController = require("../controllers/bookController");
const bookRouter = new express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/", bookController.addBook);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter