// Node Application bamazonCustomer.js 
// Mhirra Yung NU0814 Week 12 Homework 11/15/17

// Declare required npm modules
var mysql = require("mysql")
var inquirer = require("inquirer");

// 1. Set connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Username, password and database
  user: "root",
  password: "ItsNotFriday!",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});


// 2. Display all of the items available for sale. 
function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "  |  Name: " + res[i].product_name + "  |  Price: $" + res[i].price);
        }
        runQuery();
    });
}

// Prompt users with two messages.
function runQuery() {
    inquirer.prompt([{
    		// 3. Ask them the ID of the product they would like to buy.
            type: "input",
            name: "item_id",
            message: "Welcome to Bamazon!  Please see the above list and enter in the ID of the product you wish to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
        	// 4. Ask how many units of the product they would like to buy.
            type: "input",
            name: "quantity",
            message: "Please enter the quantity you wish to purchase of this item. ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        } 
    ]).then(function(answers) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: answers.item_id }, function(err, res) {
            if (err) throw err;

            // Once the customer has placed the order, check inventory.
            var item_id = res[0].item_id;
            var newQuant = res[0].stock_quantity - answers.quantity,
                orderPrice = res[0].price * answers.quantity;
            var totalSales = res[0].product_sales + orderPrice;

            // 7. If not enough inventory then, display msg and prevent the order from going through.
            if (res[0].stock_quantity < answers.quantity) {
                console.log("Oops! This item was soo popular that we sold out!");
                connection.end();

            //  5. 6.  If enough of the product, then fulfill the order.
            } else {
                connection.query('UPDATE products SET ? WHERE item_id = ?', [{ stock_quantity: newQuant, product_sales: totalSales }, item_id],

                	// Show the customer the total cost of their purchase.
                    function(err, res) {
                        console.log("Your order was successful! The total cost for your order is: $" + orderPrice);
                        inquirer.prompt([{
                            name: "confirm",
                            type: "confirm",
                            message: "Would you like to make another purchase?"
                        }]).then(function(answers) {
                            if (answers.confirm === true) {
                                displayProducts();

                            // End connection to the database.
                            } else {
                                connection.end();
                            }
                        })

                    });
            }
        });
    })

}
