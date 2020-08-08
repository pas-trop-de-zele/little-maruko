class Cart {
    constructor (cart){
        // If cart object not exist yet will default to 0
        this.items = cart.items || {};
        // If totalQuantity not exist yet will default to 0
        this.totalQuantity = cart.totalQuantity || 0;
        // If totalPrice not exist yet will default to 0
        this.totalPrice = cart.totalPrice || 0;
    }

    add(item, id) {
        // Grab existing item in cart
        let addItem = this.items[id];
        // Check if item already exist
        if (!addItem) {
            addItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        this.items[id].qty++;
        this.totalPrice += this.items[id].item.price;
        this.items[id].price = this.items[id].item.price * this.items[id].qty;
        this.totalQuantity++;
        
    }

    // Right now this.items is an object, we need to out put this to array
    generateProducts() {
        let products = [];
        for (let id in this.items) {
            products.push(this.items[id]);
        }
        return products;
    }
}

module.exports = Cart;