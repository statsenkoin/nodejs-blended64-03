const { model, Schema } = require("mongoose");

const usersSchema = Schema({
  name: {
    type: String,
    default: "Andriy",
  },
  email: {
    type: String,
    required: [true, "Email fild required"],
  },

  password: {
    type: String,
    required: [true, "Password  fild required"],
  },
  token: {
    type: String,
    default: null,
  },
});

module.exports = model("users", usersSchema);
