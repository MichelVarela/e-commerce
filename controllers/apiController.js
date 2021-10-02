const db = require("../database/models");

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl; // ruta actual
const getUrlBase  = (req) => req.protocol + '://' + req.get('host'); // ruta base

module.exports = {
    subcategory: (req,res) => {

        db.Subcategory.findAll({
            include: [{ association: "fk_category"}]
        })
        .then(subcategorys => {

            let response = {
                meta: {
                    status: 200,
                    link: getUrl(req),
                    back: getUrlBase(req)
                },
                data: subcategorys
            }

            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json(error));
        
    }
}