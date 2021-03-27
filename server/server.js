const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");

const connectDatabase = require("./connect-database");
const emitDatabase = require("./helper/emit-database");
const createLog = require("./helper/create-log");

const { consumer } = require("./helper/kafka/events");

const PORT = 5000;

connectDatabase();

app.use(express.json());
app.use(cors());

consumer();

app.get("/", async (req, res) => {
  await createLog("GET");

  res.json({ ok: true });
});

app.post("/", async (req, res) => {
  await createLog("POST");

  res.json({ ok: true });
});

app.put("/", async (req, res) => {
  await createLog("PUT");

  res.json({ ok: true });
});

app.delete("/", async (req, res) => {
  await createLog("DELETE");

  res.json({ ok: true });
});

http.listen(PORT, () => {
  console.log(`server is up: http://localhost:${PORT}`);
});

let interval;

io.on("connection", async (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = await setInterval(() => emitDatabase(socket), 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
