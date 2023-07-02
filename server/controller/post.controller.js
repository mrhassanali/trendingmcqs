const {
  addNewPost,
  allPosts,
  getonePostData,
  deleteCompletePost,
  getPostsForHome,
  updatePost,
} = require("../services/post.services");

module.exports = {
  NewPost: async (req, res) => {
    const body = req.body;
    body.image = req.file ? req.file.filename : undefined;
    addNewPost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      } else {
        return res.status(200).json({
          success: 1,
          data: body,
        });
      }
    });
  },
  getAllPosts: (req, res) => {
    allPosts((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.send(results);
    });
  },
  getAllPostsForHome: (req, res) => {
    getPostsForHome((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.send(results);
    });
  },
  getOnePostusingID: (req, res) => {
    const id = req.params.id;
    getonePostData(id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      // if results is null
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json(results);
    });
  },
  deletePost: (req, res) => {
    const id = req.params.id;
    deleteCompletePost(id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json(error);
      } else {
        return res.json(results);
      }
    });
  },
  EditPost: async (req, res) => {
    const body = req.body;
    // body.image = req.file ?req.file.filename : body.image;

    body.image = req.file
      ? {
          uploaded: true,
          image: req.file.filename,
        }
      : {
          uploaded: false,
          image: body.image,
        };
    // return res.status(200).json({
    //   success: 1,
    //   data: body,
    // });
    updatePost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      } else {
        return res.status(200).json({
          success: 1,
          data: body,
        });
      }
    });
  },
};
