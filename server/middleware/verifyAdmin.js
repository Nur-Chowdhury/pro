export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.admin === true) {
      next();
    } else {
      res.status(401);
      throw new Error('Not Authorized as an Admin!');
    }
};