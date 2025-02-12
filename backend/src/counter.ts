import { WebSocketServer, WebSocket } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

const wss = new WebSocketServer({ server });

let count = 0; 

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.send(count.toString());

  ws.on("message", (message) => {
    const value = Number(message);
    if (!isNaN(value)) {
      count = 1;

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(count.toString());
        }
      });

      console.log(`Updated Count: ${count}`);
    } else {
      console.log("Received invalid data:", message);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
