import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId : {      //use roomID becuase DB has ID
    type : Number,
    required : true,
    unique : true
  },

  category : {
    type : String,
    required : true
  },

  maxGuests : {
    type : Number,
    required : true,
    default : 3,
  },
  available : {
    type : Boolean,
    required : true,
    default : true
  },
  photos : [               //array string
    {
      type : String
    }
  ],
  specialDescription : {
    type : String,
    default : ""
  },
  notes : {
    type : String,
    default : ""
  }
  //we can use isActive for hide somethings in the roomschema
})

const Room = mongoose.model("Rooms",roomSchema)

export default Room;