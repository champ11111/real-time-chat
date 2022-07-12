exports.socketIo = (io) => {
  console.log("Socket open");
  io.on("connection", (socket) => {
    socket.on("setup", (user) => {
      socket.join(user._id);
      socket.emit("connected");
    });

    socket.on("join room", (room) => {
      console.log(`user join room id ${room}`);
      socket.join(room);
    });

    socket.on("new message", (receivedMessage) => {
      const room = receivedMessage.room;
      // room.users.forEach((user) => {
      //   if (user === receivedMessage.sender._id) return;
      //   socket.in(user).emit("message received", receivedMessage);
      // });
      socket.to(room._id).emit("message received", receivedMessage);
    });

    socket.off("setup", () => {
      socket.leave(userData._id);
    });
  });
};
