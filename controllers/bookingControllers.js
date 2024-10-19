import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req,res){

  if(!isCustomerValid(req)){
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }
  
  const startingId = 1200;

  Booking.countDocuments({})/*how to find record count in mongoose*/.then(
    (count)=>{
    //  console.log(count);
      const newId = startingId + count/*DB already saved booking count*/ + 1;  //if we want a string INV
      const newBooking = new Booking({
        bookingId : newId,               //auto generate
        roomId : req.body.roomId,       //we hv to put
        email : req.user.email,        //auto gain
        start : req.body.start,         //we have to put
        end : req.body.end              //we hv to put
      }) 
      newBooking.save().then(
        (result)=>{
          res.json(
            {
              message : "Booking created successfully",
              result : result
            }
          )
        }
      ).catch(
        (err)=>{
          res.json(
            {
              message : "Booking creation failed",
              error : err
            }
          )
        }
      )
    }
  ).catch(   //if getting booking count fail
    (err)=>{
      res.json(
        {
          message : "Booking creation failed",
          error : err
        }
      )
    }
  )
  
}