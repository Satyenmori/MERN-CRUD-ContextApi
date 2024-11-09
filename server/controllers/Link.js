import Document from "../model/Document.js";
import Link from "../model/Links.js";

export const AddLink = async (req, res) => {
  try {
    const newLink = new Link({ ...req.body, userId: req.userID });
    const savedLink = await newLink.save();
    res.status(201).json({
      msg: "Links Added Successfully",
      data: savedLink,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AddDoc = async (req, res) => {
  try {
    const user = new Document({ ...req.body, userId: req.userID });
    const doc = await user.save();
    res.status(201).json({
      msg: "Catalouge Add Successfuly",
      data: doc,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserContent = async (req, res) => {
  try {
    const userId = req.userID;

    const [links, doc] = await Promise.all([
      Link.find({ userId }),
      Document.find({ userId }),
    ]);
    res.json({ links, doc });
  } catch (error) {
    res.status(500).json(error);
  }
};
