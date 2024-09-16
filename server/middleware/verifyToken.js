import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authorization Denied!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data (e.g., user ID) to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}; 
