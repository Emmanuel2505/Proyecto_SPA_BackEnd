const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/client/build/storage/imgs");
  },
  filename: function (req, file, cb) {
    // console.log(file, req, req.body);
    try {
      const day = new Date();
      let name = `${day.getDate()}-${day.getMonth()}-${
        file.originalname
      }`.replaceAll(" ", "%");
      cb(null, name);
      req.body.nameImage = file.name;
    } catch (error) {
      console.log(error);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
