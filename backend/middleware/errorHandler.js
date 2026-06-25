export const errorHandler = (error, req, res, next) => {
    console.error(error);
  
    if (error.code === "23505") {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }
  
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  };