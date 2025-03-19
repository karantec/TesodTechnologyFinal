const express = require('express');
const { createTeam, getAllTeams } = require('../controller/Team.Controller');
const { upload } = require('../config/cloudinary'); 

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatTeam', cpUpload,createTeam);
router.get('/Team', getAllTeams);


module.exports = router;
