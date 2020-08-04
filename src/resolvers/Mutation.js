import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const Mutation = {
	async createUser(parent, args, { prisma }, info) {
		const { name, email, password } = args.data;
		if (password.length < 8) {
			throw new Error("Password should be at least 8 charachters long.");
		}

		const emailTaken = await prisma.exists.User({ email });

		if (emailTaken) {
			throw new Error("Email already taken.");
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.mutation.createUser({
			data: { name, email, password: encryptedPassword },
		});

		return {
			user,
			token: jwt.sign({ userId: user.id }, "some_secret"),
		};
	},

	async loginUser(parent, args, { prisma }, info) {
		const { email, password } = args.data;
		const user = await prisma.query.user({ where: { email } });

		if (!user) {
			throw new Error("Unable to find user.");
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Error("Authorization failed.");
		}

		return {
			user,
			token: jwt.sign({ userId: user.id }, "some_secret"),
		};
	},

	async deleteUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return await prisma.mutation.deleteUser({ where: { id: userId } }, info);
	},

	async updateUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { data } = args;

		return await prisma.mutation.updateUser(
			{
				where: {
					id: userId,
				},
				data,
			},
			info
		);
	},

	async createPost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { title, body, published } = args.data;

		return await prisma.mutation.createPost(
			{
				data: {
					title,
					body,
					published,
					author: {
						connect: {
							id: userId,
						},
					},
				},
			},
			info
		);
	},

	async updatePost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { id, data } = args;

		const PostExists = await prisma.exists.Post({
			id,
			author: {
				id: userId,
			},
		});

		if (!PostExists) {
			throw new Error("Unable to find post.");
		}

		return await prisma.mutation.updatePost(
			{
				where: {
					id,
				},
				data,
			},
			info
		);
	},

	async deletePost(parent, args, { prisma, request }, info) {
		const { id } = args;
		const userId = getUserId(request);

		const postExists = await prisma.exists.Post({
			id,
			author: {
				id: userId,
			},
		});

		if (!postExists) {
			throw new Error("Operation failed.");
		}

		return await prisma.mutation.deletePost({ where: { id } }, info);
	},

	async createComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { text, post } = args.data;

		return await prisma.mutation.createComment(
			{
				data: {
					text,
					author: {
						connect: {
							id: userId,
						},
					},
					post: {
						connect: {
							id: post,
						},
					},
				},
			},
			info
		);
	},

	async deleteComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { id } = args;

		const commentExists = await prisma.exists.Comment({
			id,
			author: {
				id: userId,
			},
		});

		if (!commentExists) {
			throw new Error("Unable to find comment");
		}

		return await prisma.mutation.deleteComment(
			{
				where: {
					id,
				},
			},
			info
		);
	},

	async updateComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { id, data } = args;

		const commentExists = await prisma.exists.Comment({
			id,
			author: {
				id: userId,
			},
		});

		if (!commentExists) {
			throw new Error("Unable to find comment");
		}

		return await prisma.mutation.updateComment(
			{
				where: {
					id,
				},
				data,
			},
			info
		);
	},
};

export default Mutation;
