require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const userRouter = require("./routes");

const { upload } = require("./controller/uploadImage");

const cors = require("cors");
app.use(cors());
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Use the userRouter middleware
app.use("/api/", userRouter);
// Serve static files from the 'uploads' directory
app.use('/image', express.static(path.join(__dirname, 'uploads','images')));



// handle single file upload
app.post('/upload', upload.single('image'), (req, res) => {
  // console.log(req.file);  // for showing all details about file
  res.json({
    mimetype:req.file.mimetype,
    filename:req.file.filename,
    size:req.file.size,
  });
}, (error, req, res, next) => {
  console.log(error);
  res.status(400).send({ error: error.message });
});



// Start the server
app.listen(process.env.APP_PORT, () => {
  console.log(
    `App is Running on port : http://localhost:${process.env.APP_PORT} \nAPi is Available on : http://localhost:${process.env.APP_PORT}/api/users`
  );
});   
