const User=require('../model/userModel');

const create=async(req,res)=>{
 try {
    const img=req.file.filename;
    const {email,phone,name}=req.body;
    const newUser=new User({email,phone,name,img});
    // const{email}=newUser;
    // const userExist=await User.findOne({email});
    // if(userExist){

    //   return res.status(400).json({message:"User Alredy exists"});

    // }
    const saveData=await newUser.save();
    res.status(200).json(saveData);

 } catch (error) {
    res.status(500).json({
        errorMassage:error.message,
    });
 }
}

const getAllUsers=async(req,res)=>{
   try {
    const userData=await User.find();
    if(!userData || userData.length===0){
       return res.status(404).json({message:"User Data Not Found!"});
    }

    res.status(200).json(userData);

   } catch (error) {
    res.status(500).json({
        errorMassage:error.message,
    });
   }
}

const getUserById=async(req, res)=>{
  try {
    const getId=req.params.id;
    const userData=await User.findById(getId);
    if(!userData){
        return res.status(404).json({message:"User Data Not Found!"});
    }

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({
        errorMassage:error.message,
    });
  }

}

const userUpdate=async(req,res)=>{
    try {
        const img=req.file.filename;
        const {email,phone,name}=req.body;
        const getId=req.params.id;    
        const userData=await User.findById({_id:getId});
        if(!userData){
            return res.status(404).json({message:"User Data Not Found!"});
        }
       const updateData= await User.findByIdAndUpdate(getId,{email,phone,img,name}) 
        res.status(200).json(updateData);
    } catch (error) {
        res.status(500).json({
            errorMassage:error.message,
        });
    }
}

const deleteUser=async(req,res)=>{
    try {
        const getId=req.params.id;
        const userData=await User.findById(getId);
        if(!userData){
            return res.status(404).json({message:"User Data Not Found!"});
        }
        const deleteUser=await User.findByIdAndDelete(getId);
        res.status(200).json({message:"User Deleted Succesfully!"});
    } catch (error) {
        res.status(500).json({
            errorMassage:error.message,
        });
    }
}
module.exports={
    create,
    getAllUsers,
    getUserById,
    userUpdate,
    deleteUser
};