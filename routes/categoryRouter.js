import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// POST route to create a new category (admin only)
categoryRouter.post("/", createCategory);

// GET route to fetch all categories (public)
categoryRouter.get("/", getCategories);

export default categoryRouter;
