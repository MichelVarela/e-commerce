const router = require("express").Router();

const {register, create, update, remove } = require("../controllers/productController");
const upload = require("../middlewares/imageLoad");

router.get("/register", register);
router.post("/create", upload.any(), create);

router.put("/update/:id", update);
router.delete("/remove/:id", remove);

module.exports = router;