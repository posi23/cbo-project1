

// import express module for http connection
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const webPagesRouter = require("./webpages");


const app = express();

const port = 3050;



app.use('/', bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(webPagesRouter);


app.use(express.static(path.join(__dirname, "../pages")));
app.use(express.static(path.join(__dirname, "../html files")));
app.use(express.static("/Users/Posi/Desktop/bootstrap-5.1.3"));

app.listen(port, () => {
      console.log(`listening on server ${port}`);
});