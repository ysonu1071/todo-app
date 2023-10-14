const mongoose = require("mongoose");
// mongoose.connect(process.env["DB_URI"])

mongoose.connect("mongodb://0.0.0.0:27017/todos")
.then(()=> console.log("DB connected"))
.catch((error)=>{
    console.log(error.message)
})