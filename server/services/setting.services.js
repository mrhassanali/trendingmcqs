const pool = require("../database/config");
// Add Item in Navbar
const addNavbarItem = (data, callback) => {
  const {nav_order,name,navbar_slug} = data;
  pool.query(
    "INSERT INTO navbar(nav_order,name,navbar_slug) values(?,?,?)",
    [nav_order,name,navbar_slug],
    (error, results, fields) => {
      if (error) {
        callback(error);
      } else {
        return callback(null, results);
      }
    }
  );
};

const getNavbarItem = (callback) => {
    pool.query(
      "SELECT * FROM setting",[],
      (error, results, fields) => {
        if (error) {
          callback(error);
        } else {
          let title = results.filter((item) => item.name == "title");
          let description = results.filter((item) => item.name == "description");
          let keywords = results.filter((item) => item.name == "keywords");
          let googleSiteVerification = results.filter((item) => item.name == "google-site-verification");
          let navigation = results.filter((item) => item.name == "navigation");
          return callback(null, {
            title:title[0].value,
            meta:{
              description:description[0].value,
              keywords:keywords[0].value,
              "google-site-verification":googleSiteVerification[0].value,
            },
            navigation:navigation[0].value
          });
        }
      }
    );
  }; 

  module.exports = {addNavbarItem,getNavbarItem}