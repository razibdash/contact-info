const multer=require('multer');
const path=require('path');

const UPLOAD_LOCATOIN='./uploads/';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,UPLOAD_LOCATOIN) 
    },
    filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname);
        const fileName=file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("_")+"_"+Date.now();
        console.log(fileName);
        cb(null,fileName+fileExt)

    }
})
var upload=multer({
    storage:storage,
    limits:{
        fileSize:1000000,
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/png' || file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
            cb(null,true);
        }else{
            cb(null,false);
        }
    }
});

module.exports=upload;
