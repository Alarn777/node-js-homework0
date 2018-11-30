var events = require('events');
// var eventsConfig = require("./config.js").events;
// var changeMaker = require("./changeMaker.js");
// var http = require('http');

class Pizza{
    constructor(){
        this.price = 10;
        this.product_name = "Pizza";
    }

}

class Hamburger{
    constructor(){
        this.price = 16;
        this.product_name = "Hamburger";
    }

}

class Salad{
    constructor(){
        this.price = 5;
        this.product_name = "Salad";
    }
}

class Account extends events.EventEmitter {
    constructor() {
        super();
        this.maxConst = 12;
        this.ordered = [];
        this.logString  = [];
        this.totalPrice = 0;


    }
    addHamburger(){
        let temp = new Hamburger();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp);
            this.totalPrice += temp.price;
            this.emit('foodAdded',this.logString);
        }
        else{
            this.emit('error',this.logString);
        }

        return temp
    }
    addPizza(){
        let temp = new Pizza();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp);
            this.totalPrice += temp.price;
            this.emit('foodAdded',this.logString);
        }
        else{
            this.emit('error');
        }
    }
    addSalad(){
        let temp = new Salad();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp);
            this.totalPrice += temp.price;
            this.emit('foodAdded',this.logString);
        }
        else{
            this.emit('error',this.logString);
        }
    }
    removeLastItem(){

        if(this.ordered.length > 0){
            this.emit('foodRemoved',this.logString);
            let x = this.ordered.pop();
            this.totalPrice -= x.price;
        }


    }
    bubbleSort(a) {
        var swapped;
        do {
            swapped = false;
            for (var i=0; i < a.length-1; i++) {
                if (a[i].price > a[i+1].price) {
                    var temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }
    printOrder(){
        this.bubbleSort(this.ordered);
        var string = "";
        console.log("---------------------MyShop------------------------");
        for (var i = 0;i < this.ordered.length; i++) {
            console.log(this.ordered[i].product_name + " Price:" + this.ordered[i].price);
            string += this.ordered[i].product_name + " Price:" + this.ordered[i].price +"\n";
        }
        console.log("---------------------------------------------------");
        console.log("Total Price: " + this.totalPrice);
        console.log("---------------------------------------------------");
        string += "Total Price: " + this.totalPrice;
        return string;
    };
    removeAllItems(){
        this.ordered = [];
        this.totalPrice = 0;
        console.log("Everything was deleted!");
        this.logString.push("Everything was deleted!");
    };
}



function logAddedItem(param) {
    var returnString = `Item added was : ${this.ordered[this.ordered.length-1].product_name}`;

    console.log(returnString);
    param.push(returnString);
}

function logRemovedItem(param) {
    var returnString = `Item removed was : ${this.ordered[this.ordered.length-1].product_name}`;
    console.log(returnString);
    param.push(returnString);
}

function error(param) {
    var returnString = "Unable to add item, max reached";
    console.log(returnString);
    param.push(returnString);
}

module.exports = {
    Account : Account,
    logAddedItem: logAddedItem,
    logRemovedItem:logRemovedItem,
    error:error
};


