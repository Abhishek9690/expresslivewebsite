const mongoose =require("mongoose");
const customerSchema=new mongoose.Schema({
    username:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        reqired:true,
        unique:true,
    },
    password:{
        type:String,
        reqired:true
    },
    
})

//now we need to create a collection

const Register=new mongoose.model("Register",customerSchema);

module.exports = Register;