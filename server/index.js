const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

const { socketIo } = require("./socket/socket");

const auth = require("./routes/auth");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo(io);

app.use(cors());

app.use("/api/auth", auth);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
