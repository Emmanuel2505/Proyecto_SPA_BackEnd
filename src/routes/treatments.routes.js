const express = require("express");
const adminAccess = require("../admin");
const {
  newTreatment,
  getMaxThreeServices,
  getAllTreatments,
  getOneService,
  updateOneService,
  deleteOneService,
  // changeDirectoryServices,
} = require("../controllers/treatments.controllers");
const upload = require("../storage");
const ensureToken = require("../token");
const router = express.Router();
//añadir un tratamiento -- administrador
router.post(
  "/new-treatment",
  ensureToken,
  adminAccess,
  upload.single("image"),
  newTreatment
);

//pedir tratamientos para landing (3)
router.get("/services-landing", getMaxThreeServices);

//pedir todos los tratamientos
router.get("/all-services", getAllTreatments);

//solicitar un tratamiento en específico
router.get("/getOneService/:id", getOneService);

//solicitar un tratamiento en específico -- administrador
router.post(
  "/updateOneService",
  ensureToken,
  adminAccess,
  upload.single("image"),
  updateOneService
);

//elimina un tratamiento en específico -- administrador
router.delete(
  "/deleteOneService/:id",
  ensureToken,
  adminAccess,
  deleteOneService
);

// router.post("/change-directory-services", changeDirectoryServices);

module.exports = router;
