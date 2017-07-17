var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var dbkeys = require('./keys.js');

//console.log('keys:', dbkeys.key);

// var questions = [
//     {
//         type:
//     }
// ]

var connection = mysql.createConnection(dbkeys.key);

connection.connect();

connection.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
    if (error) throw error;
//    console.log('query results are:', results);
    console.table(results);

});

// inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
//     // Use user feedback for... whatever!! 
// });

connection.end();
