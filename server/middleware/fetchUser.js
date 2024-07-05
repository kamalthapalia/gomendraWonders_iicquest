import jwt from 'jsonwebtoken'

const fetchuser = (req, res, next) => {
	
	try {
		const user_token = req.cookies.user_token;
		
		if (!user_token) {
			return res.status(403).json({message: "Unauthorized user - No token provided."});
		}

		const data = jwt.verify(user_token, process.env.JWT_SECRET);
		const {fullName, userId, email, type, description} = data;
		// console.log(data);

		req.fullName = fullName;
		req.email = email;
        req.userId = userId;
        req.type = type;
		req.description = description;

	} catch (error) {
		console.log(error)
		return res.status(403).json({message: "Unauthorized user - No token provided."});
	}
	next();
};

export default fetchuser;