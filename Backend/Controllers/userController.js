const User = require("../Models/User");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  // get the values from request body and make the object
  const user_data = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  });
  // Find the email is already exist in database or not
  const verify = await User.find({ email: req.body.email });
  let result = true;
  // If exist then send false message to front end
  if (verify.length > 0) {
    result = false;
  }
  // If not exist save in database
  else {
    const user = await user_data.save();
    result = true;
  }

  try {
    res.status(200).json(result);
  } catch (err) {
    res.send(err);
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign(
        { name: user.fullname, email: req.body.email },
        "xyz123#"
      );
      return res.status(200).json({ status: "ok", user: token });
    } else {
      return res.status(401).json({ status: "error", user: false });
    }
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.getUser = async(req,res) => {
  try {
    const { email } = req.params
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).send({message:"User not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });

  }
}
exports.updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "Send all Fields" }).status(400);
    }
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({ message: "User not found" });
    }
    return res
      .status(200)
      .send({ message: "User details updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
