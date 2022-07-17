const express = require('express');
const server = express();

// Configure your server here
server.use(express.json());

// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router');
server.use('/api/actions', actionsRouter)

// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router');
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    console.log(req.method, req.originalUrl)
    res.send(`<h1>Unit 4 Sprint 1: Raring to go</h1>`);
})

// Do NOT `server.listen()` inside this file!
module.exports = server;
