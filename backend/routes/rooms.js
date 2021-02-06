const express = require('express');
var router = express.Router();
const db = require('../db.json')

function findIndexById(id) {
  for (let index = 0; index < db.rooms.length; index++)
    if (db.rooms[index].id == id)
      return index
  return -1
}
function getRooms (req, res){
  res.json(db.rooms)
}
function getRoomById (req, res){
  const index = findIndexById(req.params.roomId)
  index >= 0?res.json(db.rooms[index]):res.send('Room not found')
}
function postRoom (req, res){
  const newRoom = {id: new Date().getTime(), name: req.body.name}
  db.rooms.push(newRoom)  
  res.json(newRoom)
}
function putRoom (req, res){
  const index = findIndexById(req.params.roomId)
  if (index >= 0){
    db.rooms[index].name = req.body.name?req.body.name:db.rooms[index].name
    res.json(db.rooms[index])
  }
  else
    res.send('Room not found')
}
function deleteRoom (req, res){
  const index = findIndexById(req.params.roomId)
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

module.exports = router