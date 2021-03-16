const express = require('express')

const userController = require('../controllers/userController')
const userRouter = new express.Router()

//les routes
userRouter.get("/",userController.getAllUsers)
userRouter.get("/:id",userController.getUsersById)
userRouter.get("/getAllbook/:id",userController.getAllbooks)
userRouter.post("/",userController.addUser)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)


    
module.exports = userRouter