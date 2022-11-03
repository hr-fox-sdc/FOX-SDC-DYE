const fs = require('fs')
const connectionClient = require('./connect.js')

const populate = fs.readFileSync('db.sql').toString();

//queries go here
connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('creating tables and importing csv...')
  connectionClient.query(populate, function(err, result){
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    console.log('populate database complete')
    process.exit(0);
  });
  console.log(`connected to '${client.database}' on port ${client.port}`)
})