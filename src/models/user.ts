import mongoose, { Schema } from "mongoose";

export interface IUser {
    _id: string;
    full_name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)

export default User