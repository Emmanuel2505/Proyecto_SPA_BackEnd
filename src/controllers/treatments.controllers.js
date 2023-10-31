const treatmentsCtrl = {};
const URLSERVER = require("../helpers/constants");
const Treatment = require("../models/treatment");
const jwt = require("jsonwebtoken");
const { priceValidate } = require("../helpers/functions");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dm3gntcte",
  api_key: "944791171699979",
  api_secret: "4zaR7n-xm-FfKQ6LhvwpC7uHfuI",
});

treatmentsCtrl.changeDirectoryServices = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    console.log(treatments);
    treatments.forEach(async (el) => {
      el.image = el.image.replace(
        "http://localhost:3001/",
        "https://spa-flor-maria.herokuapp.com/"
      );
      await Treatment.findByIdAndUpdate(el._id, {
        image: el.image,
      });
    });
    // await treatments.save();
    res.json(treatments);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

treatmentsCtrl.deleteOneService = async (req, res) => {
  try {
    const { id } = req.params;
    let status = "ok";
    await Treatment.findByIdAndDelete(id);
    res.json({ status });
  } catch (error) {
    console.log(error);
    res.json({ status: "Ocurrió un error al eliminar el servicio" });
  }
};

treatmentsCtrl.updateOneService = async (req, res) => {
  try {
    const { title, description, price, _id, nameImage } = req.body;
    console.log(req.body);
    console.log(title, description, price, _id, nameImage, req.file);
    let status = "ok";

    let treatment = { title, description, price };

    if (nameImage) {
      const imageUploadeada = await cloudinary.uploader.upload(req.file.path);
      treatment = { ...treatment, image: imageUploadeada.url };
    }
    Treatment.findByIdAndUpdate(_id, treatment, function (err) {
      if (err) {
        console.log("Err -->", err);
        status = err;
      }
    });
    res.json({ status });
  } catch (error) {
    console.log(error);
    res.json({ status: "No se pudo guardar el Tratamiento" });
  }
};

//obtiene todos los tratamientos
treatmentsCtrl.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find().lean();
    res.json({ status: "ok", data: treatments });
  } catch (error) {
    console.log(error);
    res.json({ status: "No se pudo obtener los datos" });
  }
};

treatmentsCtrl.getMaxThreeServices = async (req, res) => {
  try {
    const treatments = await Treatment.find().lean();
    const servicesSend = [];
    for (let i = 0; i < treatments.length && i < 3; i++) {
      servicesSend.push(treatments[i]);
    }
    let status = "vacio";
    if (servicesSend.length === 0) {
      status = "No hay servicios";
    } else {
      status = "ok";
    }
    res.json({ status, data: servicesSend });
  } catch (error) {
    res.json({
      status:
        "No se pudieron obtener los trateminetos para el landing, contacta con tu servicio técnico",
    });
  }
};

//guarda tratamientos
treatmentsCtrl.newTreatment = (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { title, description, price, nameImage } = req.body;

        const imageUploadeada = await cloudinary.uploader.upload(req.file.path);
        // const day = new Date();
        // const image = `${URLSERVER}storage/imgs/${day.getDate()}-${day.getMonth()}-${nameImage}`;
        const treatment = new Treatment({
          title,
          description,
          price,
          image: imageUploadeada.url,
        });
        if (priceValidate(price)) {
          const newTreatment = await treatment.save();

          if (newTreatment === treatment) {
            res.json({ status: "ok" });
          } else {
            res.json({ status: "No se pudo guardar el tratamiento" });
          }
        } else {
          res.json({ status: "Precio no válido" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};

treatmentsCtrl.getOneService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Treatment.findById(id);
    if (service) {
      res.json({ status: "ok", data: service });
    } else {
      res.json({ status: "No existe el servicio" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status:
        "Ocurrio un error al solicitar un servicio ponte en contacto con tu servicio técnico",
    });
  }
};

module.exports = treatmentsCtrl;
