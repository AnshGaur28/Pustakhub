const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    const jwt = authHeader.split(" ")[1];
    req.token = jwt;
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = authorize;
