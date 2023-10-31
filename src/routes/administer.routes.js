const express = require("express");
const adminAccess = require("../admin");
const upload = require("../storage");
const ensureToken = require("../token");
const router = express.Router();

const {getInfo, addInfo, editInfoWhitMainImage, editLogo} = require('../controllers/administer.controllers')

router.get('/', getInfo);
//router.post('/addInfo', ensureToken, adminAccess, upload.single("mainImage"), addInfo);
//router.put('/editInfo/:id', ensureToken, adminAccess, upload.single("image"), editInfoWhitMainImage);
router.put('/editLogo/:id', ensureToken, adminAccess, upload.single("image"), editLogo);
router.put('/editInfo/:id', upload.single("image"), editInfoWhitMainImage);
//router.put('/editLogo/:id', upload.single("image"), editLogo);
module.exports = router; 