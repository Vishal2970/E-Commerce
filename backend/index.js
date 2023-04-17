const express = require('express');
require('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt=require('jsonwebtoken');
const jwtKey='e-com';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();          ///hiding password 
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
            resp.send({result:"Something went wrong, please try again later"});
        }
        resp.send({user,auth:token});
    })
})
app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let result = await User.findOne(req.body).select('-password');
        if (result) {
            Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
                if(err){
                    resp.send({result:"Something went wrong, please try again later"});
                }
                resp.send({result,auth:token});
            })
        }
        else {
            resp.send({ result: "No user found" });
        }
    }
    else {
        resp.send({ result: "No user found" });
    }
})
app.post('/add-product',verifytoken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})
app.get('/products', verifytoken,async (req, resp) => {
    let result = await Product.find();
    if (result.length > 0) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No products found" });
    }
})
app.delete('/product/:id', verifytoken,async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})
app.get('/product/:id', verifytoken,async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found." })
    }
})
app.put('/product/:id', verifytoken,async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
})
app.get('/search/:key', verifytoken, async (req, resp) => {
    let result = await Product.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    resp.send(result);
})

function verifytoken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];                                        /// token was => bearer {token} ,  why bearer with token? generally it is used, not requirement.
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"please provide valid token"});
            }
            else{
                next();
            }
        })
    }
    else{
        resp.send({result:'please add token with header'});
    }
}

app.listen(5000);
