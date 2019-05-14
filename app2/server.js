var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index2.html");
});

const connections = [];

io.on("connection", socket => {
    connections.push(socket);
    console.log("%s sockets are connected", connections.length);

    socket.on("sending message", msg => {
        console.log("chat message", msg);
        io.emit("new message", { message: msg });
    });

    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1);
    });
});

server.listen(3000, function() {
    console.log("listening on *:3000");
});
