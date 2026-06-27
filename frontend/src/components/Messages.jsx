import React, { useEffect, useRef } from 'react';
import SingleMessage from './SingleMessage';
import "../Form.css";
import { useSelector } from 'react-redux';
import useGetMessages from '../Hooks/useGetMessages';

const Messages = () => {
  console.log("Messages rendered");
  useGetMessages();
  const { messages } = useSelector(store => store.message);
  const { authUser } = useSelector(store => store.user);
  const messagesEndRef = useRef(null);
  const prevCount = useRef(0);

  useEffect(() => {
    // Only scroll when new messages are added
    if (messages.length > prevCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevCount.current = messages.length;
  }, [messages]);

  if (!Array.isArray(messages)) return null;

  return (
    <div className="messages-box">
      {messages.map((message) => {
        const type = message.senderId._id === authUser._id ? "end" : "start";
        return <SingleMessage key={message._id} message={message} type={type} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
