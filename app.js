//jshint esversion:6
import express  from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose,{Schema, mongo} from "mongoose";
import encrypt from "mongoose-encryption";
import 'dotenv/config';
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://0.0.0.0:27017/userDB");
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});
var secret =process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret,encryptedFields: ['password']  });
const user=mongoose.model("User",userSchema);
app.get("/",(req,res)=>{
    res.render("home");
})


app.get("/register",(req,res)=>{
    res.render("register");
});


app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register",async(req,res)=>{
    const username1=req.body.username;
    const password1=req.body.password;
    const newUser=new user({
        email:username1,
        password:password1
    });
    newUser.save();
    res.render("secrets");
});

app.post("/login",async(req,res)=>{
    const email1=req.body.username;
    const x=await user.find({email:email1});
    if(x[0].password===req.body.password)
    {
        res.render("secrets");
    }
})
app.listen(3000);