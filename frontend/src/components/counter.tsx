import React, { useState, useEffect } from "react";

const RealtimeCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const value = Number(event.data);
      if (!isNaN(value)) {
        setCount((prevCount) => prevCount + value);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendUpdate = (value: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(value.toString());
    }
  };

  return (
    <>
      <div>Counter</div>
      <div>{count}</div>
      <button onClick={() => sendUpdate(1)}>Increment</button>
      <button onClick={() => sendUpdate(-1)}>Decrement</button>
    </>
  );
};

export default RealtimeCounter;
