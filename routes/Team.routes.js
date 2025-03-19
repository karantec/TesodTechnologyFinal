const express = require('express');
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam, } = require('../controller/Team.Controller');
const { upload } = require('../config/cloudinary'); 

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatTeam', cpUpload,createTeam);
router.get('/Team', getAllTeams);

router.get('/Team/:id', getTeamById);         // Get a team by ID
router.put('/team/:id', cpUpload, updateTeam); // Update a team (with optional image upload)
router.delete('/team/:id', deleteTeam); 
module.exports = router;
