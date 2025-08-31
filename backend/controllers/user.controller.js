import User from "../models/user.models.js";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email & password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const user = new User({ name, email, password, phone, provider: "local" });
    await user.save();

    const token = user.generateJWT();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = user.generateJWT();
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const home= async (req,res) => {
  res.send("Hey we are live")
}

// Get current user profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};