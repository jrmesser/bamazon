# a little CLI bamazon app using mysql

# introduction

bamazon is a command line application providing a store. 

# customer interactcion

customers can browse and order items from the store:
```bash
$ node bamazonCustomer.js
Item ID  Product Name                   Unit Price (USD)
-------  -----------------------------  ----------------
1        Coffee Beans                   16.99
2        Red Bull                       30
3        Dog Food                       53.5
4        Cat Food                       12.99
5        Popcorn                        5
6        Alagash White                  12
7        How Google Works               19.99
8        New York Times Sunday Edition  5
9        eReader PaperColor             120
10       MacBook Pro                    6700000

? Please enter the Item ID of the product you wish to purchase. 4
? Please enter the quantity you would like to purchase. 2
Placing your order!
Your order has been placed! Have a nice day!
```

if the quantity you request isn't available, bamazon will let you know.

# manager interactions

managers can check on store stock, replenish stock, or add new items to existing departments.

```bash
$ node bamazonManager.js
? Welcome, to Bamager, Bamazon's Management Application. How may I assist you? (Use arrow keys)
> View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product
```

to choose an option, use the arrow keys or whatever bindings you have configured in bash.

```bash
View Products for Sale

Item ID  Product Name                   Department Name  Price    Stock Quantity
-------  -----------------------------  ---------------  -------  --------------
1        Coffee Beans                   Grocery          16.99    100
2        Red Bull                       Grocery          30       50
3        Dog Food                       Pet Supplies     53.5     25
4        Cat Food                       Pet Supplies     12.99    48
5        Popcorn                        Grocery          5        200
6        Alagash White                  Liquor           12       10
7        How Google Works               Books and Games  19.99    20
8        New York Times Sunday Edition  Books and Games  5        150
9        eReader PaperColor             Electronics      120      50
10       MacBook Pro                    Electronics      6700000  10
```

as you can see, the 2 units of cat food have been removed from the original lot of 50.

the options to view low inventory and add to inventory work as you might expect.

```bash
$ node bamazonManager.js
? Welcome, to Bamager, Bamazon's Management Application. How may I assist you? Add to Inventory
? Please the product you wish to re-order. 4    Cat Food
? Please enter the quantity you would like to add. 2
Thank you. Inventory updated!

$ node bamazonManager.js
? Welcome, to Bamager, Bamazon's Management Application. How may I assist you? View Low Inventory

Everything's in good shape. There are no low products.
```
if adding inventory, bamager will allow you to only replace items already listed for sale.

asking bamager for low inventory will display a list of all inventory with less than 5 units remaining.

the option to add a new product will prompt you to:
* free type in the product name
* choose the product department from the list of current departments
** talk to a supervisor if you need to add a new department
* the price of the item
* the quantity of the item

please remember that these prompts should be completed carefully. your customers will see whatever you type!

```bash
$ node bamazonManager.js
? Welcome, to Bamager, Bamazon's Management Application. How may I assist you? Add New Product
? Please enter the name of the new product Kitten Degreaser
? Please choose the department of the new product. 2    Pet Supplies
? Please enter the unit price of the new product 50.25
? Please enter the desired units of the new product 50
New product added!

$ node bamazonManager.js
? Welcome, to Bamager, Bamazon's Management Application. How may I assist you? View Products for Sale

Item ID  Product Name                   Department Name  Price    Stock Quantity
-------  -----------------------------  ---------------  -------  --------------
1        Coffee Beans                   Grocery          16.99    100
2        Red Bull                       Grocery          30       50
3        Dog Food                       Pet Supplies     53.5     25
4        Cat Food                       Pet Supplies     12.99    48
5        Popcorn                        Grocery          5        200
6        Alagash White                  Liquor           12       10
7        How Google Works               Books and Games  19.99    20
8        New York Times Sunday Edition  Books and Games  5        150
9        eReader PaperColor             Electronics      120      50
10       MacBook Pro                    Electronics      6700000  10
11       Kitten Degreaser               Pet Supplies     50.25    50
```






