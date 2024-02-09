import Contect from "../model/Contect.js";
import User from "../model/User.js";

export const getAdminUserdata = async (req, res) => {
  try {
    const getUserdata = await User.find({}, { password: 0 });
    res.status(200).json(getUserdata);
  } catch (error) {
    res.status(500).json("admin-userData not get", error);
  }
};

// get all contect data

export const getAdminContectdata = async (req, res) => {
  try {
    const getcontect = await Contect.find({});
    res.status(200).json(getcontect);
  } catch (error) {
    res.status(500).json("admin-Contect not get", error);
  }
};
