const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const { socketIo } = require("./socket/socket");

const auth = require("./routes/auth");
const message = require("./routes/message");
const room = require("./routes/room");

dotenv.config({ path: "./config/config.env" });

connectDB();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo(io);

app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/message", message);
app.use("/api/room", room);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
