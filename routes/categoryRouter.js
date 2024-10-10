import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

// POST route to create a new category (admin only)
router.post("/categories", createCategory);

// GET route to fetch all categories (public)
router.get("/categories", getCategories);

export default router;
