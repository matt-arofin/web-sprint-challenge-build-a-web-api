// add middlewares here related to projects
// require model
// const express = require('express')

// Write at least 2 middleware here to handle various things

// ID Validation middleware
function validateProjectId(req, res, next){
    const id = req.params.id;
    if(!id){
        res.status(404).json({message: "ID not found"});
    } else {
        req.id = id
        next()
    } 
}

// Request body validation middleware
function validateReqBody(req, res, next){
    const body = req.body;
    // console.log("post middleware req: ", req)
    // console.log("Post request body: ", body)
    if(!body.name || !body.description || body.completed === undefined){
        res.status(400).json({message: "The request body needs a name, description and completed status"})
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateReqBody
}