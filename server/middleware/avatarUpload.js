const multer=require('multer');
const path=require('path');

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
  const upload = multer({ storage: storage });
module.exports=upload;
