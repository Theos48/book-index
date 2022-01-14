const express = require('express');
const Author = require('../models/authors')
const router = express.Router();

//All authors Route
router.get('/', (req, res) => {
    res.render('authors/index')
});

//New authors route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
});

//Create Author Route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router