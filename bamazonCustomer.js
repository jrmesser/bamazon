var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var dbkeys = require('./keys.js');

//console.log('keys:', dbkeys.key);

var questions = [
    {
        type: 'input',
        name: 'desired_item',
        message: 'Please enter the Item ID of the product you wish to purchase.',
        validate: function(value) {
            if (parseInt(value) > 0) {
                return true;
            }
            else {
                return 'Please enter a valid Item ID.'
            }
        }
    },
    {
        type: 'input',
        name: 'desired_amount',
        message: 'Please enter the quantity you would like to purchase.',
        validate: function(value) {
            if (parseInt(value) > 0) {
                return true;
            }
            else {
                return 'Please enter a valid quantity.'
            }
        }
    }
];

var connection = mysql.createConnection(dbkeys.key);

connection.connect();

connection.query('SELECT item_id AS \'Item ID\', product_name AS \'Product Name\', price AS \'Unit Price (USD)\' FROM products', function (error, results, fields) {
    if (error) throw error;
//    console.log('query results are:', results);
    console.table(results);
    inquirer.prompt(questions).then(function (answers) {
        connection.query(`SELECT * FROM products WHERE item_id = ${answers.desired_item}`, function (error, results, fields) {
            if (error) throw error;
            if (results[0] === undefined ) {
                console.log('I\'m sorry, but we don\'t have that in stock!');
            }
            else if (results[0].stock_quantity < parseInt(answers.desired_amount)) {
                console.log('I\'m sorry, but we don\'t have that quantity in stock! Please try an order of a lesser quantity.');
            }
            else {
                console.log('Placing your order!');
                connection.query(`UPDATE products SET stock_quantity = ${results[0].stock_quantity - parseInt(answers.desired_amount)}, product_sales = ${parseInt(answers.desired_amount)} * price WHERE item_id = ${answers.desired_item}`, function (error, results, fields) {
                    if (error) throw error;
                    console.log('Your order has been placed! Have a nice day!');
                    connection.end();
                });
            }
        });
    });

});



//connection.end();
