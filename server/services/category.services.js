const pool = require("../database/config");

// Add New Category 
const addNewCategory = (data,callback)=>{
const{categoryName,categorySlug}= data;
let dbQuery = "INSERT INTO categories(category_name,category_slug) values(?,?)"
  pool.query(dbQuery,[categoryName,categorySlug]),
    (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
    }
} 
// Get All Add Category
const allCategory = (callback) => {
    pool.query("SELECT * FROM categories", [], (error, results, fields) => {
      if (error) {
        callback(error); 
      }
      return callback(null, results);
    });
}
// Update Category
const updateCategoryData = (data,callback)=>{
  const{categoryID,categoryName,categorySlug}= data;
  let today = new Date().toISOString();
  console.log(today);
  let dbQuery = "UPDATE categories set category_name=?,category_slug=?,updated=? where category_id=?"
    pool.query(dbQuery,[categoryName,categorySlug,today,categoryID],
      (error, results, fields) => {
          if (error) {
            callback(error);
          }
          return callback(null, results);
      }
      )
  } 
//Delete Category
  const deleteCategoryData = (id,callback)=>{
    let dbQuery = "delete from categories where category_id=?"
      pool.query(dbQuery,[id]),
        (error, results, fields) => {
            if (error) {
              callback(error); 
            }
            return callback(null, results);
        }
    } 

 
    //Delete Category
  const relatedCategoryData = (id,callback)=>{

    try {
      let dbQuery = "SELECT posts.id, posts.title, posts.keyword, posts.description, posts.slug, posts.published, posts.updated, posts.status, posts.content, posts.image, posts.authorID, categories.category_id, categories.category_name, categories.category_slug, users.displayName, users.userName, users.userImage \
      FROM posts \
      JOIN categories ON posts.category_id = categories.category_id \
      JOIN users ON posts.authorID = users.userID\
      WHERE categories.category_slug=? && posts.status='Published'";
      pool.query(dbQuery,[id],
        (error, results, fields) => {
          if (error) {
            callback(error);
          }
          else{
            const formattedResults = results.map((result) => {
              return {
                id: result.id,
                title: result.title,
                keyword: result.keyword,
                description: result.description,
                slug: result.slug,
                published: result.published,
                updated: result.updated,
                status: result.status,
                content: result.content,
                image: result.image,
                category: {
                  category_id: result.category_id,
                  category_name: result.category_name,
                  category_slug: result.category_slug,
                },
                author: {
                  authorID: result.authorID,
                  name: result.displayName,
                  username: result.userName,
                  image: result.userImage,
                }
              };
            });
          return callback(null,formattedResults);
          }
        }
      )
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }


    // let dbQuery = "SELECT * FROM categories, posts WHERE categories.category_id = posts.category_id AND categories.category_slug=?";
    // pool.query(dbQuery,[id],
    //   //callback function
    //   (error, results, fields) => {
    //     if (error) {
    //       callback(error);
    //     }
    //     return callback(null,results);
    //   }
    // );
  } 

module.exports = {addNewCategory,allCategory,updateCategoryData,deleteCategoryData,
  relatedCategoryData};

