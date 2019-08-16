const MessageModel = require("../models/message.model.js");

exports.saveMessage = (src, name, message) => {
  const msg = new MessageModel({
    src,
    name,
    message
  });
  msg.save();
};

exports.getAllMessage = () => {
  return MessageModel.find({});
};
