const router = require("express").Router();

const {subcategory} = require("../controllers/apiController");

router.get("/subcategory", subcategory);

module.exports = router;