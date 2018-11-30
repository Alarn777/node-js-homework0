var server_file = require('./module/changeMaker.js');
var http = require('http');


const port = 8000;

http.createServer((req,res) =>{
    var acc = new server_file.Account();
    var returnDict = []; // create an empty array

    acc.on("foodAdded", server_file.logAddedItem);
    acc.on("foodRemoved",server_file.logRemovedItem);
    acc.on("error", server_file.error);

    acc.addPizza();
    acc.addPizza();
    acc.addHamburger();
    acc.addSalad();
    acc.addPizza();
    acc.addHamburger();
    acc.addSalad();
    acc.addPizza();
    acc.addHamburger();
    acc.addSalad();
    acc.addPizza();
    acc.addHamburger();         //10 items here

    acc.addSalad();             //error here

    acc.removeLastItem();       //item removed
    acc.removeLastItem();
    acc.removeLastItem();

    acc.removeAllItems();       //empty the order

    acc.addPizza();
    acc.addHamburger();
    acc.addSalad();
    acc.addPizza();

    for (let i = 0;i < acc.logString.length;i++)
    {
        var temp  = (acc.logString[i]).split(" ");
        switch (temp[1]){
            case "added":
            {
                returnDict.push({
                    key:   "Adding item",
                    value: acc.logString[i]
                });

                break;
            }
            case "removed":
            {
                returnDict.push({
                    key:   "Removing item",
                    value: acc.logString[i]
                });
                break;
            }
            case "to":
            {
                returnDict.push({
                    key:   "Error message",
                    value: acc.logString[i]
                });
                break;
            }
            case "was":
            {
                returnDict.push({
                    key:   "Delete All",
                    value: acc.logString[i]
                });
                break;
            }
            default:
            {
                returnDict.push({
                    key:   "Error occurred!",
                    value: "Unable to fetch log"
                });
                break;
            }
        }
    }

    returnDict.push({
        key:   "All items:",
        value: acc.printOrder()           //print order
    });

    returnDict.push({
        key:   "Operation:",
        value: "Successful"
    });

    res.writeHeader(200,{'Content-Type': 'application/json'});
    res.write(JSON.stringify(returnDict));
    res.end();

}).listen(port);
console.log('listening on port 8000...');



