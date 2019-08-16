const MessageController = require("./controllers/message.controller.js");
const nanoID = require("nanoid");

exports.socket = io => {
  io.on("connection", socket => {
    socket.on("disconnect", () => {});

    // Send the user, his session ID
    socket.on("socketInit", q => {
      socket.emit("sendUserID", socket.id);
    });

    // get Chat history by chatID
    socket.on("getChatById", id => {});

    // Recive message from front*
    socket.on("message", async data => {
      MessageController.saveMessage(data.src, data.name, data.message);
      const messageData = {
        user: {
          id: socket.id,
          user: data.name,
          src: data.src
        },
        message: {
          id: nanoID(),
          message: data.message,
          date: Date.now()
        }
      };

      io.emit("newMessage", messageData);
    });

    // ?!?
    socket.on("register", name => {
      users.set(socket.id, name);
    });
  });
};
