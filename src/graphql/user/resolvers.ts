import { Resolver } from "../../helpers";
import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { isAuthenticated } from "../../middlewares";
import { UpdateUserInput } from "./typeDefs";
import { User } from "../../models";

const userResolvers: Resolver = {
    Query: {
        user: (parent, args, context) => {
            return context.user
        }
    },
    Mutation: {
        updateUser: async (parent, { props }: UpdateUserInput, { user }) => {
            const foundUser = await User.findOne({ _id: user?._id })
            const updateUser = await foundUser?.updateOne(props)
            return updateUser
        }
    }
}

const resolversComposition = {
    'Mutation.updateUser': [isAuthenticated],
    'Query.user': [isAuthenticated],
}

export default composeResolvers(userResolvers, resolversComposition);