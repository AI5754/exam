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
  console.log(cursor);

  db.collection("inhaal")
    .find()
    .toArray(function(err, result) {
      if (err) return console.log(err);
      // renders index.ejs

      function sortJSON(data, key, way) {
        return data.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          if (way === "123") {
            return x < y ? -1 : x > y ? 1 : 0;
          }
          if (way === "321") {
            return x > y ? -1 : x < y ? 1 : 0;
          }
        });
      }

      var retVal = sortJSON(result, "reden", "123"); // 123 or 321

      res.render("index.ejs", { examen: retVal });
      // send HTML file populated with quotes here
    });
});

app.post("/quotes", (req, res) => {
  console.log(req.body);

  let inh = {
    student: req.body.student,
    examen: req.body.examen,
    reden: req.body.reden,
    datumIndienen: new Date()
  };

  db.collection("inhaal").save(inh, (err, result) => {
    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});

app.put("/quotes", (req, res) => {
  // Handle put request
  db.collection("inhaal").findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
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

app.delete("/quotes", (req, res) => {
  db.collection("inhaal").findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ message: "A darth vadar quote got deleted" });
    }
  );
});
