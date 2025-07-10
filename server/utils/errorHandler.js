// Utility for sending error responses in controllers

export const sendValidationError = (res, validation) => {
  return res.status(400).json({
    error: validation.error.errors[0].message,
    details: validation.error.errors.map(e => ({ path: e.path, message: e.message }))
  });
};

export const sendServerError = (res, err, context = "") => {
  if (context) {
    console.log(`Error in ${context}:`, err.message);
  } else {
    console.log("Server error:", err.message);
  }
  return res.status(500).json({ error: "Internal Server Error" });
}; 