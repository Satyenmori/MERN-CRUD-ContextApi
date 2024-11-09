import jwt from "jsonwebtoken";
import User from "../model/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // remove bearer with space
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SEC_KEY);    

    //get data
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // create custom property set realted data get any where  in the app
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;