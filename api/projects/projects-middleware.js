// add middlewares here related to projects
// require model


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

module.exports = {
    validateProjectId
}