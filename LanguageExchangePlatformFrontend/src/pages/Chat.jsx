import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/authService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const chatEndRef = useRef(null);
  const ws = useRef(null);
  const token = localStorage.getItem("token");
  const userdetails = useSelector((state) => state.login.user);
  const params = useParams();
  const senderId = userdetails.id;
  const receiverId = params.id;

  console.log("sender: " + senderId + " reciever" + receiverId);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/messages/getchat.php?user1=${senderId}&user2=${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();

    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      setMessages((prev) => [...prev, incoming]);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Clean up WebSocket connection when the component unmounts or sender/receiverId changes
    return () => {
      ws.current.close();
    };
  }, [senderId, receiverId, token]); // Re-run when senderId or receiverId changes

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString(), // optional
    };

    try {
      await axios.post(`${BASE_URL}/messages/send.php`, newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(newMessage));
      }

      setMessageInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach((msg) => {
      // Extract date from timestamp or use today's date
      const date = msg.timestamp
        ? new Date(msg.timestamp).toLocaleDateString()
        : new Date().toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white p-4 shadow-md">
        <h2 className="font-semibold text-lg">
          {userdetails.username || `Chat with User ${receiverId}`}
        </h2>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <p className="text-center font-medium">No messages yet</p>
            <p className="text-sm text-center">
              Start the conversation by sending a message below
            </p>
          </div>
        ) : (
          Object.keys(messageGroups).map((date) => (
            <div key={date} className="space-y-3">
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                  {date}
                </span>
              </div>

              {messageGroups[date].map((msg, index) => {
                const isSender = msg.sender_id === senderId;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm text-sm break-words ${
                        isSender
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <div className="font-semibold text-xs mb-1">
                        {msg.sender_username || `User ${msg.sender_id}`}
                      </div>
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs mt-1 text-right opacity-80">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-end rounded-lg border border-gray-300 bg-white p-1 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
          <textarea
            rows="1"
            className="flex-1 p-2 text-gray-800 resize-none focus:outline-none"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="ml-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1 ml-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default Chat;
