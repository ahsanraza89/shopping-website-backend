import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },

    JWT_SECRET,

    { expiresIn: "5h" }
  );
};


/**
 * Verify a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object} - Decoded token payload
 */
export const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		throw new Error('Invalid or expired token');
	}
};
