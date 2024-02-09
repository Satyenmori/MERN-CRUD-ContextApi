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

// Admin User Data Delete api

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User Delete Successfuly" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Admin Contect Data Delete api

export const deleteContect = async (req, res) => {
  try {
    const id = req.params.id;
    await Contect.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Contect Delete Succesfully" });
  } catch (error) {
    res.status(500).json("Admin-contect-Not delete", error);
  }
};
