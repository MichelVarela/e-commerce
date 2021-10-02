const db = require("../database/models");

module.exports = {
    register: (req,res) => {

        let categorys = db.Category.findAll();
        let subcategorys = db.Subcategory.findAll({
            include: [{ association: "fk_category"}]
        });

        Promise.all([categorys, subcategorys])
        .then(([categorys, subcategorys]) => {
            res.render("./products/register", {categorys, subcategorys});
        })
        .catch(error => console.log(error));
        
    },
    create: (req,res) => {
        
        const {name, price, discount, stock, description, shipping, active, subcategoryId} = req.body;
        
        db.Product.create({
            name: name.trim(),
            price,
            discount,
            stock,
            description: description.trim(),
            shipping: false,
            featured: false,
            active: false,
            subcategoryId 
        })
        .then(product => {

            let id = product.id;
            let upload = [];

            if(req.files[0]){
                req.files.forEach(element => {

                    const image = {
                        name: element.filename,
                        productId: id
                    }
                    upload.push(image);

                })
                
                db.Image.bulkCreate(upload)
                .then(() => res.redirect("/admin/products"));
            }else{
                db.Image.create({
                    name: 'default.png',
                    productId: id
                })
                .then(() => res.redirect("/admin/products")); 
            }
        })
        .catch(error => console.log(error));
    },
    update: (req,res) => {

        const {name, price, discount, stock, description, shipping, active, subcategoryId} = req.body;
        
        db.Product.update({
            name: name.trim(),
            price,
            discount,
            stock,
            description: description.trim(),
            shipping: false,
            active: true,
            subcategoryId 
        },{
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json("Producto editado");
        })
        .catch(error => res.status(500).json(error));

    },
    remove: (req,res) => {

        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json("Producto eliminado");
        })
        .catch(error => res.status(500).json(error));
    }
}