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

app.get("/signup",(req,res)=>{
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
            res.status(201).render("signup");
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