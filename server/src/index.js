const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Vue.js 빌드 결과물이 위치한 경로
const vueBuildPath = path.join(__dirname, "..", "public");

// 정적 파일을 Vue.js 빌드 결과물의 경로에서 제공
app.use(express.static(vueBuildPath));

// 모든 요청에 대해 index.html 제공
app.get("*", (req, res) => {
    res.sendFile(path.join(vueBuildPath, "index.html"));
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle game logic and events here
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
