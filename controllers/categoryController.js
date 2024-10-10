import Category from "../models/category.js";

// Function to create a new category (Only admin can create)
export function createCategory(req, res) {
  const user = req.user;

  // Check if the user is logged in
  if (user == null) {
    res.status(403).json({
      message: "Please login to create a category",
    });
    return;
  }

  // Check if the user is an admin
  if (user.type !== "admin") {
    res.status(403).json({
      message: "You are not authorized to create a category",
    });
    return;
  }

  // Extract category details from the request body
  const category = req.body.category;

  // Create and save the new category
  const newCategory = new Category(category);
  newCategory
    .save()
    .then(() => {
      res.json({
        message: "Category created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Category creation failed",
        error: err.message,
      });
    });
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
