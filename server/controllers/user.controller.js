import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import storeCookie from "../utils/cookieHandler.js"

const userController = {
	getUser: (req, res) => {
		const { userId,	fullName, email, type, description } = req;
		res.status(200).json({ data: {userId, fullName, email, type, description}});
	},

	signUpUser: async (req, res) => {
		const { type, fullName, email, password, age, gender, description } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);

		// if user already present
		const dbUser = await User.findOne({ email });
		if (dbUser) {
			return res.status(403).json({
				message: `User with ${dbUser.email} already exists`,
			});
		}

		try {
			const newUser = await User.create({
				fullName,
				email,
				type,
				age,
				gender,
				description,
				password: hashedPassword,
			});
			await newUser.save();
			
			// cookie store
			const data = storeCookie(newUser, res);

			return res.status(200).json({
				message: `successfully created a user named ${fullName}`,
				data
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: "couldn't SignUp!" });
		}
	},

	loginUser: async (req, res) => {
		const { email, password } = req.body;

		try {
			const dbUser = await User.findOne({ email });
			if (!dbUser) {
				return res.status(403).json({ message: "Invalid credentials provided" });
			}

			// Check password
			const isValidPassword = await bcrypt.compare(password, dbUser.password);
			if (!isValidPassword) {
				return res.status(403).json({ message: "Invalid credentials provided" });
			}
			// console.log(dbUser)

			// cookie store
			const data = storeCookie(dbUser, res);

			return res.status(200).json({ message: "Successfully logged in", data });
		} catch (err) {
			console.error("Error during login", err);
			return res.status(500).json({ message: "Internal server error" });
		}
	},

	logOutUser: async (req, res) => {
		try {
			res.clearCookie("user_token");
			return res.status(200).json({ message: "successfully cleared user session" });
		} catch (error) {
			return res.status(400).json({ message: "Error! Couldn't Logout" });
		}
	}
}

export default userController;