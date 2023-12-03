import { BaseInput } from "../../types"

const userTypeDefs = `#graphql

type User{
    _id: String
    full_name: String
    email: String
    password: String
}

input UpdateUserInput {
    full_name: String
    email: String
}

type Query{
    user: User
}
type Mutation{
    updateUser(props: UpdateUserInput): User
}

`

export type UpdateUserInput = BaseInput<{
    full_name: string
    email: string
}>

export default userTypeDefs