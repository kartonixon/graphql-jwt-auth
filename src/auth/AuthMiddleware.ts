import { ApolloError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { ExpressContext, ExpressPayload } from "../ExpressContext";

export const AuthMiddleware: MiddlewareFn<ExpressContext> = (
	{ context },
	next,
) => {
	const { authorization } = context.req.headers;

	if (!authorization) {
		throw new ApolloError("Not Authorized", "NOT_AUTHORIZED");
	}

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload as ExpressPayload;
	} catch (err) {
		console.log(err);
		throw new ApolloError("Not Authorized", "NOT_AUTHORIZED");
	}

	return next();
};
