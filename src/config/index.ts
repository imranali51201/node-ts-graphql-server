import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 5000
export const DB_URI = process.env.DB_URI || ""
export const JWT_SALT = process.env.JWT_SALT || ""
export const PASSWORD_SALT = 10

export const MAILER_CONFIG = {
    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_PORT: Number(process.env.MAILER_PORT),
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD
}