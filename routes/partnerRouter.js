const express = require('express');
const partnerRouter = express.Router();


partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partner contact info to you');
})
.post((req, res) => {
    res.end(`Will add the contact name: ${req.body.name} with details: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`PUT operation will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end('Deleting all partners immediately');
});

partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partner contact info to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with details: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`PUT operation will add the partner: ${req.body.name} with said  description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end('Deleting all partners');
});



module.exports = partnerRouter;
