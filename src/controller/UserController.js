const UserModel = require("../model/UserModel");
const shortid = require("shortid");
const generateToken = require("../utlis/generateToken");

exports.signin = async (req, res) => {
  await UserModel.findOne({ email: req.body.email }).exec(
    async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword && user.role === "user") {
          const token = generateToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName } = user;
          res.status(200).json({
            message: "Loggin successfull!",
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        } else {
          return res.status(400).json({
            message: "Invalid email and password",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  );
};

exports.signup = (req, res) => {
  UserModel.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new UserModel({
      firstName,
      lastName,
      email,
      password,
      username: shortid.generate(),
    });
    const token = generateToken(_user._id, _user.role);
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (data) {
        const { _id, firstName, lastName, email, role, fullName } = data;
        return res.status(201).json({
          message: "Loggin successfull!",
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

exports.authVerifyUser = async (req, res) => {
  // console.log(req.user);
  await UserModel.findOne({ _id: req.user._id }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.role === "user") {
        res.status(200).json({
          authenticate: true,
          name: user.fullName,
        });
      } else {
        return res.status(400).json({
          message: "Something wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
