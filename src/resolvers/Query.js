import getUserId from "../utils/getUserId";

const Query = {
	async users(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query,
					},
					{
						email_contains: args.query,
					},
				],
			};
		}

		return await prisma.query.users(opArgs, info);
	},
	async posts(parent, args, { prisma }, info) {
		const { query } = args;
		const opArgs = {
			where: {
				published: true,
			},
		};

		if (query) {
			opArgs.where.OR = [
				{
					title_contains: query,
				},
				{
					body_contains: query,
				},
			];
		}

		return await prisma.query.posts(opArgs, info);
	},
	async myPosts(parent, args, { prisma, request }, info) {
		const { query } = args;
		const userId = getUserId(request);

		const opArgs = {
			where: {
				author: {
					id: userId,
				},
			},
		};

		if (query) {
			opArgs.where.OR = [
				{
					title_contains: query,
				},
				{
					body_contains: query,
				},
			];
		}

		return await prisma.query.posts(opArgs, info);
	},
	async comments(parent, args, { prisma }, info) {
		return await prisma.query.comments(null, info);
	},
	async post(parent, args, { prisma, request }, info) {
		const { id } = args;
		const userId = getUserId(request, false);
		const posts = await prisma.query.posts(
			{
				where: {
					id,
					OR: [
						{
							published: true,
						},
						{
							author: {
								id: userId,
							},
						},
					],
				},
			},
			info
		);

		if (posts.length === 0) {
			throw new Error("Not found");
		}

		return posts[0];
	},
	async me(parent, args, { prisma, request }, info) {
		const { id } = args;
		const userId = getUserId(request);

		return await prisma.query.user({
			where: { id: userId },
		});
	},
};

export default Query;
