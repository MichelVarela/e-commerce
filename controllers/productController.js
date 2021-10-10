const db = require("../database/models");

module.exports = {
    register: (req,res) => {
        
        let category = db.Category.findAll();
        let subcategory = db.Subcategory.findAll();
        
        Promise.all([category, subcategory])
        .then(([categorys, subcategorys]) => {
            res.render("./products/register", {categorys, subcategorys});
        })
        .catch(error => console.log(error));
        
    },
    create: (req,res) => {
        
        const {name, price, discount, stock, description, shipping, active, categoryId, subcategoryId} = req.body;
        
        db.Category_subcategory.findOne({
            where: {
                categoryId,
                subcategoryId
            }
        })
        .then(result => {
            
            if (result) { // si el id category coincide 
                db.Product.create({
                    name: name.trim(),
                    price,
                    discount,
                    stock,
                    description: description.trim(),
                    shipping: false,
                    featured: false,
                    active: false,
                    categoryId: result.id // toma el id de la categoria que coincide
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
                });
            } else { // si no existe creo la asociacion 
                db.Category_subcategory.create({
                    categoryId,
                    subcategoryId
                })
                .then(category_created => {
                    db.Product.create({
                        name: name.trim(),
                        price,
                        discount,
                        stock,
                        description: description.trim(),
                        shipping: false,
                        featured: false,
                        active: false,
                        categoryId: category_created.id // toma el id de la categoria creada
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
                    });
                });
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