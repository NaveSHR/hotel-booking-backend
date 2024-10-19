import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryByName, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// POST route to create a new category (admin only)
categoryRouter.post("/", createCategory);


categoryRouter.delete("/:name",deleteCategory); // delete by data set ID

// GET route to fetch all categories (public)
categoryRouter.get("/", getCategories);


categoryRouter.get("/:name",getCategoryByName);  // id req is the last one  .all other get req are above

categoryRouter.put("/:name",updateCategory)

export default categoryRouter;
