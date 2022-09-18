const multer = require("multer");

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };



// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });

// let uploadFile = multer({ storage: storage, fileFilter: csvFilter });


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('multer',req,file,cb)
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
  var uploads = multer({ storage: storage })
  
module.exports = uploads;