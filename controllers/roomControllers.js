import Room from "../models/room.js";
import {isAdminValid} from "./userControllers.js"  //import function isAdminValid

export function createRoom(req,res){

  if(!isAdminValid(req)){    
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }

  const newRoom = new Room(req.body)

  newRoom.save().then(
    (result)=>{
      res.json(
        {
          message : "Room created successfully",
          result : result
        }
      )
    }
  ).catch(
    (err)=>{
      res.json(
        {
          message : "Room creation failed",
          error : err
        }
      )
    }
  )
}

//delete room
export function deleteRoom(req,res){

  if(!isAdminValid(req)){
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }

  const roomId = req.params.roomId
  
  Room.findOneAndDelete({roomId:roomId}).then(
    ()=>{
      res.json(
        {
          message : "Room deleted successfully"
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Room deletion failed"
        }
      )
    }
  )
}

export function findRoomById(req,res){    //for looking rooms one by one (its break,good,special description)
                                          //anyone can be able to search this. so no isAdminValue
  const roomId = req.params.roomId

  Room.findOne({roomId:roomId}).then(    //if someone searched a not existing room (like hotel has 10 rooms he search 11th)
    (result)=>{

      if(result == null){
        res.status(404).json({
          message : "Room not found"
        })
        return
      }else{
        res.json(
          {
            message : "Room found",
            result : result
          }
        )
      }
    }
  ).catch(      //if any issueu happens like loading,DB connection
    (err)=>{
      res.json(
        {
          message : "Room search failed",
          error : err
        }
      )
    }
  )
}

export function getRooms(req,res){        // view all room list
  Room.find().then(
    (result)=>{
      res.json(
        {
          rooms : result
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Failed to get rooms"
        }
      )
    }
  )
}

export function updateRoom(req,res){

  if(!isAdminValid(req)){
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }

  const roomId = req.params.roomId     // id comes as a parameter not in req body

  Room.findOneAndUpdate({roomId:roomId},req.body/*req body wich brings changes*/).then(
    ()=>{
      res.json(
        {
          message : "Room updated successfully"
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Room update failed"
        })
    }
  )
}
export function getRoomsByCategory(req,res){   //get rooms category wise
  const category = req.params.category
  Room.find({category:category}).then(
    (result)=>{
      res.json(
        {
          rooms : result
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Failed to get rooms"
        }
      )
    }
  )
}