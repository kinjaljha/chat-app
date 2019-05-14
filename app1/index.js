var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("A user connected");
    // socket.on("chat message", function(msg) {
    //     console.log("message:", msg);
    // });
    socket.on("chat message", function(msg) {
        io.emit("chat message", msg);
    });
    socket.on("disconnect", function() {
        console.log("user is disconnected");
    });
});

server.listen(3000, function() {
    console.log("listening on *:3000");
});
