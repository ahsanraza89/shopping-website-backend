// Custom Error Class for Controlled Errors

class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
	let statusCode = err.statusCode || 500; // Default to Internal Server Error
	let message = err.message || 'Internal Server Error';

	// Validation Error Handling (e.g., Mongoose Validation Errors)
	if (err.name === 'ValidationError') {
		statusCode = 400; // Bad Request
		message = Object.values(err.errors)
			.map((val) => val.message)
			.join(', ');
	}

	// CastError Handling (e.g., Invalid ObjectId in MongoDB)
	if (err.name === 'CastError') {
		statusCode = 400; // Bad Request
		message = `Invalid ${err.path}: ${err.value}`;
	}

	res.status(statusCode).json({
		success: false,
		error: message,
	});
};

export { errorHandler, CustomError };
