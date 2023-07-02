const {addNewCategory,allCategory,updateCategoryData,deleteCategoryData,
  relatedCategoryData} = require("../services/category.services");

module.exports ={
  NewCategory:  (req, res) => { 
    const body = req.body;
     addNewCategory(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: body,
      });
    });
  },
  getAllCategory:(req, res) => {
    allCategory((error, results) => {
      if (error) { 
        console.log(error);
        return;
      }
      return res.send(results);
    });
  },
  updateCategory:(req, res) => { 
    const body = req.body;
    updateCategoryData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }else{
        return res.status(200).json({
          success: 1,
          data: body,
        });
      }
      
    });
  },
  deleteCategory:(req, res) => { 
    const id = req.params.id;
    deleteCategoryData(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: body,
      });
    });
  },
  categorySlug:(req, res) => {
    const slug = req.params.slug;
    relatedCategoryData(slug, (error, results) => {
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
      // return res.json(slug);
    });
  }

} 