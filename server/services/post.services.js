const pool = require("../database/config");
const fs = require("fs");
// Add New Posts
const addNewPost = (data, callback) => {
  const {
    title,
    keyword,
    description,
    slug,
    status,
    content,
    image,
    category_id,
    authorID,
  } = data;
  let NewPostQuery =
    "INSERT INTO posts(title, keyword, description, slug, status, content, image, category_id, authorID) values(?,?,?,?,?,?,?,?,?)";

  pool.query(
    NewPostQuery,
    [
      title,
      keyword,
      description,
      slug,
      status,
      content,
      image,
      category_id,
      authorID,
    ],
    (error, results, fields) => {
      if (error) {
        callback(error);
      } else {
        return callback(null, results);
      }
    }
  );
};
// Get All Add Posts
const allPosts = (callback) => {
  let sqlQuery =
    "SELECT posts.id,posts.title,posts.keyword,posts.description,posts.slug,posts.published,posts.updated,posts.status,posts.content,posts.image,posts.authorID,users.displayName,users.userName,users.userImage,categories.category_id,categories.category_name,categories.category_slug FROM posts JOIN categories ON posts.category_id = categories.category_id JOIN users ON posts.authorID = users.userID";
  try {
    pool.query(sqlQuery, [], (error, results, fields) => {
      if (error) {
        callback(error);
      } else {
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
            // content: result.content,
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
            },
          };
        });
        formattedResults.sort(
          (a, b) => new Date(b.published) - new Date(a.published)
        );
        return callback(null, formattedResults);
        // res.status(200).json(formattedResults);
      }
    });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }

  // pool.query("SELECT * FROM posts", [], (error, results, fields) => {
  //   if (error) {
  //     callback(error);
  //   }
  //   return callback(null, results);
  // });
};

const getonePostData = (id, callBack) => {
  pool.query(
    "SELECT * FROM posts WHERE slug = ?",
    [id],
    //callback function
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
};

const deleteCompletePost = (id, callBack) => {
  pool.query(
    "select * from posts WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      const image = results[0].image;
      fs.unlink(`uploads/images/${image}`, (error) => {
        if (error && error.code !== "ENOENT") {
          // ignore file not found error
          callBack(error);
        }
        pool.query(
          "delete from posts WHERE id = ?",
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      });
    }
  );
};

const getPostsForHome = (callback) => {
  let sqlQuery =
    "SELECT posts.id,posts.title,posts.keyword,posts.description,posts.slug,posts.published,posts.updated,posts.status,posts.image,posts.authorID,users.displayName,users.userName,users.userImage,categories.category_id,categories.category_name,categories.category_slug FROM posts JOIN categories ON posts.category_id = categories.category_id JOIN users ON posts.authorID = users.userID where posts.status = 'Published'";
  try {
    pool.query(sqlQuery, [], (error, results, fields) => {
      if (error) {
        callback(error);
      } else {
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
            },
          };
        });
        formattedResults.sort(
          (a, b) => new Date(b.published) - new Date(a.published)
        );
        return callback(null, formattedResults);
      }
    });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
};

const updatePost = (data, callBack) => {
  if (data.image.uploaded) {
    pool.query(
      "select image from posts WHERE id = ?",
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        const image = results[0].image;
        fs.unlink(`uploads/images/${image}`, (error) => {
          if (error && error.code !== "ENOENT") {
            callBack(error);
          }
          pool.query(
            "update posts set title=?, keyword=?, description=?, slug=?, status=?, content=?, image=?, category_id=?, authorID=? WHERE id=?",
            [
              data.title,
              data.keyword,
              data.description,
              data.slug,
              // data.published,
              // data.updated,
              data.status,
              data.content,
              data.image.image,
              data.category_id,
              data.authorID,
              data.id,
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
          );
        });
      }
    );
  } else {
    pool.query(
      "update posts set title=?, keyword=?, description=?, slug=?, status=?, content=?, category_id=?, authorID=? WHERE id=?",
      [
        data.title,
        data.keyword,
        data.description,
        data.slug,
        // data.published,
        // data.updated,
        data.status,
        data.content,
        data.category_id,
        data.authorID,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};

module.exports = {
  addNewPost,
  allPosts,
  getonePostData,
  deleteCompletePost,
  getPostsForHome,
  updatePost,
};
