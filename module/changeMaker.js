var Index = require('./index.js');
var acc = new Index.Account();
var arr = [];

acc.on("foodAdded", Index.logAddedItem);
acc.on("foodRemoved",Index.logRemovedItem);
acc.on("error", Index.error);
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
acc.printOrder();           //print order

acc.removeLastItem();       //item removed

// acc.printOrder();
acc.removeAllItems();       //empty the order

acc.printOrder();



