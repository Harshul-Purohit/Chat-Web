import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "../Form.css";
import axios from "axios"
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const navigate = useNavigate();

  const [error, setError] = useState(""); // new error state

  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
    console.log("Selected gender:", gender);
  };

const onSubmitHandler = async (e) => {
  e.preventDefault();

  // validation checks first
  if (!user.fullName || !user.userName || !user.password || !user.confirmPassword) {
    setError("All fields are required.");
    return;
  }

  if (user.password !== user.confirmPassword) {                     
    setError("Passwords do not match.");
    return;
  }

  if (!user.gender) {
    setError("Please select a gender.");
    return;
  }

  setError(""); // clear error

  try {
    const res = await axios.post(
      "http://localhost:2023/api/v1/user/register",
      user,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(res);

    if (res.data.success) {
      navigate("/login"); // ✅ redirect only after success
      toast.success(res.data.message);
    } else {
      setError(res.data.message || "Signup failed.");
    }
  } catch (error) {
        toast.error(error.response.data.message);
    console.error(error);
    setError("Server error. Please try again.");
  }

  // optional: reset form only after success
  setUser({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
};


  return (
    <div className="form-container">
      <h2>Signup</h2>

      <form className="form-box" onSubmit={onSubmitHandler}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="gender-box">
          <label>
            <input
              type="radio"
              checked={user.gender === "male"}
              onChange={() => handleCheckBox("male")}
              name="gender"
              value="male"
            /> Male
          </label>
          <label>
            <input
              type="radio"
              checked={user.gender === "female"}
              onChange={() => handleCheckBox("female")}
              name="gender"
              value="female"
            /> Female
          </label>
          <label>
            <input
              type="radio"
              checked={user.gender === "other"}
              onChange={() => handleCheckBox("other")}
              name="gender"
              value="other"
            /> Other
          </label>
        </div>

        {/* show error if exists */}
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <button type="submit" className="btn">Signup</button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
