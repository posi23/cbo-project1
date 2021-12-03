const express = require('express');
const path = require('path');
const staffApi = require("./api/staff-api");
// const customerApi = require("./api/customer-api.js");

const router = express.Router();

router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/index.html"));
});

router.get('/about', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/about.html"));
});

router.get('/contact', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/contact.html"));
});

router.get('/services', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/services.html"));
});

router.use('/staff', staffApi);

module.exports = router;