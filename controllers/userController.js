const db = require("../database/models");
const bcrypt = require("bcrypt");

module.exports = {
    register: (req,res) => {
        res.render("./users/register");
    },
    create: (req,res) => {
        
        const {username, name, surname, email, password, dni, province, location, address, number_address, postal_code, category} = req.body;
        
        db.User.create({
            username: username.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password.trim(),10),
            category: false
        })
        .then(() => {
            res.redirect("/users/login");
        })
        .catch(error => console.log(error));
        
    },
    login: (req,res) => {
        res.render("./users/login");
    },
    process_login: (req,res) => {
        
        const {email, password, remember} = req.body;
        
        db.User.findOne({
            where: {
                email : email.trim()
            }
        })
        .then(result => {
            
            if (result && bcrypt.compareSync(password, result.password)) {
                
                req.session.user = { 
                    id: result.id,
                    username: result.username,
                    name: result.name,
                    surname: result.surname,
                    email: result.email,
                    category: result.category
                }
                
                if (remember) {
                    res.cookie("remember", req.session.user, {
                        maxAge: 1000 * 60 * 60
                    })
                }
                
                res.redirect("/");
            } else {
                res.send("credenciales invalidas")
            }
        })
    },
    profile: (req,res) => {
        
        db.User.findOne({
            where: {
                id: req.params.id,
                username: req.params.username
            }
        })
        .then(result => {
            res.render("./users/profile", {result});
        })
    },
    edit_profile: (req,res) => {

        db.User.findOne({
            where: {
                id: req.params.id,
                username: req.params.username
            }
        })
        .then(result => {
            res.render("./users/update", {result});
        })
    },
    update: (req,res) => {
        
        const {username, name, surname, email, password, dni, province, location, address, number_address, category} = req.body;
        
        db.User.update({
            username: username.trim(),
            name: name.trim(),
            surname: surname.trim()
        },
        {
            where: {
                id: req.params.id,
                username: req.params.username
            }
        })
        .then(result => { // devuelve un booleano > cero si no se completa || uno si se realiza
            
            if (result != 0) {
                db.User.findOne({
                    where: {
                        id: req.params.id,
                        username: username.trim()
                    }
                })
                .then(user => {

                    req.session.user = { // actualizo los datos en session
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        category: user.category
                    }

                    res.cookie("remember", req.session.user, { // actualizo datos en cookie
                        maxAge: 1000 * 60 * 60
                    })

                    res.redirect(`/users/profile/${user.id}/${user.username}`);
                })
            }
        })
        .catch(error => console.log(error));
    },
    logout: (req,res) => {

        req.session.destroy();

        res.clearCookie('remember');/* para poder limpiar la cookie */
        
        res.redirect('/');
    },
    remove: (req,res) => {
        
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/");
        })
        .catch(error => console.log(error));
    }
}