import { Request, Response } from 'express';

export const register = (_req: Request, res: Response) => res.send("register");

export const login = (_req: Request, res: Response) => res.send("login");
