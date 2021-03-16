//const express = require("express")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Book = require('../models/book')

const User = require("../models/user")


//get all users
const getAllUsers = async (req, res) => {
    console.log("In find users ")
    try {
        const users = await User.find()
        res.status(200).json({
            users: users,
            message: "Users found successfully"
        })
    } catch (e) {
        res.status(404).send()
    }
}
//get by id
const getUsersById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            throw new Error()
        }
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
}
//Add New User
const addUser = async (req, res) => {
    console.log("-----in POST user: ",req.body)
    const user = new User(req.body)
    console.log(user)
    try {
        const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
        console.log("token is: ", token)
       // await user.save()
        user.tokens = user.tokens.concat({ token })
       await user.save()
        res.status(201).send({ user, token})
    } catch (e) {
        console.log("error: ", e)
    }

}

//update existing user
const updateUser = async (req, res) => {
    try {
        const userFound = await User.findOne({_id: req.params.id})
        console.log("userFound: ",userFound )
        if(!userFound){
            res.status(404).json({
                message: "User not exist!!",
                data: {}
            })
        }
        await User.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json({
            message: "Updated successfully..",
            data: {}
        })
    } catch (e) {
        res.status(500).send()
    }
}
//get all book
const getAllbooks = async (req,res)=>{
    try {
        const foundUser = await User.findOne({_id: req.params.id}).populate("books")
        if(!foundUser){
            res.status(404).json({
                message: "Object with these information doesn't exist",
                data:{}
            })
        }
        res.json(foundUser)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" })
    }
    
}
//delete user
const deleteUser = async (req, res) => {
    try {
        const userFound = await User.findOne({_id: req.params.id})

        if(!userFound){
            res.status(404).json({
                message: "Object with these information doesn't exist",
                data:{}
            })
        }
        await userFound.remove()
        res.status(200).json({
            message: "Deleted successfully",
            data: {}
        })
    } catch (error) {
        res.status(500).send()
    }
}


module.exports = {
    getAllUsers,
    getUsersById, 
    addUser,
    updateUser,
    deleteUser,
    getAllbooks
}