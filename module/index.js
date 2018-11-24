var events = require('events');
var eventsConfig = require("./config.js").events;
var changeMaker = require("./changeMaker.js");
var http = require('http');

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
        this.ordered = [this.maxConst];
        this.totalPrice = 0;


    }
    addHamburger(){
        let temp = new Hamburger();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp.product_name);
            this.totalPrice += temp.price;
            this.emit('foodAdded');
        }
        else{
            this.emit('error');
        }

        return temp
    }
    addPizza(){
        let temp = new Pizza();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp.product_name);
            this.totalPrice += temp.price;
            this.emit('foodAdded');
        }
        else{
            this.emit('error');
        }
    }
    addSalad(){
        let temp = new Salad();
        if(this.ordered.length < this.maxConst) {
            this.ordered.push(temp.product_name);
            this.totalPrice += temp.price;
            this.emit('foodAdded');
        }
        else{
            this.emit('error');
        }
    }
    removeLastItem(){

        if(this.ordered.length > 0){
            this.emit('foodRemoved');
            let x = this.ordered.pop();
            this.totalPrice -= x.price;
        }


    }
    printOrder(){
        console.log("---------------------MyShop------------------------");
        for (var i = 0;i < this.ordered.length; i++) {
        console.log(this.ordered[i]);
        }
        console.log("---------------------------------------------------");
        console.log("Total Price: " + this.totalPrice);
        console.log("---------------------------------------------------");
    };
    removeAllItems(){
        this.ordered = [];
        this.totalPrice = 0;
    };
}



function logAddedItem() {
    console.log(`Item added was : ${this.ordered[this.ordered.length-1]}`);
}

function logRemovedItem() {
    console.log(`Item was removed : ${this.ordered[this.ordered.length-1]}`);
}

function error() {
    console.log("Unable to add item, max reached")

}

module.exports = {
    Account : Account,
    logAddedItem: logAddedItem,
    logRemovedItem:logRemovedItem,
    error:error
};


// const port = 8000;
//
// http.createServer((req,res) =>{
//
//     console.log(process.cwd());
//
//     var urlObj = url.parse(req.url, true, false);
//     fs.readFile(ROOT_DIR,(err,data) => {
//         console.log(`searching at:${ROOT_DIR} ${urlObj.pathname}`);
//         if(err) {
//             res.writeHeader(404);
//             res.end(JSON.stringify(err));
//             return;
//         }
//         res.writeHeader(200,{'Content-Type': 'text/html'});
//         res.write(data);
//         res.end();
//     });
// }).listen(port);
// console.log('listening on port 8000');