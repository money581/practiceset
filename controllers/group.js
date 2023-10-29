const Group = require('../models/group');
const User = require('../models/user'); // Import the User model
const { Op } = require('sequelize');
const usergroup = require('../models/usergroup');

exports.createGroup = async (req, res, next) => {
  try {
    const { groupName } = req.body;
    const userId = req.user.id;

    if (!groupName || !userId) {
      return res.status(400).json({ message: 'Group name and user ID are required', success: false });
    }

    // Attempt to create a new group with the provided groupName and userId (adminId)
    try {
      const newGroup = await Group.create({ groupName, userId: userId });
      const newUserGroup = await usergroup.create({ groupId: newGroup.id, userId });
      return res.status(201).json({ message: 'Group created successfully', success: true, group: newGroup });
    } catch (validationError) {
      console.log(validationError);
      return res.status(400).json({ message: validationError.message, success: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    
    
    // Fetch all groups from the database
    const usergroups = await usergroup.findAll({
      where: {
        userId: req.user.id 
        } 
        
    })
   
    const groups = [];
const promises = usergroups.map(async element => {
  const groupId = element.groupId;
  const group = await Group.findByPk(groupId);
  if (group) {
    groups.push(group);
  }
});

await Promise.all(promises);
 
    // Return the list of groups in the response
    return res.status(200).json({ success: true, groups });
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ message: err.message, success: false });
  }
};
