const usersCtrl = {};
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {
  emailValidate,
  passwordValidate,
  phoneValidate,
  dniValidate,
} = require("../helpers/functions");
const { json } = require("body-parser");

usersCtrl.testToken = (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          status: "ok",
          data,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};

usersCtrl.testTokenAdmin = (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          status: "ok",
          data,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};

usersCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userDB = await User.findOne({ email }).lean();
    if (userDB !== null) {
      let user = {
        fullname: `${userDB.names} ${userDB.surnames}`,
        rol: userDB.rol,
        email: userDB.email,
      };

      jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
        if (err) {
          res,
            json({
              status: "Hubo un error al asignar el token",
            });
        } else {
          user = { ...user, token, status: "ok" };
          res.json(user);
        }
      });
    } else {
      res.json({ status: "credenciales no válidas" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: `Backend Error -> ${error}` });
  }
};

usersCtrl.newUser = async (req, res) => {
  let status = "ok";
  try {
    const {
      names,
      surnames,
      dni,
      phone,
      birth,
      email,
      password,
      passwordRepeat,
    } = req.body;
    console.log(req.body, names);
    if (
      names &&
      surnames &&
      dni &&
      phone &&
      birth &&
      email &&
      password &&
      passwordRepeat
    ) {
      const rol = "client";
      const user = new User({
        names,
        surnames,
        dni,
        phone,
        birth,
        email,
        password,
        rol,
      });
      try {
        if (password === passwordRepeat) {
          if (emailValidate(email)) {
            if (passwordValidate(password)) {
              if (phoneValidate(phone)) {
                if (dniValidate(dni)) {
                  await user.save();
                } else {
                  status = "Cédula no válida";
                }
              } else {
                status =
                  " Número de celular no válido, el formato válido es +593XXXXXXXX o 09XXXXXX";
              }
            } else {
              status =
                "Contraseña no válida, la contraseña debe contener almenos una mayúscula, una minuscula , un número y debe tener entre 8 y 16 caracteres.";
            }
          } else {
            status = "Email no válido";
          }
        } else {
          status = "Las Contraseñas no coinciden";
        }
      } catch (error) {
        console.log(error);
        status = "El usuario ya está registrado";
      }
    } else {
      status = "Faltan datos";
    }
    res.json({ status });
  } catch (error) {
    console.log(error);
    if (status === "ok") {
      status = "Hubo un error al registrar ususario";
    }
    res.json({ status });
  }
};

/*usersCtrl.allUser = async (req, res) => {
  try {
    const user = await User.find({state: true}).lean();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};

usersCtrl.deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: "Usuario Eliminado" });
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
}*/

module.exports = usersCtrl;
