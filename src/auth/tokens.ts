import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User): string =>
	sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "15m",
	});

export const createRefreshToken = (user: User): string =>
	sign(
		{ userId: user.id, tokenVersion: user.tokenVersion },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: "7d",
		},
	);

export const setRefreshTokenCookie = (res: Response, token: string) => {
	res.cookie(process.env.COOKIE_NAME!, token, {
		httpOnly: true,
		path: "/refresh_token",
	});
};
