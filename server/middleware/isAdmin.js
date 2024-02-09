

export const isAdmin = async (req, res, next) => {
  try {
    const admin = req.user.role;
    if (admin!== "admin") {
     return res.status(403).json({ msg: "Access Denind : user is not Admin !" });
    }
   console.log(req.user);
    
    next();
  } catch (error) {
    res.status(500).json("isAdmin middleware", error);
  }
};
