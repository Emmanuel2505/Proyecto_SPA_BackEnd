const productsCtrl = {};
const URLSERVER = require("../helpers/constants");
const Product = require("../models/product");
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const cart = require("../models/cart");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dm3gntcte",
  api_key: "944791171699979",
  api_secret: "4zaR7n-xm-FfKQ6LhvwpC7uHfuI",
});

productsCtrl.allProducts = async (req, res) => {
  try {
    const products = await Product.find({ state: true }).lean();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};

productsCtrl.getName = async (req, res) => {
  try {
    const product = await Product.find({
      name: req.params.name,
      state: true,
    }).exec();
    //console.log("product->", product);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};

productsCtrl.getProductId = async (req, res) => {
  try {
    const product = await Product.find({
      _id: req.params.id,
      state: true,
    }).exec();
    //console.log("product->", product);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};

productsCtrl.addProduct = async (req, res) => {
  //console.log(req.body);
  try{
    jwt.verify(req.token, "secretkey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const {
          name,
          price,
          detail,
          benefit,
          howToUse,
          moreInfo,
          stock,
          nameImage,
        } = req.body;
        const state = true;
        const imageUploadeada = await cloudinary.uploader.upload(req.file.path);
        //const day = new Date();
        //const image = `${URLSERVER}storage/imgs/${day.getDate()}-${day.getMonth()}-${nameImage}`;
        if (stock > 0 && stock <= 300) {
          const product = new Product({
            name,
            price,
            detail,
            benefit,
            howToUse,
            moreInfo,
            stock,
            image: imageUploadeada.url,
            state,
          });
          await product.save();
          res.json({ status: "ok" });
        }else{
          res.json({ status: "Stock no valido" });
        }
        
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};


productsCtrl.updateProductWithImage = async (req, res) => {
  try{
    jwt.verify(req.token, "secretkey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          //console.log(req.body);
          const {
            name,
            price,
            detail,
            benefit,
            howToUse,
            moreInfo,
            stock,
            nameImage,
          } = req.body;
          const state = true;
          const imageUploadeada = await cloudinary.uploader.upload(req.file.path);
          //const day = new Date();
          //const image = `${URLSERVER}storage/imgs/${day.getDate()}-${day.getMonth()}-${nameImage}`;
          
          if (stock > 0 && stock <= 300) {
            const product = {
              name,
              price,
              detail,
              benefit,
              howToUse,
              moreInfo,
              stock,
              image: imageUploadeada.url,
              state,
            };

            //console.log(product);

            await Product.findByIdAndUpdate(req.params.id, product);

            res.json({ status: "ok" });
          }else{
            res.json({ status: "Stock no valido" });
          }
        } catch (error) {
          console.log(error);
          res.json({ status: "ocurrio un error" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};

productsCtrl.updateProductWithoutImage = async (req, res) => {
  try{
    jwt.verify(req.token, "secretkey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          //console.log(req)
          const { name, price, detail, benefit, howToUse, moreInfo, stock, image } =
            req.body;
          const state = true;
          
          if (stock > 0 && stock <= 300) {
            const product = {
              name,
              price,
              detail,
              benefit,
              howToUse,
              moreInfo,
              stock,
              image,
              state,
            };
            //console.log(req.params.id);
            //console.log(product);
            await Product.findByIdAndUpdate(req.params.id, product);
  
            res.json({ status: "ok" });
          }else{
            res.json({ status: "Stock no valido" });
          }
        } catch (error) {
          //console.log(error);
          res.json({ status: "ocurrio un error" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
};

productsCtrl.deleteState = async (req, res) => {
  try{
    jwt.verify(req.token, "secretkey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          //console.log(req)

          //console.log(req.params.id);
          await Product.findByIdAndUpdate(req.params.id, { state: false });
          const cart = await Cart.find({product: req.params.id});
          for (let i = 0; i < cart.length; i++) {
            //console.log(cart[i]);
            await Cart.findByIdAndRemove(cart[i]._id);
            
          }

          res.json({ status: "Se eliminó correctamente el producto" });
        } catch (error) {
          console.log(error);
          res.json({ status: "ocurrio un error" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
}

productsCtrl.editQuan = async (req, res) => {
  try{
    const {stock} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {'stock': stock});
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
}


/*
productsCtrl.deleteProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    await Product.findByIdAndRemove(req.params.id);
    res.json({ status: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};

productsCtrl.state = async (req, res) => {
  try {
    //console.log(req)
    
    //console.log(req.params.id);
    await Product.findByIdAndUpdate(req.params.id, {state: true});
     
    res.json({ status: "Se rescató correctamente el producto" });
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
}


productsCtrl.all = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error" });
  }
};*/

module.exports = productsCtrl;
