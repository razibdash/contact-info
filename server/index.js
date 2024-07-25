const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const dotenv=require('dotenv');
const route=require('./routes/userRoute');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads",express.static('uploads'))
dotenv.config();

const PORT=process.env.PORT;
const MONGOURL=process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(()=>{
    console.log("BD Connected Successfully");
    app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`); 
    })
    
}).catch((err)=>console.log(err));



app.use('/api',route);