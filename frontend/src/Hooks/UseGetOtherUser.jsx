import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser, setOthersUsers } from "../Redux/userSlice";

const useGetOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const res = await axios.get("http://localhost:2023/api/v1/user/", {
          withCredentials: true,
        });

        console.log("Fetched users:", res.data);
        dispatch(setAuthUser(res.data.self));
        dispatch(setOthersUsers(res.data.others));
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchOtherUser();
  }, [dispatch]);
};

export default useGetOtherUser;
