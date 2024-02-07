import Contect from "../model/Contect.js";

export const createContect = async (req, res) => {
  try {
    const contect = new Contect(req.body);
    const doc = await contect.save();
    res.status(201).json({ msg: "Contect Details Save" });
  } catch (error) {
    res.status(500).json("contect Not saved", error);
  }
};
