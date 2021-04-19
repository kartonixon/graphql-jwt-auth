import { Request, Response } from "express";

export type ExpressPayload = {
	userId: string;
	tokenVersion: number;
};

export interface ExpressContext {
	req: Request;
	res: Response;
	payload?: ExpressPayload;
}
