const express = require("express");
const next = require("next");
// var mysql = require("mysql");
require("isomorphic-fetch");
const https = require("https");
var fs = require("fs");
var options = {
  key: fs.readFileSync("certificates/campus.key"),
  cert: fs.readFileSync("certificates/campus.crt")
};
const socketIo = require("socket.io");
const port = parseInt(process.env.PORT, 10) || 3001;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// const { json, send, createError, run } = require("micro");

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  const server2 = https.createServer(options, server);
  const io = socketIo(server2, {
    pingTimeout: 3600000 // intervalo de una hora haga que la conexion del socket se cierre
  });

  io.use(function(socket, next) {
    /* let token = socket.handshake.query.token;
    fetch("https://api.axontraining.com/sesion", {
      headers: {
        Authorization: token
      }
    }).then(res => {
      if (res.status == 200) {
        console.log("socket conectado ID:" + socket.id);
        next();
      } else {
        console.log("Socket: not authorized");
      }
    }); */
  });
  io.on("connection", socket => {
    socket.on("clase", clase => {
      socket.broadcast.emit("clase", {
        clase
      });
    });
  });
  server.use(
    "/static",
    express.static(__dirname + "/static", {
      maxAge: "365d"
    })
  );

  /*  server.post("/socket/fin-clase", (req, res) => {
    console.log(req.body);
    io.on("connection", socket => {
      socket.broadcast.emit("clase", JSON.parse(req.body));
    });
  }); */

  server.get("*", (req, res) => {
    //let sess = "xd";
    return app.render(req, res, req.originalUrl);
  });
  server2.listen(port, err => {
    if (err) throw err;
    const host = server2.address().address;
    const port = server2.address().port;
    console.log(`>Esto no es api PAPI Ready on https://localhost:${port}`);
  });
});
