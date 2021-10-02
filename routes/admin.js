const router = require("express").Router();

const {users_list, users_remove, users_update, category, create_category, update_category, remove_category, subcategory, create_subcategory, update_subcategory, remove_subcategory, products_list} = require("../controllers/adminController");

router.get("/users", users_list);
router.put("/users/update/:id", users_update);
router.delete("/users/remove/:id", users_remove);

router.get("/category", category);
router.post("/category/create", create_category);
router.put("/category/update/:id", update_category);
router.delete("/category/remove/:id", remove_category);

router.get("/subcategory", subcategory);
router.post("/subcategory/create", create_subcategory);
router.put("/subcategory/update/:id", update_subcategory);
router.delete("/subcategory/remove/:id", remove_subcategory);

router.get("/products", products_list);

module.exports = router;