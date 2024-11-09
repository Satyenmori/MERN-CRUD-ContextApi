import Card from "../model/Card.js";
import Document from "../model/Document.js";
import Link from "../model/Links.js";
import User from "../model/User.js";

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

// card all logic
export const addCard = async (req, res) => {
  try {
    const { userID } = req;
    const { name, jobTitle, company } = req.body;

    const user = await User.findById(userID).populate("cards");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.plan === "Basic" && user.cards.length >= 1) {
      return res
        .status(403)
        .json({ message: "Basic plan allows only a single card" });
    }

    // Create the new card
    const newCard = new Card({
      userId: user._id,
      name,
      jobTitle,
      company,
    });
    await newCard.save();

    // Add card to user's list and save
    user.cards.push(newCard._id);
    await user.save();

    res.status(201).json({
      message: "Card added successfully",
      data: newCard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCards = async (req, res) => {
  try {
    const userID = req.userID;

    const userCards = await Card.find({ userId: userID });
    res.status(200).json({
      message: "User cards fetched successfully",
      data: userCards,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
