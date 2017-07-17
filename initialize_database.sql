drop database bamazon;
create database bamazon;
use bamazon;
create table products(item_id integer(10) not null auto_increment,
product_name varchar(128) not null,
department_name nvarchar(30) not null,
price decimal(19,2) not null,
stock_quantity integer(7) not null,
primary key (item_id));
insert into bamazon.products values (1, 'Coffee Beans', 'Grocery', 16.99, 100);
insert into bamazon.products values (2, 'Red Bull', 'Grocery', 30.00, 50);
insert into bamazon.products values (3, 'Dog Food', 'Pet Supplies', 53.50, 25);
insert into bamazon.products values (4, 'Cat Food', 'Pet Supplies', 12.99, 50);
insert into bamazon.products values (5, 'Popcorn', 'Grocery', 5.00, 200);
insert into bamazon.products values (6, 'Alagash White', 'Liquor', 12.00, 10);
insert into bamazon.products values (7, 'How Google Works', 'Books and Games', 19.99, 20);
insert into bamazon.products values (8, 'New York Times Sunday Edition', 'Books and Games', 5.00, 150);
insert into bamazon.products values (9, 'eReader PaperColor', 'Electronics', 120.00, 50);
insert into bamazon.products values (10, 'MacBook Pro', 'Electronics', 6700000.00, 10);