import express from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";
import { ExpressPayload } from "../ExpressContext";
import {
	createAccessToken,
	createRefreshToken,
	setRefreshTokenCookie,
} from "./tokens";

export const tokenRouter = express.Router();

tokenRouter.post("/", async (req, res) => {
	const token = req.cookies[process.env.COOKIE_NAME!];

	if (!token) {
		return res.send({ success: false, accessToken: "" });
	}

	let payload: ExpressPayload;

	try {
		payload = verify(
			token,
			process.env.REFRESH_TOKEN_SECRET!,
		) as ExpressPayload;
	} catch (err) {
		console.log(err);
		return res.send({ success: false, accessToken: "" });
	}

	const user = await User.findOne(payload.userId);

	if (!user || user.tokenVersion !== payload.tokenVersion) {
		return res.send({ success: false, accessToken: "" });
	}

	setRefreshTokenCookie(res, createRefreshToken(user));

	return res.send({ success: true, accessToken: createAccessToken(user) });
});
