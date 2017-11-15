# The Wonderful World of Bamazon!
Built under the management of Mhirra Yung

![builtwithlove](http://forthebadge.com/images/badges/built-with-love.svg)

## Summary
Bamazon is an Amazon-like storefront. The application will take in orders from customers and deplete stock from the store's inventory with each successful customer order.

## Customer Journey - User Flow 

1 - Run Node application called bamazonCustomer.js via the command line. The application will first display all of the items available for sale to the customer and includes: the item ids, names, and prices of products that are for sale.
<img src="https://github.com/lookatdmoon/Bamazon/blob/master/Screenshots/UserFlow_1_2_3.png?raw=true">

2 - The app should then prompt the customer with 2 messages.
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
<img src="https://github.com/lookatdmoon/Bamazon/blob/master/Screenshots/UserFlow_4.png?raw=true">

3 - If there is enough of the product, then the order can be fulfilled and  the total cost of the purchase is shown to the customer and they are asked if they would like to make another purchase.
<img src="https://github.com/lookatdmoon/Bamazon/blob/master/Screenshots/UserFlow_5_6.png?raw=true">

4 - If there is not enough inventory from the quantity that the buyer entered then a message will display that will display that there is no more inventory and the app will prevent the order from going through. Finally end the connection to the database.
<img src="https://github.com/lookatdmoon/Bamazon/blob/master/Screenshots/UserFlow_7.png?raw=true">

## Additional Screenshot
The MySQL database that this app is connected will update with each successful customer purchase. 
<img src="https://github.com/lookatdmoon/Bamazon/blob/master/Screenshots/bamazon_db.products_inventoryupdated.png?raw=true">

## Technologies utilized
**Languages:**
* Javascript
* Node.js 
* MySQL

**NPM packages:**
* ![MySQL](https://www.npmjs.com/package/mysql)
* ![Inquirer](https://www.npmjs.com/package/inquirer)

## What's Included
The file structure for the directories and files that support this application can be viewed below.

```
Bamazon/
├── Screenshots
│   ├── bamazon_db.products_inventoryupdate.png
│   ├── UserFlow_1_2_3.png
│   ├── UserFlow_4.png
│   ├── UserFlow_5_6.png
│   ├── UserFlow_7.png
├── /* git.ignore
├── /* bmazon_db.sql
├── /* bmazonCustomer.js
├── /* README.md
```




