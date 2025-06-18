// server.js

const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos
app.use("/sitioA", express.static(path.join(__dirname, "sitioA")));
app.use("/sitioB", express.static(path.join(__dirname, "sitioB")));

wss.on("connection", function connection(ws) {
  console.log("Nuevo cliente conectado");

  ws.on("message", function incoming(message) {
    console.log("Mensaje recibido:", message);

    // Reenviar el mensaje a todos los clientes
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000");
});
