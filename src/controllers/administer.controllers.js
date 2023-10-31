const administerCtrl = {};
const URLSERVER = require("../helpers/constants");
const Administer = require("../models/administer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dm3gntcte",
  api_key: "944791171699979",
  api_secret: "4zaR7n-xm-FfKQ6LhvwpC7uHfuI",
});

administerCtrl.getInfo = async (req, res) => {
    try {
      const administer = await Administer.find().lean();
      res.json(administer);
    } catch (error) {
      console.log(error);
      res.json({ status: "ocurrio un error" });
    }
};
/** 
administerCtrl.addInfo = async (req, res) => {
    //console.log(req.body);
    try{
      jwt.verify(req.token, "secretkey", async (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {
                name,
                email,
                phone,
                facebook,
                instagram,
                nameMainImage,
                nameLogo,
            } = req.body;
            const imageMainUploadeada = await cloudinary.uploader.upload(req.file.path);
            console.log(req.file.path)
            const imageLogoUploadeada = await cloudinary.uploader.upload(req.file.path);
            const administer = new Administer({
                name,
                email,
                phone,
                facebook,
                instagram,
                mainImage: imageMainUploadeada.url,
                logo: imageLogoUploadeada.url,
            });
            await administer.save();
            res.json({ status: "ok" });
        }
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "hubo un error" });
    }
};
**/
administerCtrl.editInfoWhitMainImage = async (req, res) => {
    //console.log(req.body);
    try{
      //jwt.verify(req.token, "secretkey", async (err, data) => {
        //if (err) {
        //  res.sendStatus(403);
        //} else {
            const {
                name,
                email,
                phone,
                facebook,
                instagram,
                color,
                colorLetter,
                nameMainImage,
            } = req.body;
            let administer = {
              name,
              email,
              phone,
              facebook,
              instagram,
              color,
              colorLetter,
            };
            let imageMainUploadeada = null;
            try{
              imageMainUploadeada = await cloudinary.uploader.upload(req.file.path);
              console.log(imageMainUploadeada)
            }catch(err){

            }
            
            if (imageMainUploadeada) {
              administer = { ...administer, mainImage: imageMainUploadeada.url };
            }
            console.log(administer)
            await Administer.findByIdAndUpdate(req.params.id, administer);
            res.json({ status: "ok" });
        //}
      //});
    } catch (error) {
      console.log(error);
      res.json({ status: "hubo un error" });
    }
};
administerCtrl.editLogo = async (req, res) => {
    //console.log(req.body);
    try{
      jwt.verify(req.token, "secretkey", async (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {
                nameLogo,
            } = req.body;
            let imageLogoUploadeada = null;
            try{
              imageLogoUploadeada = await cloudinary.uploader.upload(req.file.path);
            }catch(err){

            }
            
            if(imageLogoUploadeada){
              await Administer.findByIdAndUpdate(req.params.id, {logo: imageLogoUploadeada.url});
              
            }
            res.json({ status: "ok" });
        }
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "hubo un error" });
    }
};


/** 
administerCtrl.addInfo = async (req, res) => {
    //console.log(req.body);
    try{
            const {
                name,
                email,
                phone,
                facebook,
                instagram,
                nameMainImage,
                nameLogo,
            } = req.body;
            const imageMainUploadeada = await cloudinary.uploader.upload(req.file.path[0]);
            console.log(req.file.path[0])
            const imageLogoUploadeada = await cloudinary.uploader.upload(req.file.path[1]);
            const administer = new Administer({
                name,
                email,
                phone,
                facebook,
                instagram,
                mainImage: imageMainUploadeada.url,
                logo: imageLogoUploadeada.url,
            });
            await administer.save();
            res.json({ status: "ok" });

    } catch (error) {
      console.log(error);
      res.json({ status: "hubo un error" });
    }
};
**/
module.exports = administerCtrl;