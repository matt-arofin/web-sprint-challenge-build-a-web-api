const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const Actions = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const Projects = require('./projects/projects-router');

server.use(express.json());

server.get('/', (req, res) => {
    console.log()
    res.send(`<h1>`)
})

// Do NOT `server.listen()` inside this file!
module.exports = server;
