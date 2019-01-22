const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var db;
var mongodbUrl = "mongodb://fififloffi:fifi12@ds249503.mlab.com:49503/examen";

MongoClient.connect(
  mongodbUrl,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("examen"); // whatever your database name is
    app.listen(8000, () => {
      console.log("listening on 8000");
    });
  }
);

app.get("/", (req, res) => {
  var cursor = db.collection("inhaal").find();
  //console.log(cursor);

  db.collection("inhaal")
    .find()
    .toArray(function(err, result) {
      if (err) return console.log(err);
      // renders index.ejs
      res.render("index.ejs", { examen: result });
      // send HTML file populated with exams here
    });
});

app.post("/examen", (req, res) => {
  //console.log(req.body);
  console.log(req.body);
  var ind = req.body.examens.findIndex(item => {
    return (
      item.student == req.body.student &&
      item.examen == req.body.examen &&
      item.reden == req.body.reden
    );
  });
  if (ind < 0) {
    let indien = {
      student: req.body.student,
      examen: req.body.examen,
      reden: req.body.reden,
      datumIndienen: new Date()
    };
    db.collection("inhaal").save(indien, (err, result) => {
      if (err) return console.log(err);

      console.log("saved to database");
      res.redirect("/");
    });
  } else {
    res.send({ message: "exists allready" });
  }
  /*if (req.body)
    db.collection("inhaal")
      .findOne(req.body, (err, result) => {
        if (err) return res.send(500, err);
      })
      .then(() => {});

  /*{ 'student': req.body.student },
    { 'examen': req.body.examen },
    { 'reden': req.body.reden }*/
  //console.log(found);
});

//de student (String), het examen (String), een reden (String) en de datum van indienen (automatisch gegenereerd).
app.put("/examen", (req, res) => {
  // Handle put request
  db.collection("inhaal").findOneAndUpdate(
    {
      student: req.body.student,
      examen: req.body.examen,
      reden: req.body.reden
    },
    {
      $set: {
        student: req.body.student,
        examen: req.body.examen,
        reden: req.body.reden,
        datumIndienen: new Date()
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/examen", (req, res) => {
  db.collection("inhaal").findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ message: "A exam got deleted" });
    }
  );
});
