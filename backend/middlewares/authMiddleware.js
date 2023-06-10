const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  /**
   * 1. отримаємо токен
   * 2. розшифровуємо токен
   * 3. шукаємо користувача в базі даних
   * 4. передаємо дані користувача далі
   */

  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType !== "Bearer") {
      res.status(400);
      throw new Error("Token type is not Bearer");
    }

    if (token) {
      const result = jwt.verify(token, "pizza");
      req.user = result.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ status: "Unauthorized", message: error.message });
  }
};
