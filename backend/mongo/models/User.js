const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      unique: true,
      required: true,
      type: String,
      minLength: 3,
    },
    email: {
      required: true,
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Incorrect email format",
      ],
    },
    age: {
      required: true,
      type: Number,
      min: 13,
      max: 120,
    },
    password: {
      required: true,
      type: String,
      minLength: 6,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters",
      ],
    },
  },
  { collection: "users" }
);

const User = model("User", userSchema);

module.exports = User;
