const Pool = require('pg').Pool
require('dotenv').config()

let config = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
}

let pool = new Pool(config);

module.exports = pool;