import authResolvers from "./auth/resolvers"
import authTypeDefs from "./auth/typeDefs"
import userResolvers from "./user/resolvers"
import userTypeDefs from "./user/typeDefs"

const typeDefs = [
    authTypeDefs,
    userTypeDefs,
]
const resolvers = [
    authResolvers,
    userResolvers,
]

export { typeDefs, resolvers }