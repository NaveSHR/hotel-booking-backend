import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryByName } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// POST route to create a new category (admin only)
categoryRouter.post("/", createCategory);



//categoryRouter.delete("/:name",(req,res)=>{   //http req end has a variableName= name(any name1) ,colan = shows variable will come
  //  const name/*(any name2)*/ = req.params.name;     //req.params = http req end variable, .name(any name1),
                                                    //req.params.name = take the name variable from http req end
    
   // res.json(
        //{
          //  message : "category deleted"
        //}
    //)
    
 
//})
categoryRouter.delete("/:name",deleteCategory); // delete by data set ID

// GET route to fetch all categories (public)
categoryRouter.get("/", getCategories);

categoryRouter.get("/:name",getCategoryByName);

export default categoryRouter;
