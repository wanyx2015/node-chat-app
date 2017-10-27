const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");


const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New user connected.");
    // console.log(socket);

    socket.on("disconnect", () => {
        console.log("User was disconnected.");
    })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})