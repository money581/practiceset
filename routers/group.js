// routes/group.js

const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.js'); // Import your group controller
const authenticateController = require('../middleware/auth'); // Import your authentication middleware

// POST request to create a new group
router.post('/create', authenticateController.authenticate, groupController.createGroup);
router.get('/groups',authenticateController.authenticate, groupController.getGroups);

// Add more group-related routes as needed

module.exports = router;
