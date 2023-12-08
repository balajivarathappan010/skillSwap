const express = require('express');
const userController = require('../controllers/register');
const multer = require('../middleware/multer');
const router = express.Router();


router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/experienced", userController.experienced);
router.post("/engineering", userController.engineering);
router.post("/singleMaterials", userController.singleMaterials);
router.post("/arts", userController.arts);

// router.post("/singleMaterials",upload.single("file"), userController.addItem);
module.exports=router;

