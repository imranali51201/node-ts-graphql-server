import nodemailer from "nodemailer";
import { MAILER_CONFIG } from "../config";
import Mail from "nodemailer/lib/mailer";

const mailer = nodemailer.createTransport({
    host: MAILER_CONFIG.MAILER_HOST,
    port: MAILER_CONFIG.MAILER_PORT,
    auth: {
        user: MAILER_CONFIG.MAILER_USER,
        pass: MAILER_CONFIG.MAILER_PASSWORD,
    },
});

export const sendMail = async (to: string, props: { text: string, subject: string }) => {
    const info = await mailer.sendMail({
        to,
        subject: props.subject,
        text: props.text,
        html: props.text,
        from: MAILER_CONFIG.MAILER_USER,
    });
    return info
}

export default mailer