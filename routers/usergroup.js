// routes/group.js

const express = require('express');
const router = express.Router();
const usergroupController = require('../controllers/usergroup.js'); // Import your group controller
const authenticateController = require('../middleware/auth'); // Import your authentication middleware

// POST request to create a new group
router.post('/adduser', authenticateController.authenticate, usergroupController.addUser);
router.get('/getgroupuser',authenticateController.authenticate,usergroupController.getuser);

// Add more group-related routes as needed

module.exports = router;
