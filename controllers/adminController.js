const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    users_list: (req,res) => {
        
        db.User.findAll()
        .then(users => {
            res.render("./admin/users", {users});
        })
        .catch(error => console.log(error));
    },
    users_update: (req,res) => {

        const {category} = req.body;

        db.User.update({
            category: category == 1 ? true : false
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/users");
        })
        .catch(error => console.log(error));

    },
    users_remove: (req,res) => {

        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/users");
        })
        .catch(error => console.log(error));
    },
    category: (req,res) => {

        db.Category.findAll()
        .then(categorys => {
            res.render("./admin/category", {categorys});
        })
        .catch(error => console.log(error));
        
    },
    create_category: (req,res) => {

        const {name, active } = req.body;

        db.Category.create({
            name: name.trim(),
            active: true
        })
        .then(() => {
            res.redirect("/admin/category");
        })
        .catch(error => console.log(error));
    },
    update_category: (req,res) => {

        const {name, active} = req.body;

        db.Category.update({
            name: name.trim(),
            active: active ? true : false
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/category");
        })
        .catch(error => console.log(error));

    },
    remove_category: (req,res) => {

        db.Category.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/category");
        })
        .catch(error => console.log(error));
    },
    subcategory: (req,res) => {

        let category = db.Category.findAll();
        let subcategory = db.Subcategory.findAll({
            include: [{ association: "fk_category"}]
        });

        Promise.all([category, subcategory])
        .then(([categorys, subcategorys]) => {
            res.render("./admin/subcategory", {categorys, subcategorys});
        })
        .catch(error => console.log(error));
        
    },
    create_subcategory: (req,res) => {

        const {name, categoryId} = req.body;

        db.Subcategory.create({
            name: name.trim(),
            categoryId: categoryId //? categoryId : "error" 
        })
        .then(() => {
            res.redirect("/admin/subcategory");
        })
        .catch(error => console.log(error));

    },
    update_subcategory: (req,res) => {

        const {name} = req.body;

        db.Subcategory.update({
            name: name.trim()
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/subcategory");
        })
        .catch(error => console.log(error));
    },
    remove_subcategory: (req,res) => {

        db.Subcategory.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/admin/subcategory");
        })
        .catch(error => console.log(error));
    },
    products_list: (req,res) => {

        db.Product.findAll()
        .then(products => {
            res.render("./admin/products", {products, toThousand});
        })

    },
    products_update: (req,res) => {

        const {active} = req.body;

        db.Product.update({
            active
        })
    }
}