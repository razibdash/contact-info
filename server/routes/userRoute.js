const express=require('express');
const {create,getAllUsers,getUserById,userUpdate, deleteUser}=require("../controller/userController");
const upload=require('../middleware/avatarUpload')
const route=express.Router();



route.post('/user',upload.single('myFile'), create);
route.get('/users',getAllUsers);
route.get('/user/:id',getUserById);
route.put('/update/user/:id',userUpdate);
route.delete('/delete/user/:id',deleteUser);

module.exports=route;