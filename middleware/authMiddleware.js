const jwt = require("jsonwebtoken");

const requireSignIn = (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract the token from the 'Bearer <token>' format
    const token = req.headers.authorization.split(" ")[1];

    console.log("Token:", token);  // Debugging: Log the token to ensure it's correct

    // Verify the token with the secret key
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded token:", decode);  // Debugging: Log the decoded token

    // Attach decoded user to request
    req.user = decode;

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error("Authorization error:", error);  // Log the error for debugging

    return res.status(401).json({
      success: false,
      message: "Authorization failed. Invalid token.",
    });
  }
};

module.exports = requireSignIn;
