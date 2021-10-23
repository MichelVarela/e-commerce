const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req,res) => {
        
        db.Product.findAll({
            where: {
                featured: true,
                active: true
            },
            limit: 8,
            include: [{ association: "fk_image"}, {association: "fk_category_subcategory"}]
        })
        .then(products => {
            //res.send(products)
            res.render("./home", {products, toThousand});
        })
        .catch(error => console.log(error));
        
    },
    search: (req,res) => {
        
        let search = req.query.search.toLowerCase().trim();
        
        db.Product.findAll({
            include: [{association: "fk_image"}]
        })
        .then(element => {

            let products = element.filter(product => {

                if (product.name.toLowerCase().includes(search)) {
                    return product
                }
            });

            res.render("search", {products, toThousand});
        })
        .catch(error => console.log(error));
    }
}