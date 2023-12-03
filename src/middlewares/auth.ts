import { JWT_SALT } from "../config"
import { IUser, Token } from "../models"
import { IContext } from "../types"
import jwt from 'jsonwebtoken'

export const isAuthenticated = (next: any) => (parent: any, args: any, context: IContext, info: any) => {
    if (!context.user) {
        throw new Error('You are not authenticated!')
    }

    return next(parent, args, context, info)
}

export const hasRole = (role: string) => (next: any) => (parent: any, args: any, context: IContext, info: any) => {
    if (!context.user) {
        throw new Error('You are not authorized!')
    }

    return next(parent, args, context, info)
}

export const verifyToken = async (_token: string): Promise<IUser> => {
    const token = _token.split(" ")[1];
    const dbToken = await Token.findOne({ token }).populate("user", { password: 0 });
    if (!dbToken) {
        throw new Error("Token not found!")
    }
    jwt.verify(token, JWT_SALT, (err) => {
        if (err) {
            throw err
        }
    })
    return dbToken.user
}