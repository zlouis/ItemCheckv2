# ItemCheckv2

A basic plugin site to be scraped for current review and checks for stock.

Using a form, user inputs unique URL to check for reivews/stock. Saves the item to database and items can be refreshed to check if it is still in stock at targeted webpage.

Items with "Stock: reviews" means current item is in stock at targeted webpage. Otherwise "stock: This product is out of stock and cannot be added to your cart at this time." indicates the item is out of stock.

Additional Notes:
The application can be adapted to any use cases. Simply edit server.js.
line 133 - charge target class or add additional target class to be scraped.
Line 207 - change target class or add additional target class to be re-scraped and reinserted into database (essentially acts as an Update or refresh function).


11/6/17 update
* add refresh button to individual database item

https://possessed-spell-88283.herokuapp.com/
