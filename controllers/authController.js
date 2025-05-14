import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken, generateTokenForgetPass, verifyToken } from "../utils/token.js";
import sendEmail from "../utils/sendEmail.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "user Signup Successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: " Signup Error", error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "invalid cradentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};


export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateTokenForgetPass(user);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    console.log("🚀 ~ forgetPassword ~ resetLink:", resetLink)

    await sendEmail({
      to: email,
      subject: 'Reset your password',
      text: `Click here to reset your password: ${resetLink}`,
      html: `<p>Click here to reset your password: <a href="${resetLink}">Reset Password</a></p>`,

    });

    res.status(200).json({ message: 'Reset password link sent to email' });



  } catch (error) {
     return res.status(500).json({ message: "Forget password error", error: error.message });
  }

}

export const resetPassword = async (req, res) => { 
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reset password error", error: error.message });
  } 

}



