var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var dbkeys = require('./keys.js');

var connection = mysql.createConnection(dbkeys.key);


var questionMain = [
    {
        type: 'list',
        name: 'action',
        message: 'Welcome, to Bamager, Bamazon\'s Management Application. How may I assist you?',
        choices: ['View Products for Sale',
                  'View Low Inventory',
                  'Add to Inventory',
                  'Add New Product'],
        filter: function(value) {
            return value.toLowerCase();
        }
    }
];

var getAddInventoryQuestion = function(inputOptionsArray) {
    return [
        {
            type: 'list',
            name: 'desired_item_id',
            message: 'Please the product you wish to re-order.',
            choices: inputOptionsArray,
            filter: function(value) {
                return value.split('\t')[0];
            }
        },
        {
            type: 'input',
            name: 'desired_amount',
            message: 'Please enter the quantity you would like to add.',
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
};

var questionNewItem = [
    {
        type: 'input',
        name: 'new_product_name',
        message: 'Please enter the name of the new product',
        validate: function(value) {
            return value.toString();
        }
    },
    {
        type: 'input',
        name: 'new_product_department_name',
        message: 'Please enter the department name of the new product',
        validate: function(value) {
            return value.toString();
        }
    },
    {
        type: 'input',
        name: 'new_product_price',
        message: 'Please enter the unit price of the new product',
        validate: function(value) {
            if (parseFloat(value) > 0) {
                return true;
            }
            else {
                return 'Please enter a valid Item ID.'
            }
        }
    },
    {
        type: 'input',
        name: 'new_product_quantity',
        message: 'Please enter the desired units of the new product',
        validate: function(value) {
            if (parseInt(value) > 0) {
                return true;
            }
            else {
                return 'Please enter a valid Item ID.'
            }
        }
    }
];

inquirer.prompt(questionMain).then(function (answers) {

    if (answers.action === 'view products for sale') {
        connection.connect();
        connection.query('SELECT item_id as \'Item ID\', product_name as \'Product Name\', department_name AS \'Department Name\', price as Price, stock_quantity AS \'Stock Quantity\' FROM products', function (error, results, fields) {
            if (error) throw error;
            console.log();
            console.table(results);
            connection.end();
        });
    }
    else if (answers.action === 'view low inventory') {
        connection.connect();
        connection.query('SELECT item_id as \'Item ID\', product_name as \'Product Name\', department_name AS \'Department Name\', price as Price, stock_quantity AS \'Stock Quantity\' FROM products WHERE products.stock_quantity < 5', function (error, results, fields) {
            if (error) throw error;
            console.log();
            if (results[0] === undefined) {
                console.log('Everything\'s in good shape. There are no low products.');
            }
            else {
                console.table(results);
            }
            connection.end();
        });
    }
    else if(answers.action === 'add to inventory') {
        connection.connect();
        connection.query('SELECT DISTINCT item_id, product_name FROM products;', function (error, results, fields) {
            if (error) {
                throw error;
                connection.end();
            }         
            inquirer.prompt(getAddInventoryQuestion(results.map(function(currentValue) {return currentValue.item_id + '\t' + currentValue.product_name;}))).then(function(answers) {
                connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${answers.desired_amount} WHERE item_id = ${answers.desired_item_id}`, function(error, results, fields) {
                    console.log('Thank you. Inventory updated!');
                    connection.end();
                });
            });
        });
    }
    else if(answers.action === 'add new product') {

    }
    else {
        throw 'ERROR: Something went wrong.';
    }
});
