var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var dbkeys = require('./keys.js');

var connection = mysql.createConnection(dbkeys.key);

var queries = {
    selectAll: function() {
        return `SELECT department_id AS 'Department ID', departments.department_name AS 'Department Name',over_head_costs AS 'Overhead Costs', COALESCE(products.product_sales) as 'Total Sales', COALESCE(products.product_sales,0) - departments.over_head_costs AS Profits FROM departments LEFT JOIN products ON products.department_name = departments.department_name GROUP BY department_id`;
    },
    insertDepartment: function(name, overhead) {
        return mysql.format(`INSERT INTO departments (department_name, over_head_costs) VALUES (\'${department_name}\', ${parseFloat(department_overhead)})``INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)`, [name, overhead]);
    },

}

var questions = [
    {
        type:'list',
        name:'action',
        message: 'Welcome to Superbamazon, bamazon\'s Supervison Application. What can I help you with today?',
        choices: ['View Product Sales by Department',
                  'Create New Department',],
        filter: function(value) {
            return value.toLowerCase();
        }
    }
];

var displayTotals = function(input_connection) {
    input_connection.connect();
    input_connection.query(queries.selectAll(), function (error, results, fields) {
        console.table(results);
        input_connection.end();
    });
};

var departmentQuestions = [
    {
        type: 'input',
        name: 'department_name',
        message: 'Please enter the name of the new department.',
    },
    {
        type: 'input',
        name: 'overhead_costs',
        message: 'Please enter the overhead costs of the new department.',
        filter: function(value) {
            return parseFloat(value);
        }
    }
];

var insertNewDepartment = function(input_connection, department_name, department_overhead) {
    input_connection.connect();
    input_connection.query(queries.insertDepartment(department_name, department_overhead), function (error, results, fields) {
//        console.log(results);
        if (results != undefined) {
            console.log('Department Added');
        }
        else {
            throw 'Something went wrong. Please try adding the department again.';
        }
        input_connection.end();
    });
}

inquirer.prompt(questions).then(function(answers) {
    if (answers.action === 'view product sales by department') {
        displayTotals(connection);
    }
    else if (answers.action === 'create new department') {
        inquirer.prompt(departmentQuestions).then(function(answers) {
            insertNewDepartment(connection, answers.department_name, answers.overhead_costs); 
        });
    }
});



