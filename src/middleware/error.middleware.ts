const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.statusCode = err.statusCode || 500;
    error.message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(
        (item) => (item as { message: string }).message,
      );
      error = new Error(message.join(', '));
      error.statusCode = 400;
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
