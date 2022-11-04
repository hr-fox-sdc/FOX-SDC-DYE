const Client = require('pg').Client

let config = {
  user: 'andrewdye',
  host: 'localhost',
  database: 'qanda',
  // password: 'password',
  port: 5432,
  idle_session_timeout: 0
}

let connectionClient = new Client(config);

module.exports = connectionClient;