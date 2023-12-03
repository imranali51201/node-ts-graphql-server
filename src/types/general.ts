import { IUser } from "../models"

export type BaseInput<T> = {
    props: T
}

export type IContext = {
    user?: IUser
}