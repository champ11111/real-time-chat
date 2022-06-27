exports.socketIo = (io) => {
  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("new message", (receivedMessage) => {
      var chat = receivedMessage.chat;
      chat.users.forEach((user) => {
        if (user == receivedMessage.sender._id) return;
        socket.in(user).emit("message recieved", receivedMessage);
      });
    });

    socket.off("setup", () => {
      socket.leave(userData._id);
    });
  });
};
