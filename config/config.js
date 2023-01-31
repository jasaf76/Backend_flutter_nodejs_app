const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'gottesSegen210705+',
  database: 'flutter_db',
})
db.connect(function (err) {
  if (err) throw err;
  console.log('DATABASE IS CONNECTED!')
})

module.exports = db;