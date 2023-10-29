const express = require('express');
const router = express.Router();
const usergroupchatController = require('../controllers/usergroupchat.js'); // Import your group controller
const authenticateController = require('../middleware/auth'); // Import your authentication middleware

// POST request to create a new group
router.post('/userchat', authenticateController.authenticate, usergroupchatController.creatchat);
router.get('/getuserchat',authenticateController.authenticate,usergroupchatController.getchat);

// Add more group-related routes as needed

module.exports = router;