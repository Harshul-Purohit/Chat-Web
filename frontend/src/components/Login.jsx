import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Form.css";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: ""
  });

  const [error, setError] = useState(""); // error state

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // validation checks
    if (!user.userName || !user.password) {
      setError("Username and password are required.");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // if everything is valid
    setError(""); // clear error
    console.log("Login data:", user);

    // reset form
    setUser({
      userName: "",
      password: ""
    });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form-box" onSubmit={onSubmitHandler}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            placeholder="Enter your username"
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

        {/* show error if exists */}
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <button type="submit" className="btn">Login</button>
      </form>
      <p>Don’t have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
                 