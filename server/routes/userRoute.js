const express=require('express');
const {create,getAllUsers,getUserById,userUpdate, deleteUser}=require("../controller/userController");
const multer=require("multer")
const path=require("path");
const route=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const fileExt=path.extname(file.originalname);
        const fileName=file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("_")+"_"+Date.now();
        cb(null,fileName+fileExt)
    }
  })
  const upload = multer({ storage: storage })

route.post('/user',upload.single('myFile'), create);
route.get('/users',getAllUsers);
route.get('/user/:id',getUserById);
route.put('/update/user/:id',userUpdate);
route.delete('/delete/user/:id',deleteUser);

module.exports=route;