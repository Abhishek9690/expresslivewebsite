const express=require("express");
const app=express();
const path=require("path");
const port =process.env.port || 9000;
require("./db/conn");
const hbs=require("hbs");
const fs=require("fs");

const Register=require("./models/registers");

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");

app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
}) 

app.get("/BOOT",(req,res)=>{
    res.render("BOOT");
})

app.get("/cart",(req,res)=>{
    res.render("cart");
})

app.get("/checkout",(req,res)=>{
    res.render("checkout");
})

app.get("/CHOCOLATE",(req,res)=>{
    res.render("CHOCOLATE");
})

app.get("/CLEAN",(req,res)=>{
    res.render("CLEAN");
})

app.get("/contact-us",(req,res)=>{
    res.render("contact-us");
})
app.get("/daily",(req,res)=>{
    res.render("daily");
})
app.get("/dailyitem",(req,res)=>{
    res.render("dailyitem");
})
app.get("/DAL",(req,res)=>{
    res.render("DAL");
})
app.get("/EATABLE",(req,res)=>{
    res.render("EATABLE");
})
app.get("/elecitem",(req,res)=>{
    res.render("elecitem");
})
app.get("/electronic",(req,res)=>{
    res.render("electronic");
})
app.get("/FOODESS",(req,res)=>{
    res.render("FOODESS");
})
app.get("/gallery",(req,res)=>{
    res.render("gallery");
})
app.get("/HEAD",(req,res)=>{
    res.render("HEAD");
})
app.get("/JACKETS",(req,res)=>{
    res.render("JACKETS");
})
app.get("/JEANS",(req,res)=>{
    res.render("JEANS");
})
app.get("/laptop",(req,res)=>{
    res.render("laptop");
})
app.get("/ledtv",(req,res)=>{
    res.render("ledtv");
})
app.get("/lifeitem",(req,res)=>{
    res.render("lifeitem");
})
app.get("/lifestyle",(req,res)=>{
    res.render("lifestyle");
})
app.get("/mobile",(req,res)=>{
    res.render("mobile");
})
app.get("/my-account",(req,res)=>{
    res.render("my-account");
})
app.get("/REFRI",(req,res)=>{
    res.render("REFRI");
})
app.get("/SHOE",(req,res)=>{
    res.render("SHOE");
})
app.get("/shop-detail",(req,res)=>{
    res.render("shop-detail");
})
app.get("/shop",(req,res)=>{
    res.render("shop");
})
app.get("/ST",(req,res)=>{
    res.render("ST");
})
app.get("/SUIT",(req,res)=>{
    res.render("SUIT");
})
app.get("/VEG",(req,res)=>{
    res.render("VEG");
})
app.get("/WASH",(req,res)=>{
    res.render("WASH");
})
app.get("/wishlist",(req,res)=>{
    res.render("wishlist");
})
app.get("/signup",(req,
    res)=>{
    res.render("signup");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/signupp",async(req,res)=>{
    try{
        const password=req.body.password;
        const confirmPasssword=req.body.confirmPassword;
        if(password==confirmPasssword){
                const registerEmployee=new Register({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
        })
            const registered=await registerEmployee.save();
            res.status(201).redirect("login");
        }
        else{
            res.send("passwords are not matching");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

//login check   
app.post("/loginn",async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        const useremail=await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid login details");
        }
    }
    catch(err){
        console.log("Invalid login details"); 
        res.status(400).send(err);
    }
})


app.listen(port,()=>{
    console.log(`connection is successful at port no ${port}`)
})