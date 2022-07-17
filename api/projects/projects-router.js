// Write your "projects" router here!
// require express and initialise router instance
const express = require('express');
const router = express.Router();

// import models and middleware
const Model = require('./projects-model');
const { validateProjectId, validateReqBody } = require('./projects-middleware');

// GET returns an array of all projects OR empty array if no projects
router.get('/', (req, res) => {
    Model.get().then(projects => {
        // console.log(projects)
        res.status(200).json(projects)
    }).catch(err => {
        console.error(err)
        res.status(500).json({message: "There was an error in the root GET for projects"})
    });
});

// GET by id - returns a project with the given 'id' as the body of the response. If id doesn't exist then returns a 404 error code
router.get('/:id', validateProjectId, (req, res) => {
    const id = req.id;

    Model.get(id).then(project => {
        if(project) {
            // console.log(req.id)
            res.status(200).json(project)
        } else {
            res.status(404).json({message: "This ID does not exist"})
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error getting the project(s)"})
    })
});

// POST returns a newly created project as the body of the response (req.body?)
router.post('/', validateReqBody, (req, res) => {
    const body = req.body;
    console.log("router post request body: ", req)
    Model.insert(body).then(newPost => {
        res.status(201).json(newPost)
    }).catch(err => {
        console.error(err)
        res.status(500).json({message: "There was an error posting the new project"})
    })
});

// PUT
router.put('/:id', validateProjectId, validateReqBody, (req, res) => {
    const id = req.id
    const changes = req.body

    Model.update(id, changes).then(postEdit => {
        res.status(200).json(postEdit)
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error updating your post"})
    })
})

// DELETE
router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.id;

    Model.remove(id).then(deleted => {
        if(!deleted){
            res.status(404).json({message: "The id was not found"})
        } else {
            res.status(204).json({message: "The project was successfully deleted"})
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error deleting this post"})
    })
})

// GET
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;

    Model.getProjectActions(id).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        console.error(err)
        res.status(500).json({message: "There was an error fetching this project's actions"})
    })
})

// Export router
module.exports = router;