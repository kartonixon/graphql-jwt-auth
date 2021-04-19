import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { tokenRouter } from "./auth/tokenRouter";
import { AuthResolver } from "./resolvers/AuthResolvers";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
	const app = express();
	app.use(cookieParser());

	app.get("/", (_, res) => res.send("hello"));

	app.use("/refresh_token", tokenRouter);

	await createConnection();

	const apolloServer = new ApolloServer({
		context: ({ req, res }) => ({ req, res }),
		schema: await buildSchema({
			resolvers: [AuthResolver, UserResolver],
		}),
	});

	apolloServer.applyMiddleware({ app });

	const port = process.env.PORT || 4000;

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
})();
