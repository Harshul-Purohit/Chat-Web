import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

const useGetMessages = () => {
  
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching messages...");
    const fetchMessages = async () => {
      if (!selectedUser?._id) {
        dispatch(setMessages([]));
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:2023/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }
        );

        // ✅ Always overwrite with fresh data
        dispatch(setMessages(res.data.messages || []));
      } catch (error) {
        console.log("Error fetching messages:", error);
        dispatch(setMessages([]));
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?._id, dispatch]); 
  // ✅ Only depend on selectedUser._id and dispatch
  // We disable the lint warning because including `messages` would cause unnecessary re-fetch loops
};

export default useGetMessages;
