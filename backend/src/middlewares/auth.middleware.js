import { admin } from "../config/firebaseAdmin.js";

export const verifyToken = async (req, res, next) => {
  // 1. Check if the Authorization header exists
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // 2. Extract the token string (remove "Bearer " prefix)
  const idToken = authHeader.split(' ')[1];

  try {
    // 3. Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 4. ATTACH user info to the request object
    // Now any route coming after this middleware can access req.user
    req.user = decodedToken; 
    //console.log(req.user);
    
    // Proceed to the next controller
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};