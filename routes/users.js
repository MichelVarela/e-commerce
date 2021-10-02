const router = require("express").Router();

const {register, create, login, process_login, profile, edit_profile, update, logout, remove} = require("../controllers/userController");

/* GET users listing. */
router.get("/register", register);
router.post("/create", create);

router.get("/login", login);
router.post("/login", process_login);

router.get("/profile/:id/:username", profile);

router.get("/update/:id/:username", edit_profile);
router.put("/update/:id/:username", update);

router.get("/logout", logout);
router.delete("/remove/:id", remove);

module.exports = router;
