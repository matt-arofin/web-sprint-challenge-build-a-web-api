// add middlewares here related to actions

// ValidateID handler <---- confirms whether ID is present in params
function validateActionId(req, res, next){
    const id = req.params.id;
    if(!id){
        res.status(404).json({message: "No ID found"})
    } else {
        req.id = id;
        next();
    }
}

// Validate body <---- Requires: notes, description, AND project_id
function validateActionBody(req, res, next){
    const body = req.body;
    if(!body.notes || !body.description || !body.project_id){
        res.status(400).jason({message: "This action requires a description, notes and project_id"})
    } else {
        next();
    }
}


module.exports = {
    validateActionId,
    validateActionBody
}