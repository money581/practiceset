const Chat = require('../models/chat');

exports.postChat = async (req, res, next) => {
  try {
    console.log('message', req.body.text);
    console.log('id', req.user.id);

    await Chat.create({
      message: req.body.text,
      userId: req.user.id,
      userName: req.user.name
    });
    res.status(201).json({ message: 'Successfully sent text' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.getchat = async (req, res, next) => {
  try {
    const messages = await Chat.findAll();
    res.status(200).json({ success: true, message:messages }); // Use status code 200 for a successful GET request.
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, success: false });
  } 
};
