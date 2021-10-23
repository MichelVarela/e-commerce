const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
    product_edit: (req,res) => {

        db.Product.findOne({
            where: {
                id: req.params.id,
                name: req.params.name
            },
            include: [{ association: "fk_category_subcategory"}, { association: "fk_image"}]
        })
        .then(product => {

            let category = db.Category.findOne({
                where: {
                    id: product.fk_category_subcategory.categoryId
                }
            })
            
            let subcategory = db.Subcategory.findOne({
                where: {
                    id: product.fk_category_subcategory.subcategoryId
                }
            })

            let category_list = db.Category.findAll();
            let subcategory_list = db.Subcategory.findAll();

            Promise.all([category, subcategory, category_list, subcategory_list])
            .then(([category, subcategory, category_list, subcategory_list]) => res.render("./products/update", {product, category, subcategory, category_list, subcategory_list}))
        })
        .catch(error => console.log(error));
        
    },
    update: (req,res) => { // definir editado de imagenes
        
        const {name, price, discount, stock, description, shipping, featured, active, categoryId, subcategoryId} = req.body;
        
        db.Category_subcategory.findOne({
            where: {
                categoryId,
                subcategoryId
            }
        })
        .then(result => {

            if (result) {
                db.Product.update({
                    name: name.trim(),
                    price,
                    discount,
                    stock,
                    description: description.trim(),
                    shipping: shipping ? true : false,
                    featured: featured ? true : false,
                    active: active ? true : false,
                    categoryId: result.id // toma el id que coincida con los valores pasados 
                },{
                    where: {
                        id: req.params.id,
                        name: req.params.name
                    }
                })
                .then(() => {
                    res.redirect(`/products/detail/${req.params.id}/${req.params.name}`);
                })
            } else { // si no existe creo la asociacion

                db.Category_subcategory.create({
                    categoryId,
                    subcategoryId
                })
                .then(category_created => {

                    db.Product.update({
                        name: name.trim(),
                        price,
                        discount,
                        stock,
                        description: description.trim(),
                        shipping: shipping ? true : false,
                        featured: featured ? true : false,
                        active: active ? true : false,
                        categoryId: category_created.id // toma el id de la category creada 
                    },{
                        where: {
                            id: req.params.id,
                            name: req.params.name
                        }
                    })
                    .then(() => {
                        res.redirect(`/products/detail/${req.params.id}/${req.params.name}`);
                    })
                })

            }
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
            res.redirect("/admin/products");
        })
        .catch(error => console.log(error));
    },
    detail: (req,res) => {

        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{ association: "fk_category_subcategory"}, { association: "fk_image"}]
        })
        .then(product => {
            //res.send(product)

            let category = db.Category.findOne({
                where: {
                    id: product.fk_category_subcategory.categoryId
                }
            })
            
            let subcategory = db.Subcategory.findOne({
                where: {
                    id: product.fk_category_subcategory.subcategoryId
                }
            })

            Promise.all([category, subcategory])
            .then(([category, subcategory]) => res.render("./products/detail", {product, category, subcategory, toThousand}))

        })
        .catch(error => console.log(error));
    },
    product_categorys: (req,res) => {

        let products = db.Product.findAll({
            include: [{association: "fk_category_subcategory"}, {association: "fk_image"}]
        });
        
        let categorys = db.Category.findAll();

        Promise.all([products, categorys])
        .then(([products, categorys]) => {

            let filtrados = products.filter(product => product.fk_category_subcategory.categoryId == req.params.id);
            
            let category = categorys.filter(el => el.id == req.params.id);

            res.render("./products/categorys", {filtrados, category, toThousand});
            
        })
        .catch(error => console.log(error));
    },
    product_subcategorys: (req,res) => {

        let products = db.Product.findAll({
            include: [{association: "fk_category_subcategory"}, {association: "fk_image"}]
        });
        
        let subcategorys = db.Subcategory.findAll();

        Promise.all([products, subcategorys])
        .then(([products, subcategorys]) => {

            let filtrados = products.filter(product => product.fk_category_subcategory.subcategoryId == req.params.id);
            
            let subcategory = subcategorys.filter(el => el.id == req.params.id);

            res.render("./products/subcategorys", {filtrados, subcategory, toThousand});
            
        })
        .catch(error => console.log(error));
    }
}