import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";

export interface IOtp {
    otp: string;
    user: IUser;
}

const OtpSchema = new Schema<IOtp>({
    otp: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        ref: "User",
        unique: true,
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 3 });

const Otp = mongoose.model("Otp", OtpSchema)

export default Otp