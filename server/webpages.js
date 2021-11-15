const express = require('express');
const path = require('path');
const db = require("./dbconnection");

const router = express.Router();

db.connect((err) => {
      if (!err) {
            console.log("Connected");
      }
      else {
            console.log(err);
      }
});

router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/index.html"));
});

router.get('/about.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/about.html"));
});

router.get('/contact.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/contact.html"));
});

router.get('/services.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/services.html"));
});

router.get('/staff.html', (req, res) => {
      res.sendFile(path.join(__dirname, "../html files/staff.html"));
});

router.get('/db', (req, res) => {
      db.query("CREATE TABLE pman(`idpman` INT NOT NULL AUTO_INCREMENT, `test` VARCHAR(45) NULL,PRIMARY KEY(`idpman`)", (err) => {
            if (err) {
                  console.log(err);
            }
            else {
                  console.log("sucessful");
            }
      });
});


module.exports = router;