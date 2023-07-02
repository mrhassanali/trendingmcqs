const pool = require("../database/config"); 

module.exports={
  getUsers:(callback) => {
    pool.query("SELECT * FROM users", [], (error, results, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, results);
    });
  },
  addUsers:(data,callback)=>{
    const{userName,emailAddress,password,role,userImage,displayName,accountStatus} = data;
    pool.query("INSERT INTO users(userName,emailAddress,password,role,userImage,displayName,accountStatus) values(?,?,?,?,?,?,?)",
    [userName,emailAddress,password,role,userImage,displayName,accountStatus]),
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
  },
  updateUser:(data, callback) => {
    const{userName,emailAddress,password,role,userImage,displayName,accountStatus,userID} = data;
    pool.query(
      "UPDATE users SET userName=?,emailAddress=?,password=?,role=?,userImage=?,displayName=?,accountStatus=? WHERE userID=?",
      [userName,emailAddress,password,role,userImage,displayName,accountStatus,userID],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserDataID:(id,callback) => {
    pool.query("SELECT * FROM users where userID=?", [id], (error, results, fields) => {
      if (error) {
        callback(error);
      } 
      return callback(null, results);
    });
  },
  login:(data,callback)=>{
    const emailAddress = data.emailAddress;
    pool.query("SELECT * FROM users where emailAddress=?", [emailAddress], (error, results, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, results[0]);
    });
  }
} 
