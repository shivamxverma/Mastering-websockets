// import { useEffect, useState } from 'react';
import './App.css';
import RealtimeCounter from './components/counter';

function App() {
  // const [message, setMessage] = useState<string>('');
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   const newSocket = new WebSocket('ws://localhost:8080');

  //   newSocket.onopen = () => {
  //     console.log('Connection established');
  //     newSocket.send('Hello Server!');
  //     setSocket(newSocket);
  //   };

  //   newSocket.onmessage = (event) => {
  //     console.log('Message received:', event.data);
  //     setMessages((prevMessages) => [...prevMessages, event.data]);
  //   };

  //   newSocket.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   newSocket.onclose = () => {
  //     console.log('WebSocket closed');
  //   };

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (socket && message.trim()) {
  //     socket.send(message);
  //     setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
  //     setMessage('');
  //   }
  // };

  return (
    <>
      <RealtimeCounter/>
      {/* <div>Chat With Me</div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

export default App;
