const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the file system sqlite database.");
});

db.run("delete from library", (err) => {
  if (err) console.log(err);
  else console.log("Database cleared.");
});
