const router = require("express").Router();

const {categorys} = require("../controllers/apiController");

router.get("/categories", categorys);

module.exports = router;