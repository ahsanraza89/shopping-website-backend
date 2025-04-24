import User from "../models/User.js";

export const createUser = async (req, res) => {
  console.log("🚀 ~ createUser ~ req.body:", req.body);
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });

    await newUser.save();

    res.status(200).json({ message: "user created", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users retrieved", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id); // 🔥 await here

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Single user retrieved", user });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      error: error.message,
    });
  }
};
