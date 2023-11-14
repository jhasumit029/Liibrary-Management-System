const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// create database connection
let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the file system sqlite database.");
});

// create table named library
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS library (id INTEGER PRIMARY KEY AUTOINCREMENT, bookname varchar(255), author varchar(255), type varchar(255))"
  );
});

// add new book to database
app.post("/add-book", async (req, res) => {
  const { bookname, author, type } = req.body;

  if (!bookname || !author || !type) {
    return res
      .status(400)
      .json({ succcess: false, error: "All fields are required." });
  }

  db.run(
    `INSERT INTO library (bookname, author, type) VALUES ('${bookname}', '${author}', '${type}')`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      res.json({ success: true, message: "New book added successfully." });
    }
  );
});

// get all books
app.get("/get-books", async (req, res) => {
  db.all("SELECT * FROM library", (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: row.reverse() });
  });
});

// detail book
app.get("/book/:id", async (req, res) => {
  db.each(`select * from library where id =${req.params.id}`, (err, row) => {
    if (err) {
      return res.json({ success: false, error: err.message });
    }
    res.json({ data: row });
  });
});

// update book
app.post("/update", async (req, res) => {
  const { bookname, author, type, id } = req.body;

  if (!bookname || !author || !type || !id) {
    return res
      .status(400)
      .json({ succcess: false, error: "All fields are required." });
  }

  db.run(
    `update library set bookname = '${bookname}', author = '${author}', type = '${type}' where id = '${id}'`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      res.json({ success: true, message: "book updated" });
    }
  );
});

// delete book
app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  db.run(`delete from library where id = '${id}'`);
  res.send("deleted");
});

// bind server to port 9000
app.listen(process.env.PORT || 9000, () => {
  console.log("server is listening on port 9000.");
  console.log("Go to http://localhost:9000");
});
