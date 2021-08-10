var mysql = require('mysql')
var config = require('../config/config')

var pool = mysql.createPool({
  connectionLimit: 200,
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.sql_db,
  timezone: 'UTC+0',
  multipleStatements: true
})


module.exports = pool
