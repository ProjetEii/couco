var mysql = require('mysql');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);