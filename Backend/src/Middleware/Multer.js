import multer from "multer"
let upload;
try {
  const storage =  multer.diskStorage({
      destination:  function (req, file, cb) {
         cb(null, "public/uploadImage")
      },
      filename: function (req, file, cb) {
      //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //   cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname)
      }
    })
    upload = multer({ storage });
} catch (error) {
  console.log("Multer error",error)
  
}

// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";


// const storage=multer.diskStorage({
//    destination:function(req,file,cb){
//        cb(null,"../../public/temp")
//    },
//    filename:function(req,file,cb){
//        const uniqueFilename=uuidv4();
//        cb(null,uniqueFilename+path.extname(file.originalname));
//    }
// });
// const upload=multer({storage:storage});
// module.exports=upload;

export {upload}