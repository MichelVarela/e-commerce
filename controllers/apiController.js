const db = require("../database/models");

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl; // ruta actual
const getUrlBase  = (req) => req.protocol + '://' + req.get('host'); // ruta base

module.exports = {
    categorys: (req,res) => {

        let categorys = db.Category.findAll();
        let subcategorys = db.Subcategory.findAll();

        Promise.all([categorys, subcategorys])
        .then(([categorys, subcategorys]) => {

            let response = {
                meta: {
                    status: 200,
                    link: getUrl(req),
                    back: getUrlBase(req)
                },
                data: {
                    categorys,
                    subcategorys
                }
            }

            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json(error));
        
    }
}