const admin = function (req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Authorization denied: Not an administrator' });
  }
  next();
};

export default admin;