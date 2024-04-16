const mySql = require('mysql2');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company_db',
});

module.exports = connection;