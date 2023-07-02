const {getUsers,addUsers,updateUser,getUserDataID,
login} = require("../services/users.services")
const {upload} = require("./uploadImage");
const {sign} = require("jsonwebtoken");

var CryptoJS = require("crypto-js");

module.exports ={
  // addNewUserData:(req,res)=>{
  //   const body = req.body;
  //   body.userImage = req.file.filename;
  //   addUsers(body, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       success: 0,
  //       message: "Database connection errror",
  //     });
  //   }
  //   else{
  //     return res.status(200).json({
  //       success: 1,
  //       data: results
  //     });
  //   }
  // });
  // },
  addNewUserData: async (req, res) => {
    const body = req.body;
    body.userImage = req.file ? req.file.filename : undefined;
    addUsers(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });

  },
  updateUserbyID : (req, res) => {
    const body = req.body;
    body.userImage = req.file ? req.file.filename : undefined;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserDatabyID:(req, res) => {
      let id = req.params.id;
      getUserDataID(id,(error, results) => {
        if (error) { 
          console.log(error);
          return;
        }
        return res.send(results);
      });
  },
    getAllUserData:(req, res) => {
        getUsers((error, results) => {
          if (error) { 
            console.log(error);
            return;
          }
          return res.send(results);
        });
    },
    getUserDatabyID:(req, res) => {
      let id = req.params.id;
      getUserDataID(id,(error, results) => {
        if (error) { 
          console.log(error);
          return;
        }
        return res.send(results);
      });
  },
  loginUser:(req,res)=>{
    const data = req.body;
    login(data,(error, results) => {
      if (error) { 
        console.log(error);
        return;
      }
      // const result = comparseSync(data.password,results.password);
      var bytes  = CryptoJS.AES.decrypt(results.password, process.env.SECRET_KEY);
      var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);


  if(data.password == decryptedPassword){
      results.password = undefined;
      const jsontoken = sign({result:results},process.env.SECRET_KEY,{
        expiresIn:"1h"
      })
      return res.json({
        success:1,
        message:"login sucessfully",
        token:jsontoken,
      });
  }else{
    return res.json({
      success:0,
      message:"Invalid email & Password",
    });
  }
      
    });
  }
} 