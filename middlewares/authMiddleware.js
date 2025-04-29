import { verifyToken } from '../utils/token.js';
import User from '../models/User.js';
import { CustomError } from './errorMiddleware.js';

// Middleware to Protect Routes
const protect = async (req, res, next) => {
	let token;

	// Extract token from Authorization header
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new CustomError('Not authorized, no token provided', 401)); // Unauthorized
	}

	try {
		// Verify token
		const decoded = verifyToken(token);

		// Attach user to request
		req.user = await User.findById(decoded.id).select('-password');
		if (!req.user) {
			return next(new CustomError('Not authorized, invalid token', 401)); // Unauthorized
		}
		next();
		// console.log('🚀 ~ protect ~ req.user:', req.user);
	} catch (error) {
		return next(new CustomError('Not authorized, invalid token', 401));
	}
};

// Middleware for Role-Based Access
const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new CustomError('Not authorized for this role', 403)); // Forbidden
		}
		next();
	};
};

export { protect, authorize };
