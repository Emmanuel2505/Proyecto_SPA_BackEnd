const express = require("express");
//const { allUser, deleteUser } = require("../controllers/users.controllers");
const adminAccess = require("../admin");
const {
  newUser,
  login,
  testToken,
  testTokenAdmin,
} = require("../controllers/users.controllers");
const ensureToken = require("../token");
const router = express.Router();
// const bodyParser = require("body-parser");
// registrar un usuario
router.post("/new-user", newUser);

//router.get('/all', allUser);
//logear xd
router.post("/login", login);

//ruta protejida prueba
router.get("/protected", ensureToken, testToken);

//ruta protejida prueba
router.get("/admin", ensureToken, adminAccess, testTokenAdmin);

//router.delete('/delete/:id', deleteUser);

module.exports = router;
