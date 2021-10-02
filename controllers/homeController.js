const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req,res) => {
        
        db.Product.findAll({
            include: [{ association: "fk_image"}]
        })
        .then(products => {
            //res.send(products)
            res.render("./home", {products, toThousand});
        })
    }
}