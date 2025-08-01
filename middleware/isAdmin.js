const isAdmin = async (req, res, next) => {
  try {
     if (!req.user) {
    return res.status(401).json({ msg: 'Unauthorized: User info missing' });
  }
      if (req.user.role !== "admin") {
       return res.status(403).json({
            success: false,
            message: `not admin access denied`
        })
    } 
    next()
  } catch (error) {
    res.status(500).json({
        success: false,
        message: `some other error`,
    })
  }
}
module.exports = isAdmin