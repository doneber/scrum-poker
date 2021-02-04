import express from 'express'
var router = express.Router();
const db = require('../db.json')

function findIndexById(id:any): number {
  for (let index = 0; index < db.rooms.length; index++)
    if (db.rooms[index].id == id)
      return index
  return -1
}
function getRooms (req:any, res:any){
  res.json(db.rooms)
}
function getRoomById (req:any, res:any){
  const index:number = findIndexById(req.params.roomId)
  index >= 0?res.json(db.rooms[index]):res.send('Room not found')
}
function postRoom (req:any, res:any){
  const newRoom = {id: new Date().getTime(), name: req.body.name}
  db.rooms.push(newRoom)  
  res.json(newRoom)
}
function putRoom (req:any, res:any){
  const index:number = findIndexById(req.params.roomId)
  if (index >= 0){
    db.rooms[index].name = req.body.name?req.body.name:db.rooms[index].name
    res.json(db.rooms[index])
  }
  else
    res.send('Room not found')
}
function deleteRoom (req:any, res:any){
  const index:number = findIndexById(req.params.roomId)
  if (index >= 0) {
    const Room = db.rooms[index]
    db.rooms.splice(index,1)
    res.json(Room)
  }
  else
    res.send('Room not found')
}

// Get all, Get one, create, Update, delete
router.get("/", getRooms)
router.get("/:roomId", getRoomById)
router.post('', postRoom)
router.put('/:roomId', putRoom)
router.delete('/:roomId', deleteRoom)

export default router