import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,  //for name = primarykey
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features : [           // this is a list 
      {
        type : String,
        
      }
    ],
    image : {
      type : String, //save as a link
    }
  }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;