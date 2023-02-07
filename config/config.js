const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "gottesSegen210705+",
  database: "flutter_db",
  debug: false,
});
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("🚀  Connected to 🚁🏴‍☠️  database!💣 🏎️  🚀 🏴‍☠️");
  connection.release();
});
module.exports = db;
