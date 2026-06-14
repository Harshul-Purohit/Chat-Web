import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
    
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decode.userId; // attach userId
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAuthenticated;
