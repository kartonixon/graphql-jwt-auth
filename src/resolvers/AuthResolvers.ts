import { compare, hash } from "bcryptjs";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import {
	createAccessToken,
	createRefreshToken,
	setRefreshTokenCookie,
} from "../auth/tokens";
import { User } from "../entity/User";
import { ExpressContext } from "../ExpressContext";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;

	@Field()
	success: boolean;
}

@ObjectType()
class RegisterResponse {
	@Field(() => [String])
	errors: string[];

	@Field()
	success: boolean;
}

@Resolver()
export class AuthResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { res }: ExpressContext,
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return { accessToken: "", success: false };
		}

		const valid = await compare(password, user.password);

		if (!valid) {
			return { accessToken: "", success: false };
		}

		setRefreshTokenCookie(res, createRefreshToken(user));

		return {
			accessToken: createAccessToken(user),
			success: true,
		};
	}

	@Mutation(() => RegisterResponse)
	async register(
		@Arg("email") email: string,
		@Arg("username") username: string,
		@Arg("password") password: string,
	): Promise<RegisterResponse> {
		const userWithSameEmail = await User.findOne({ where: { email } });

		if (userWithSameEmail) {
			return { errors: ["Email is already taken"], success: false };
		}

		const userWithSameUsername = await User.findOne({
			where: { username },
		});

		if (userWithSameUsername) {
			return { errors: ["Username is already taken"], success: false };
		}

		const hashedPassword = await hash(password, 12);

		try {
			await User.insert({
				email,
				username,
				registrationDate: new Date(new Date().toISOString()),
				password: hashedPassword,
				tokenVersion: 0,
			});
		} catch (err) {
			console.log(err);
			return { errors: ["Error while registering User"], success: false };
		}

		return { errors: [], success: true };
	}
}
