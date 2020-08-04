import jwt from "jsonwebtoken";

export default (request, requireAuth = true) => {
	const header = request.request.headers.authorization;

	if (header) {
		const token = header.split(" ")[1];
		const decoded = jwt.verify(token, "some_secret");

		return decoded.userId;
	}

	if (requireAuth) {
		throw new Error("Authentication required");
	}

	return null;
};
