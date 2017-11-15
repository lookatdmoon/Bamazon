// Node Application bamazonCustomer.js 
// Mhirra Yung NU0814 Week 12 Homework

// Declare required modules
var mysql = require("mysql")
var inquirer = require("inquirer");

// Set connection
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


// Display all of the items available for sale. 
function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "\nName: " + res[i].product_name +
                "\nPrice: " + res[i].price + "\n \n");
        }
        runQuery();
    });
}

// Prompt users with two messages.
function runQuery() {
    inquirer.prompt([{
    		// Ask them the ID of the product they would like to buy.
            type: "input",
            name: "item_id",
            message: "Please see the above list and enter in the ID of the product you wish to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
        	// Ask how many units of the product they would like to buy.
            type: "input",
            name: "quantity",
            message: "Please enter the quantity you wish to purchase",
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
            var id = res[0].item_id;
            var newQuant = res[0].stock_quantity - answers.quantity,
                orderPrice = res[0].price * answers.quantity;
            var totalSales = res[0].product_sales + orderPrice;

            // If not enough inventory then, display msg and prevent the order from going through.
            if (res[0].stock_quantity < answers.quantity) {
                console.log("Insufficient Quantity!");
                connection.end();

            // If enough of the product, then fulfill the order.
            } else {
                connection.query('UPDATE products SET ? WHERE id = ?', [{ stock_quantity: newQuant, product_sales: totalSales }, item_id],

                	// Show the customer the total cost of their purchase.
                    function(err, res) {
                        console.log("Order successful! Total cost: $" + orderPrice);
                        inquirer.prompt([{
                            name: "confirm",
                            type: "confirm",
                            message: "Make another purchase?"
                        }]).then(function(answers) {
                            if (answers.confirm === true) {
                                displayProducts();

                            // End connection to database.
                            } else {
                                connection.end();
                            }
                        })

                    });
            }
        });
    })

}
