//  require express, router, model and middleware
// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Model = require('./actions-model');
const { validateActionId, validateActionBody } = require('./actions-middlware');

// GET
router.get('/', (req, res) => {
    Model.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error fetching actions"});
    });
});

// GET :id
router.get('/:id', validateActionId, (req, res) => {
    const id = req.id;

    Model.get(id).then(action => {
        if(action){
            res.status(200).json(action)
        } else {
            res.status(404).json({message: "No ID was found to match"})
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error fetching this action"});
    });
});

// POST 
router.post('/', validateActionBody, (req, res) => {
    const body = req.body;

    Model.insert(body).then(action => {
        res.status(201).json(action)
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: "There was an error posting the new action"})
    })
});

// PUT :id
// router.put('/:id', (req, res) => {

// });

// DELETE :id
// router.delete('/:id', (req, res) => {

// });

module.exports = router;