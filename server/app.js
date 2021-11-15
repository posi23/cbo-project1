

// import express module for http connection
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webPagesRouter = require("./webpages");


const app = express();

const port = process.env.PORT;

app.use('/', bodyParser.urlencoded({ extended: true }));

app.use(webPagesRouter);

app.use(express.static(path.join(__dirname, "../pages")));

app.listen(3050, () => {
      console.log(`listening on server ${port}`);
});