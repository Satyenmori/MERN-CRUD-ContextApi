import User from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    res.status(201).json({
      msg: "Registration Successfuly",
      token: await doc.generateToken(),
      userId: doc._id.toString(),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email, password });
    if (isUser) {
      res.status(200).json({
        msg: "Login Success",
        token: await isUser.generateToken(),
        userId: isUser._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
