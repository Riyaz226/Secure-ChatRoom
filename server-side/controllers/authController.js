import bcrypt from "bcryptjs";
import User from "../modules/user_module.js";
import generateTokenAndSetCookie from "../generateToken.js";

export const signup = async (req, res) => {
	try {
	  const { fullName, phoneNumber, password, confirmPassword, gender } = req.body;
  
	  if (!fullName || !phoneNumber || !password || !confirmPassword || !gender) {
		return res.status(400).json({ error: "All fields are required" });
	  }
  
	  if (password !== confirmPassword) {
		return res.status(400).json({ error: "Passwords don't match" });
	  }
  
	  const existingUser = await User.findOne({ fullName });
	  if (existingUser) {
		return res.status(400).json({ error: "Username already exists" });
	  }
  
	  if (!req.file) {
		return res.status(400).json({ error: "Profile picture is required" });
	  }
  
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  const newUser = new User({
		fullName,
		phoneNumber,
		password: hashedPassword,
		gender,
		profilePic: req.file.path,
	  });
  
	  await newUser.save();
  
	  generateTokenAndSetCookie(newUser._id, res);
  
	  res.status(201).json({
		_id: newUser._id,
		fullName: newUser.fullName,
		phoneNumber: newUser.phoneNumber,
		profilePic: newUser.profilePic,
	  });
	} catch (error) {
	  console.error("Error in signup controller", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };

  export const login = async (req, res) => {
    try {
        const { fullName, password } = req.body;

        if (!fullName || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ fullName });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};