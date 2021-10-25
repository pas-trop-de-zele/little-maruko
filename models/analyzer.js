const PastData = require("./pastdata");

class Analyzer {
    constructor(order) {
        this.cart = order.cart;
    }

    store_ordered_items() {
        let ordered_items = this.extract_items();
        ordered_items.forEach((ordered_product) => {
            PastData.count(
                { _id: ordered_product.item._id },
                function (err, count) {
                    if (count == 0) {
                        PastData.create({
                            // _id: ordered_product.item._id,
                            orderedItem: ordered_product.item.name,
                            orderedQuantity: ordered_product.qty,
                            itemId: ordered_product.item._id,
                        });
                    } else {
                        PastData.findByIdAndUpdate(
                            ordered_product.item._id,
                            { $inc: { orderedQuantity: ordered_product.qty } },
                            (err, updated_ordered_product) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    extract_items() {
        let items = [];
        for (let id in this.cart) {
            items.push(this.cart[id]);
        }
        return items;
    }
}

module.exports = Analyzer;
