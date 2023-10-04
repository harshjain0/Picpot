const express = require('express');
const MyError = require("../model/error")
const location_router = express.Router();
const picUpload=require("../uploads/users/picUpload")
const locationController=require('../controllers/location_controllers')

location_router.get("/:locid",locationController.getLocationByLocId);

location_router.get("/users/:uid",locationController.getLocationByUserId);

location_router.post("/",picUpload.single("pic"),locationController.createNewLocation);

location_router.delete("/:locid",locationController.deleteLocation);

module.exports = location_router;