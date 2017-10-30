const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
var generateMessage = require("./utils/message").generateMessage;


const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New user connected.");

    // emit to all client, excluding the emitter
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"))

    // tell other people new people joined
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined."))

    socket.on("createMessage", (message) => {
        console.log("createMessage", message);

        io.emit("newMessage", generateMessage(message.from, message.text));

        // emit to all client, including the emitter
        // io.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // emit to all client, excluding the emitter
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.");
    })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})