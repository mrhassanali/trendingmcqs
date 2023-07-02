var { createPool } = require("mysql");
var pool = createPool({
  host: process.env.HOST, 
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.CONNECTION_LIMIT,
  port: process.env.DB_PORT
});


module.exports = pool;