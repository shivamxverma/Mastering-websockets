"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("WebSocket server is running");
});
const wss = new ws_1.WebSocketServer({ server });
let count = 0;
wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send(count.toString());
    ws.on("message", (message) => {
        const value = Number(message);
        if (!isNaN(value)) {
            count = 1;
            wss.clients.forEach((client) => {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(count.toString());
                }
            });
            console.log(`Updated Count: ${count}`);
        }
        else {
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
