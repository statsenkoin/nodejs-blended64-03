const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("../config/connectDb");
require("colors");
const errorHandler = require("./middlewares/errorHandler");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const UserModel = require("./models/userModel");

const asyncHandler = require("express-async-handler");

const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", require("./routes/postsRoutes"));

/**
 * реєстрація - зберігання користувача в базі даних
 *
 * аунтифікація - перевірка даних користувача з тими даними які є в базі даних
 *
 * авторизація - перевірка прав доступа
 *
 * логаут - вихід з системи
 */

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // res.send(req.body);
    /**
     * 1. чи передані всі обовязкові поля
     *
     * 2. все прийшло . шукаємо коритувача в базі даних
     *
     * 3. якщо знайшли такий логін то кажем йди логинся
     *
     * 4. якщо не знайшли хешуєм пароль
     *
     * 5. зберігання в базі даних з цим паролем
     *
     */

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      res.status(400);
      throw new Error("User olrede exist");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).json({
      code: 201,
      message: "Success",
      data: { ...req.body },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // res.send(req.body);
    /**
     * 1. чи передані всі обовязкові поля
     *
     * 2. все прийшло . шукаємо коритувача в базі даних
     *
     * 3. якщо не знайшли або не розшифрували видаємо помилку неправильний password або email
     *
     * 4. видаєм  token
     *
     */
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const user = await UserModel.findOne({ email });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!user || !isValidPassword) {
      res.status(400);
      throw new Error("Invalid or password");
    }

    const token = generateToken({
      frinds: ["Vitalik", "Ihor", "Oleh"],
      id: user._id,
    });
    console.log(token);
    // const user = await UserModel.create({
    //   ...req.body,
    //   password: hashPassword,
    // });
    // res.status(201).json({
    //   code: 201,
    //   message: "Success",
    //   data: { ...req.body },
    // });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "pizza", { expiresIn: "8h" });
}

app.use(errorHandler);

const { PORT } = process.env;
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
