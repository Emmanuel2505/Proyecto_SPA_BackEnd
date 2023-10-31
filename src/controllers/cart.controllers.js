const cartCtrl = {};
const Cart = require("../models/cart");
const User = require("../models/users");
const URLSERVER = "http://localhost:3001/";
const jwt = require("jsonwebtoken");
// const URLSERVER = "https://spa-flor-maria.herokuapp.com/";

cartCtrl.allCart = async (req, res) => {
    try {
        const cart = await Cart.find().lean();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.json({ status: "ocurrio un error" });
    }
}

cartCtrl.getCart = async (req, res) => {
    try{
        jwt.verify(req.token, "secretkey", async (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const userTmp = await User.find({email: data.user.email});
                var user = String(userTmp[0]._id);
                const cart = await Cart.find({user: user, stateSale: false}).exec();
                res.json(cart);
            }
        });
    }catch(err){
        console.log(err);
        res.json({ status: "ocurrio un error" });
    }
}

cartCtrl.addCart = async (req, res) => {
    console.log('hola');
    try{
        jwt.verify(req.token, "secretkey", async (err, data) => {
            if (err) {
              res.sendStatus(403);
            } else {
            const userTmp = await User.find({email: data.user.email});
            var user = String(userTmp[0]._id);
            const {
                product,
                quantity,
                total,
            } = req.body;
            const stateSale = false;
            const cart = new Cart({
                user,
                product,
                quantity,
                total,
                stateSale,
            });
            await cart.save();
              res.json({
                status: "ok",
                data,
              });
            }
        });

    }catch(err){
        console.log(err);
        res.json({ status: "ocurrio un error" });
    }
}


cartCtrl.deleteCart = async (req, res) => {
    try {
        jwt.verify(req.token, "secretkey", async (err, data) => {
            if (err) {
              res.sendStatus(403);
            } else {
                console.log(req.params.id);
                await Cart.findByIdAndRemove(req.params.id);
                Cart.remo
                res.json({ status: "ok" });
            }
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "ocurrio un error" });
      }
}

cartCtrl.editQuanTotal = async (req, res) => {
    try{
        jwt.verify(req.token, "secretkey", async (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const {newQuan} = req.body;
                //console.log("****************************",newQuan,'------',newQuan.length)
                for(let i = 0; i < newQuan.length; i++){
                    await Cart.findByIdAndUpdate(newQuan[i].id, {'quantity': newQuan[i].quantity, 'total': newQuan[i].total});
                }
                
                res.json({ status: "ok" });
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ status: "ocurrio un error" });
    }
}

cartCtrl.buyCart = async (req, res) => {
    try{
        jwt.verify(req.token, "secretkey", async (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const {listCart} = req.body;
                //console.log("****************************",listCart,'------',listCart.length)
                for (let i = 0; i < listCart.length; i++){
                    //console.log("****************************",listCart[i]._id)
                    await Cart.findByIdAndUpdate(listCart[i]._id, {'stateSale': true});
                }
                res.json({ status: "ok" });
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ status: "ocurrio un error" });
    }
}

module.exports = cartCtrl;