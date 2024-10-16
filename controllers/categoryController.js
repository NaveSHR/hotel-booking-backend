import Category from "../models/category.js";  //.js for module type project


// Function to create a new category (Only admin can create)
export function createCategory(req, res) {
  const user = req.user;

  // Check if the user is logged in
  if (req.user == null) {
    res.status(403).json({
      message: "Please login to create a category",
    });
    return;
  }

  // Check if the user is an admin
  if (req.user.type !== "admin") {
    res.status(403).json({
      message: "You are not authorized to create a category",
    });
    return;
  }

  // Extract category details from the request body
 // const category = req.body.category;

  // Create and save the new category
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then((result/*any name (saved obj)*/) => {
      res.json({
        message: "Category created successfully",
        result : result //by giving a funtion name shows the result
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Category creation failed",
        error: err.message,
      });
    });
}
//delete category

export function deleteCategory(req,res){

  if (req.user == null) {
    res.status(403).json({
      message: "Please login to create a category",
    });
    return;
  }

  // Check if the user is an admin
  if (req.user.type !== "admin") {
    res.status(403).json({
      message: "You are not authorized to create a category",
    });
    return;
  }
  const name/*(any name2)*/ = req.params.name;     //req.params = http req end variable,.name(any name1),
                                    //req.params.name = take the name variable from http req end

  Category.deleteOne({name : name/*(any name2)*/}).then(()=>{
    res.json({
      message : "category deleted"
    })
  }).catch(

    ()=>{
      res.status(500).json({
        message : "Failed to delete category"
      })
    }
  )
}




// Function to get all categories (Anyone can view categories)
export function getCategories(req, res) {
  Category.find()
    .then((list) => {
      res.json({
        list: list,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve categories",
        error: err.message,
      });
    });
}
