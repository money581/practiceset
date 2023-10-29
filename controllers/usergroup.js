const Group = require('../models/group');
const User = require('../models/user');
const usergroup = require('../models/usergroup'); 
const { Op, where } = require('sequelize');

exports.addUser = async (req, res, next) => {
  try {
    const { groupId, userName } = req.body;

    // Check if the groupId and userName are provided
    if (!groupId || !userName) {
      return res.status(400).json({ message: 'Group ID and username are required', success: false });
    }

    // Find the user by their username
    const existingUser = await User.findOne({ where: { name:userName } });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    // Create a new usergroup with the found user's ID and the provided groupId
    const newUserGroup = await usergroup.create({ userId: existingUser.id, groupId:groupId });

    return res.status(201).json({
      message: 'User added to the group successfully',
      success: true,
      usergroup: newUserGroup,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};



exports.getuser = async (req, res, next) => {

  try {
    const { groupId } = req.query;

 
    // const users = await usergroup.findAll({
    //   where: { groupId: groupId },
    // });
   
    
    // console.log(usergroup.userId);
    // // Return the list of users in the response
    // return res.status(200).json({ success: true, users });
    const usergroups = await usergroup.findAll({
      where: {
        groupId: groupId
        } 
        
    })
   
    const userofgroup = [];
const promises = usergroups.map(async element => {
  const userId = element.userId;
  const user = await User.findByPk(userId);
  if (user) {
    userofgroup.push(user.name);
  }
});

await Promise.all(promises);
return res.status(200).json({ success: true, userofgroup });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};
