import { BaseInput } from "../../types";

const authTypeDefs = `#graphql

type AuthResponse {
    token: String
}

input LoginInput {
    email: String!
    password: String!
}

input SignupInput {
    email: String!
    password: String!
    full_name: String!
}

input SendOtpInput {
    email: String!
}

input VerifyOtpInput {
    email: String!
    otp: String!
}

type OtpResponse {
     success: Boolean
}

type Mutation {
    login(props: LoginInput!): AuthResponse
    signup(props: SignupInput!): AuthResponse
    sendOtp(props: SendOtpInput!): OtpResponse
    verifyOtp(props: VerifyOtpInput!): OtpResponse
}

`;

export type SignupInput = BaseInput<{
    email: string;
    password: string;
    full_name: string;
}>

export type LoginInput = BaseInput<{
    email: string;
    password: string;
}>

export type AuthResponse = {
    token: String
}

export type SendOtpInput = BaseInput<{
    email: string
}>

export type VerifyOtpInput = BaseInput<{
    email: string
    otp: string
}>

export type OtpResponse = {
    success: Boolean
}

export default authTypeDefs