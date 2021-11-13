const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../index.html"));
});

router.get('/about.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../about.html"));
});

router.get('/contact.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../contact.html"));
});

router.get('/services.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../services.html"));
});

router.get('/staff.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../staff.html"));
});


module.exports = router;