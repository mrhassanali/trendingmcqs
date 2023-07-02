const router = require("express").Router();
const {usersController,postsController,categoryController,settingController
} = require("../controller/index");
const {upload} = require('../controller/uploadImage');
const {checkToken} = require("../auth/token_validation");

router.post("/setting",checkToken, settingController.addNewNavbarItem);
router.get("/setting",settingController.getsettingAllItem);



// router.get("/users",usersController.getAllUserData);
// router.get("/users/:id",checkToken, usersController.getUserDatabyID);
// router.post("/users",checkToken, upload.single('author'),usersController.addNewUserData);
// router.patch("/users/:id",checkToken, upload.single('author'), usersController.updateUserbyID);


router.post('/posts',checkToken, upload.single('image'),postsController.NewPost);
router.put('/posts',checkToken, upload.single('image'),postsController.EditPost);
router.get('/posts',postsController.getAllPosts);
router.get('/home-posts',postsController.getAllPostsForHome);
router.get('/posts/:id',postsController.getOnePostusingID);
router.delete('/posts/:id',checkToken, postsController.deletePost);

router.get("/category",categoryController.getAllCategory);
router.post("/category",checkToken, categoryController.NewCategory);
router.put("/category/:id",checkToken, categoryController.updateCategory);
router.delete("/category/:id",checkToken, categoryController.deleteCategory);
router.get("/category/:slug",categoryController.categorySlug);

router.post("/login",usersController.loginUser);

module.exports = router;