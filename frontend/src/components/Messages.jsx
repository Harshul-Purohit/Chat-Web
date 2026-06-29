import React, { useEffect, useRef } from 'react';
import SingleMessage from './SingleMessage';
import "../Form.css";
import { useSelector } from 'react-redux';
import useGetMessages from '../Hooks/useGetMessages';

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector(store => store.message);
  const { authUser } = useSelector(store => store.user);
  const messagesEndRef = useRef(null);
  const prevCount = useRef(0);

  // const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (messages.length > prevCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevCount.current = messages.length;
  }, [messages]);

  // const handleScroll = (e) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.target;
  //   setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
  // };

  if (!Array.isArray(messages)) return null;

  return (
    <div className="messages-box" >
      {messages.map((message) => {
        const type = message.senderId._id === authUser._id ? "end" : "start";
        return <SingleMessage key={message._id} message={message} type={type} />;
      })}
      <div ref={messagesEndRef} />

    </div>
  );
};

export default Messages;
