const path = require('path')
const mysql = require('mysql2')
require('dotenv').config({ 
  path: path.resolve('.env')
})

const DBCONFIG = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DB
}

const pool = mysql.createPool(DBCONFIG)
const formatSQL = (SQL, parameters) => mysql.format(SQL, parameters)

module.exports = {
  pool,
  formatSQL
}
