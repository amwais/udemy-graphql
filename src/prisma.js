import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";

const prisma = new Prisma({
	typeDefs: "src/generated/prisma.graphql",
	endpoint: "http://localhost:4466",
	secret: "some_secret_for_now",
	fragmentReplacements,
});

export default prisma;
