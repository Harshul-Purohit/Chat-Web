import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UseGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return; // guard against null
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:2023/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }
        );
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedUser]); // refetch whenever selectedUser changes

  return null; // hooks usually don’t render anything
};

export default UseGetMessages;
