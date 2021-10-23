const router = require("express").Router();

const {index, search} = require("../controllers/homeController");

/* GET home page. */
router.get('/', index);
router.get('/search', search);

module.exports = router;
