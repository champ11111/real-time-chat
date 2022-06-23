exports.socketIo = (io) => {
  io.on("connect", (socket) => {
    console.log("Client connected");

    socket.on("join", ({ socketUserName, socketRoom }, callback) => {
      console.log(`user here name ${socketUserName} and room ${socketRoom}`);

      socket.emit("message", {
        user: "admin",
        text: `${socketUserName}, welcome to the room ${socketRoom}`,
      });

      socket.broadcast.to(socketRoom).emit("message", {
        user: "admin",
        text: `${socketUserName} has joined the room`,
      });

      socket.join(socketRoom);

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
