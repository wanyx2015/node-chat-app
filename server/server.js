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

    socket.emit("newMessage", {
        from: "Bill",
        text: "Good morning!",
        createdAt: new Date().getTime()
    })

    socket.on("createMessage", (message) => {
        console.log("createMessage", message);
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.");
    })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})