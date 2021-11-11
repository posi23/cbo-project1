'use strict'

// import express module for http connection
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = 3030;

app.use('/', bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));
});

app.use('/', express.static(path.join(__dirname, "pages")));

app.listen(port, () => {
      console.log(`listening on server ${port}`);
});