import { WebSocketServer, WebSocket } from 'ws';
import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    console.log(`${new Date()} Received request for ${request.url}`);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

console.log('WebSocket server is initializing...');

wss.on('connection', function connection(ws) {
    console.log('Client connected to WebSocket server');

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log(`${new Date()} Server is listening on port 8080`);
});
