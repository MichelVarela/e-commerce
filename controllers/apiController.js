const db = require("../database/models");

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl; // ruta actual
const getUrlBase  = (req) => req.protocol + '://' + req.get('host'); // ruta base

module.exports = {
    categorys: (req,res) => {

        db.Category_subcategory.findAll({
            include: [{ association: "fk_category"}, { association: "fk_subcategory"}]
        })
        .then(categorys => {

            let response = {
                meta: {
                    status: 200,
                    link: getUrl(req),
                    back: getUrlBase(req)
                },
                data: categorys
            }

            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json(error));
        
    }
}