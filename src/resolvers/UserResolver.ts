import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { AuthMiddleware } from "../auth/AuthMiddleware";
import { User } from "../entity/User";
import { ExpressContext } from "../ExpressContext";

@Resolver()
export class UserResolver {
	@Query(() => String)
	hello() {
		return "hi!";
	}

	@Query(() => String)
	@UseMiddleware(AuthMiddleware)
	currentUserId(@Ctx() { payload }: ExpressContext) {
		return payload!.userId;
	}

	@Query(() => [User])
	users() {
		return User.find();
	}

	// TODO: Only for testing
	@Mutation(() => Boolean)
	async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
		const user = await User.findOne(userId);

		if (!user) return false;

		user.tokenVersion += 1;
		user.save();

		return true;
	}
}
