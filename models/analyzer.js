const Tea = require("./teas");

class Analyzer {
    constructor(order) {
        this.cart = order.cart;
    }

    store_ordered_items() {
        let ordered_teas = this.extract_items();
        ordered_teas.forEach((ordered_tea) => {
            Tea.findByIdAndUpdate(
                ordered_tea.item._id,
                { $inc: { orderCount: ordered_tea.qty } },
                (err, updated_ordered_tea) => {
                    if (err) {
                        console.log(err);
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
