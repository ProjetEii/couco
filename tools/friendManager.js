var mysql = require('mysql');
var fs = require('fs-extra');
var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);

// Crypto 
var crypto = require('crypto')
var shasum = crypto.createHash('sha1');
shasum.update("utf8");

exports.getFriendsByIdUser = function(idUser, callback)
{

	client.query("SELECT * FROM ")
}