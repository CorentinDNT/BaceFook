const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

//Authentification routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//User routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

//Follow routes
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//Upload routes
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
