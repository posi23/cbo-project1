const express = require("express");
const routes = express.Router();
const path = require("path");
const customerApi = require("./customer-api.js");


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://adminPosi:mongodb@cboproject.v3iq6.mongodb.net/staff?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



routes.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/staff.html"));
});

routes.post("/", (req, res) => {
      var staff_id = req.body.username;
      client.connect(err => {

            if (err) res.json(err);
            else {

                  const collection = client.db("staff").collection("staff")
                  const projection = { _id: 0, staff_id: 1, password: 1, firstname: 1 };
                  var query = { staff_id: parseInt(staff_id) };

                  collection.find((query), { projection: projection }).toArray((err, result) => {
                        if (err) res.json(err);
                        else {
                              if (result[0] == null) {
                                    res.json("Staff ID is incorrect")
                              }
                              else if (result[0].password != req.body.pwd) {
                                    res.json("Password is incorrect");
                              }
                              else {
                                    res.redirect(`/staff/dashboard/${staff_id}`);
                              }
                        }

                        client.close();


                  });
            }
      });
})
routes.get("/registerStaff", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/registerStaff.html"));
})

routes.post("/registerStaff", (req, res) => {
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var address = req.body.address;
      var province = req.body.province;
      var city = req.body.city;
      var postCode = req.body.postCode;
      var dob = req.body.dob;

      client.connect(err => {
            if (err) res.json(err);

            else {

                  const collection = client.db("staff").collection("staff");


                  var staff_id = 0;

                  collection.find().sort({ staff_id: -1 }).limit(1).toArray((err, result) => {
                        if (err) res.json(err);
                        console.log(result[0].staff_id);
                        staff_id = result[0].staff_id + 1;

                        const doc = {
                              staff_id: staff_id,
                              firstname: firstname,
                              lastname: lastname,
                              email: email,
                              homeaddress: address,
                              province: province,
                              city: city,
                              postalcode: postCode,
                              dob: new Date(dob)
                        }

                        console.log(staff_id);

                        collection.insertOne(doc, (err, result) => {
                              if (err) res.json(err);

                              else {
                                    res.json("Successfully registered staff");
                              }
                              client.close();
                        });
                  })

            }
      })
});

routes.get("/accessLogin", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/accessLogin.html"));
})

routes.patch("/accessLogin", (req, res) => {
      var staff_id = req.body.staff_id;
      var username = req.body.username;
      var password = req.body.password;


      client.connect(err => {
            if (err) res.json(err);
            else {
                  const collection = client.db("staff").collection("staff");
                  const query = { staff_id: parseInt(staff_id) };
                  const newValues = { $set: { username: username, password: password } };
                  collection.updateOne(query, newValues, (err, result) => {

                        if (err) {
                              res.json(err);
                        }
                        else {
                              res.json("Successfully created a username and password for login\nYou can now log in");
                        }
                        client.close();
                  });
            }
      })
})

routes.get("/updatePass", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/updatePass.html"));
});

routes.patch("/updatePass", (req, res) => {
      var { curPwd } = req.body;
      var { newPwd } = req.body;

      client.connect(err => {
            if (err) res.json(err);

            const collection = client.db("staff").collection("staff");

            collection.findOne({ password: curPwd }, { projection: { _id: 0, password: 1 } }, (err, result) => {
                  if (err) res.json(err);

                  else if (result.password == curPwd) {
                        collection.updateOne({ password: curPwd }, { $set: { password: newPwd } }, (err, result) => {
                              if (err) res.json(err);

                              res.json("Successfully changed password");
                        })
                  }
            })
      })
})


routes.get("/updateInfo", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/updateInfo.html"));
});

routes.get("/updateInfo/:id", (req, res) => {

      var staff_id = req.params.id;

      client.connect(err => {
            if (err) res.json(err);

            else {
                  const collection = client.db("staff").collection("staff");
                  const projection = { _id: 0, password: 0, username: 0 };
                  var query = { staff_id: parseInt(staff_id) };
                  collection.findOne((query), { projection: projection }, (err, result) => {
                        if (err) res.json(err);

                        result.dob = new Date(result.dob).toDateString();
                        res.json(result);

                        client.close();
                  });
            }
      })
})

routes.patch("/updateInfo", (req, res) => {

      var staff_id = req.body.staff_id;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var address = req.body.address;
      var province = req.body.province;
      var city = req.body.city;
      var postCode = req.body.postCode;

      client.connect(err => {
            if (err) res.json(err);

            else {
                  const collection = client.db("staff").collection("staff");
                  const query = { staff_id: parseInt(staff_id), firstname: firstname, lastname: lastname };
                  const newValues = { $set: { email: email, homeaddress: address, province: province, city: city, postalcode: postCode } };
                  collection.updateOne(query, newValues, (err, result) => {

                        if (err) {
                              res.json(err);
                        }
                        else {
                              res.json("Succesfully updated customer information");
                        }
                        client.close();
                  });
            }
      })
});



routes.use("/", customerApi);




routes.get("/:id", (req, res) => {
      var staff_id = req.params.id;
      client.connect(err => {

            if (err) res.json(err);

            else {
                  const collection = client.db("staff").collection("staff");
                  const projection = { _id: 0, firstname: 1, lastname: 1 };
                  var query = { staff_id: parseInt(staff_id) };
                  collection.findOne((query), { projection: projection }, (err, result) => {
                        if (err) res.json(err);

                        else if (result == null) {
                              res.json("No such staff ID found")
                        }

                        else {
                              res.json({ "fname": result.firstname, "lastname": result.lastname });
                        }

                        client.close();
                  });
            }
      })
});

routes.get("/dashboard/:id", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/dashboard.html"));
});


routes.get("/updatePass", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/updatePass.html"));
});


routes.get("/updateInfo", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/updateInfo.html"));
});

module.exports = routes;