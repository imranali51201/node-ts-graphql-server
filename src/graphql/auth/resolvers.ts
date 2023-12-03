import { JWT_SALT, PASSWORD_SALT } from "../../config";
import { Resolver } from "../../helpers";
import { IUser, Otp, Token, User } from "../../models";
import { AuthResponse, LoginInput, SendOtpInput, SignupInput, VerifyOtpInput } from "./typeDefs";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendMail } from "../../services";

const authResolvers: Resolver = {
    Mutation: {
        login: async (parent, { props }: LoginInput): Promise<AuthResponse> => {
            const { email, password } = props;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Wrong Email!")
            }
            const passwordMatched = await bcrypt.compare(password, user.password)
            if (!passwordMatched) {
                throw new Error("Wrong Password!")
            }
            const token = await generateToken(JSON.parse(JSON.stringify(user)))
            return { token }
        },
        signup: async (parent, { props }: SignupInput): Promise<AuthResponse> => {
            const { password, ...rest } = props;
            const hashedPassword = await hashPassword(password);
            const newUser = new User({ ...rest, password: hashedPassword })
            const user = await newUser.save()
            const token = await generateToken(JSON.parse(JSON.stringify(user)))
            return { token }
        },
        sendOtp: async (parent, { props }: SendOtpInput) => {
            const { email } = props
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error("User not found related to the email!")
            }
            const otp = randomNumber();
            const hashOtp = await bcrypt.hash(otp, 10);
            const newOtp = new Otp({ otp: hashOtp, user: user._id });
            await newOtp.save()
            await sendMail(email, {
                subject: "OTP",
                text: `Your otp is: ${otp}`
            })
            return { success: true }
        },
        verifyOtp: async (parent, { props }: VerifyOtpInput) => {
            const { email, otp } = props
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error("User not found related to the email!")
            }
            const savedOtp = await Otp.findOne({ user: user._id })
            if (!savedOtp) {
                throw new Error("Otp not found or expired!")
            }
            console.log("🚀 ~ file: resolvers.ts:59 ~ verifyOtp: ~ savedOtp?.otp:", savedOtp?.otp)
            const otpMatch = await bcrypt.compare(otp, savedOtp?.otp);
            if (!otpMatch) {
                throw new Error("Otp does not match!")
            }
            await savedOtp.deleteOne()
            return { success: true }
        }
    }
}

const generateToken = async (user: IUser) => {
    const token = jwt.sign(user, JWT_SALT, { expiresIn: "1h" })
    const newToken = new Token({ token, user: user._id })
    await newToken.save()
    return token
}

const hashPassword = async (password: string) => await bcrypt.hash(password, PASSWORD_SALT)

const randomNumber = () => {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString()
}

export default authResolvers;