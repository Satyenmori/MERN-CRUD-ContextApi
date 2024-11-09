// get all user Data

export const userData = async (req, res) => {
  try {
    const userData = req.user;    
    return res.status(200).json({userData});
  } catch (error) {
    res.status(200).json("userData not Get", error);
  }
};
