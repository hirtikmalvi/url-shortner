const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).render("<h1>All Fields are required!</h1>");

  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).render("<h1>All Fields are required!</h1>");

  const user = await USER.findOne({ email, password });
  if (!user) {
    console.log("INSIDE IF");
    return res.render("login", {
      error: "Invalid Email or Password...",
    });
  }
  const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = { handleUserSignUp, handleUserLogin };
