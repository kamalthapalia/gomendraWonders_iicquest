import jwt from "jsonwebtoken"

const storeCookie = (dbUser, res) => {
			res.clearCookie("user_token");

			const data = {
				userId: dbUser._id,
				fullName: dbUser.fullName,
				email: dbUser.email,
				type: dbUser.type,
				description: dbUser.description
			};

			const user_token = jwt.sign(data, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});

			res.cookie("user_token", user_token, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "None"
			});

			return data;
}


export default storeCookie;