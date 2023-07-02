const multer = require('multer');
const path = require('path');

function fileFilter (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const absolutePath = path.join(__dirname, 'uploads', 'images');
    cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});
const upload = multer({ storage: storage,fileFilter:fileFilter })
module.exports = { upload};
