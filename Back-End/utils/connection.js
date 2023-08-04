//Database connection
const {postgrepass} = require('../config.json');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mywork',
  password: postgrepass,
  port: 5432,
})

module.exports = {pool, Pool};