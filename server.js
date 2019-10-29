var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  pingTimeout: 3600000, // intervalo de una hora haga que la conexion del socket se cierre
  pingInterval: 3600000
});
var fs = require("fs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  fs.appendFileSync("log.txt", "Conexión de usuario.\n");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
