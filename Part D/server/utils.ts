import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request } from "express";

dotenv.config();
export function encryptToken<T extends object>(data: T) {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION as any,
  });
}

export function decryptToken<T extends object>(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as T;
  } catch (error) {
    return null;
  }
}

export function getTokenFromHeader(request: Request) {
  const header = (request.headers["authorization"] || request.headers["Authorization"]) as string;
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  return token;
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
