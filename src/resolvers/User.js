import getUserId from "../utils/getUserId";

const User = {
	email: {
		fragment: "fragment userId on User { id }",
		resolve(parent, args, { request }, info) {
			console.log(parent);
			const userId = getUserId(request, false);

			if (userId && userId === parent.id) {
				return parent.email;
			} else {
				return null;
			}
		},
	},
};

export default User;
