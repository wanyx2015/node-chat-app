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

    // emit to all client, excluding the emitter
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app",
        // createdAt: new Date().getTime()
    })

    // tell other people new people joined
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New user joined.",
        createdAt: new Date().getTime()
    })

    socket.on("createMessage", (message) => {
        console.log("createMessage", message);

        // emit to all client, including the emitter
        // io.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // emit to all client, excluding the emitter
        socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.");
    })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})