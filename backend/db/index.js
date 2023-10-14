const mongoose = require("mongoose");

// mongoose.connect("mongodb://0.0.0.0:27017/todos")
mongoose.connect("mongodb+srv://quora-clone:root@cluster0.itbsa47.mongodb.net/todos")
.then(()=> console.log("DB connected"))
.catch((error)=>{
    console.log(error.message)
})