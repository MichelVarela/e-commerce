const router = require("express").Router();

const {register, create, product_edit, update, remove, detail, product_categorys, product_subcategorys } = require("../controllers/productController");
const upload = require("../middlewares/imageLoad");

router.get("/register", register);
router.post("/create", upload.any(), create);

router.get("/update/:id/:name", product_edit);
router.put("/update/:id/:name", update);

router.delete("/remove/:id", remove);

router.get("/detail/:id/:name", detail);

router.get("/categorys/:id", product_categorys);
router.get("/subcategorys/:id", product_subcategorys);

module.exports = router;