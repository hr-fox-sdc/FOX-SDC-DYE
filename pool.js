const Pool = require('pg').Pool
require('dotenv').config()

console.log(process.env.user, process.env.host, process.env.database, process.env.port)

let config = {
  user: 'andrewdye',
  host: '127.0.0.1',
  database: 'qanda',
  // password: process.env.password,
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
}

let pool = new Pool(config);

module.exports = pool;