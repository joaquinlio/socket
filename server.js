var fs = require("fs");

var options = {
  key: fs.readFileSync("server-key.pem"),
  cert: fs.readFileSync("server-cert.pem"),
  ca: fs.readFileSync("../intermediate.crt")
};

var app = require("express")();
var https = require("https").createServer(options);
var io = require("socket.io")(https, {
  pingTimeout: 3600000,
  pingInterval: 3600000,
  upgradeTimeout: 3600000
});

io.on("connection", socket => {
  console.log(socket);
  socket.broadcast.emit("clase", {
    probando: "conectado"
  });
  socket.on("clase", clase => {
    socket.broadcast.emit("clase", {
      clase
    });
  });
});
/* socket.on("reconnect_attempt", () => {
  socket.io.opts.transports = ["polling", "websocket"];
}); */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

https.listen(3000, function() {
  console.log("listening on *:3000");
});
