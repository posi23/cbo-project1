const express = require("express");
const customerRoutes = express.Router();
const path = require("path");

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://adminPosi:mongodb@cboproject.v3iq6.mongodb.net/staff?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


customerRoutes.get("/register", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/register.html"));
});

customerRoutes.post("/register", (req, res) => {
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var address = req.body.address;
      var province = req.body.province;
      var city = req.body.city;
      var postCode = req.body.postCode;
      var date = req.body.dob;
      var dob = new Date(date);

      //console.log(req.body, dob);

      client.connect(err => {
            if (err) res.json(err);

            const collection = client.db("staff").collection("customers");
            collection.find().sort({ customer_id: -1 }).limit(1).toArray((err, result) => {
                  if (err) res.json(err);

                  var cust_id;

                  if (result == null || result[0] == null) cust_id = 100;

                  else {
                        cust_id = result[0].cust_id + 1;
                  }

                  collection.insertOne({ cust_id: cust_id, firstname: firstname, lastname: lastname, email: email, homeaddress: address, province: province, city: city, postalcode: postCode, dob: dob }, (err, result) => {
                        if (err) res.json(err);
                        else {
                              res.json("Registration succesful");
                        }
                        client.close();
                  })
            })
      })
});


customerRoutes.get("/customer", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/customer.html"));
});

customerRoutes.get("/customer/all", (req, res) => {
      client.connect(err => {
            if (err) res.json(err);

            const collection = client.db("staff").collection("customers");

            collection.find({}).project({ _id: 0 }).toArray((err, result) => {
                  if (err) res.json(err);

                  for (var i = 0; i < result.length; i++) {
                        result[i].dob = result[i].dob.toDateString();
                  }
                  res.json(result);
            });
      });
});


customerRoutes.get("/report", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/report.html"));
});

customerRoutes.post("/report", (req, res) => {
      var cust_id = req.body.cust_id;
      var note = req.body.note;

      var name = "" + req.body.name;

      var fname = name.split(" ")[0];
      var lastname = name.split(" ")[1];

      client.connect(err => {
            if (err) res.json(err);
            else {
                  const collection = client.db("staff").collection("customers");

                  collection.find({ cust_id: parseInt(cust_id) }).project({ _id: 0, note: 1 }).toArray((err, result) => {
                        if (err) res.json(err);
                        else {
                              var newValues;
                              if (result[0] == null) {
                                    newValues = { $set: { report: note } };
                              }
                              else {
                                    var report = result[0].report + "" + note;
                                    newValues = { $set: { report: report } };
                              }
                              const query = { cust_id: parseInt(cust_id), firstname: fname, lastname: lastname };

                              collection.updateOne(query, newValues, (err, result) => {

                                    if (err) {
                                          res.json(err);
                                    }
                                    else if (result.modifiedCount == 1) {
                                          res.json("Successfully added the report/notes for this customer");
                                    }
                                    else {
                                          res.json("Could not add the report for this customer. Please check customer details and try again");
                                    }
                                    client.close();
                              });
                        }
                  })
            }
      })
})

customerRoutes.get("/report/:name/:id", (req, res) => {
      var name = "" + req.params.name;
      var cust_id = req.params.id;

      var fname = name.split(" ")[0];
      var lastname = name.split(" ")[1];

      //console.log(name);

      client.connect(err => {
            if (err) res.json(err);

            const collection = client.db("staff").collection("customers");

            collection.find({ cust_id: cust_id }).project({ _id: 0, report: 1, firstname: 1, lastname: 1 }).toArray((err, result) => {
                  if (err) res.json(err);

                  else if (result[0] == null) {
                        res.json("Wrong customer Id provided. Try again");
                  }

                  else if (result[0].firstname + result.lastname != fname + lastname) {
                        res.json("Wrong customer name provided. Please try again")
                  }
                  else {
                        res.json(result[0].report);
                  }
                  client.close();
            })
      })
});


customerRoutes.get("/customerUp", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/customerUp.html"));
});

customerRoutes.patch("/customerUp", (req, res) => {
      var cust_id = req.body.cust_id;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var address = req.body.address;
      var province = req.body.province;
      var city = req.body.city;
      var postCode = req.body.postCode;

      client.connect(err => {
            const collection = client.db("staff").collection("customers");

            collection.updateOne({ cust_id: cust_id, firstname: firstname, lastname: lastname }, { $set: { email: email, homeaddress: address, province: province, city: city, postalcode: postCode } }, (err, result) => {
                  if (err) res.json(err);

                  else if (result.modifiedCount == 1) {
                        res.json("Successfully updated customer infromation");
                  }
                  else (
                        collection.find({ cust_id: cust_id }).project({ _id: 0, firstname: 1, lastname: 1 }).toArray((err, result) => {
                              if (err) res.json(err);

                              else if (result[0] == null) {
                                    res.json("Wrong customer Id provided. Try again");
                              }

                              else if (result[0].firstname + result[0].lastname != firstname + lastname) {
                                    res.json("Wrong customer name provided. Try again");
                              }
                        })
                  )
            })
      })
})


customerRoutes.get("/deleteCust", (req, res) => {
      res.sendFile(path.join(__dirname, "../../html files/staff/deleteCust.html"))
});

customerRoutes.delete("/deleteCust/:id/:name", (req, res) => {
      var name = "" + req.params.name;
      var cust_id = req.params.id;

      console.log(req.params);

      var fname = name.split(" ")[0];
      var lastname = name.split(" ")[1];

      client.connect(err => {
            const collection = client.db("staff").collection("customers");

            collection.deleteOne({ cust_id: cust_id, firstname: firstname, lastname: lastname }, (err, result) => {
                  if (err) res.json(err);

                  else if (result.deletedCount == 1) {
                        res.json(`Customer ${cust_id}: ${name} has been deleted from the database`);
                  }

                  else {
                        res.json("No documents matched the query. Deleted 0 ducments");
                  }
            })
      })
});

module.exports = customerRoutes;