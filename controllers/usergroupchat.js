const Group = require('../models/group');
const User = require('../models/user');
const usergroup = require('../models/usergroup'); 
const usergroupchat=require('../models/usergroupchat')
const { Op, where } = require('sequelize');

exports.creatchat = async (req, res, next) => {
  try {
    const { message,groupId } = req.body;
    const userId=req.user.id
    const userName=req.user.name
    
    if (!groupId  || !userId || !userName) {
      return res.status(400).json({ message: 'Group ID,userName and userId  are required', success: false });
    }

    const groupchat = await usergroupchat.create({ message,groupId,userId,userName });

    return res.status(201).json({
      message: 'msg sent to the group successfully',
      success: true,
      usergroupchat: groupchat
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.getchat = async (req, res, next) => {
  try {
    const { groupId } = req.query;
    const usergroup = await usergroupchat.findAll({
      where: {
        groupId: groupId
        } 
    })
return res.status(200).json({ success: true, usergroup });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};