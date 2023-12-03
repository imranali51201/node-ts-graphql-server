import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";

export interface IToken {
    token: string;
    user: IUser;
}

const TokenSchema = new Schema<IToken>({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Token = mongoose.model("Token", TokenSchema)

export default Token