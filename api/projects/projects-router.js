// Write your "projects" router here!
// require express and initialise router instance
const express = require('express');
const router = express.Router();

// import models and middleware
const Model = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

// GET returns an array of all projects OR empty array if no projects
router.get('/', (req, res) => {
    Model.get().then(projects => {
        console.log(projects)
        res.status(200).json(projects)
    }).catch(err => {
        console.error(err)
        res.status(500).json({message: "There was an error in the root GET for projects"})
    });
});

// GET by id - returns a project with the given 'id' as the body of the response. If id doesn't exist then returns a 404 error code
router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;

    Model.get(id).then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({message: "This ID does not exist"})
        }
    }).catch(err => {
        console.error(err);
        res.status()
    })
});

// Export router
module.exports = router;