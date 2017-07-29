a little CLI bamazon app using mysql

#introduction

bamazon is a command line application providing a store. 

#customer interactcion

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
11       teeth                          1
12       wallets                        80
13       hydroflasks                    24
14       pens                           50
15       tea leaves                     2.15
16       Cheese                         5.25
17       Cheese                         5.45
18       Mice                           30
19       Dog Food                       53

? Please enter the Item ID of the product you wish to purchase. 19
? Please enter the quantity you would like to purchase. 1
Placing your order!
Your order has been placed! Have a nice day!
```

#manager interactions#
