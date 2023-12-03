import express, { json } from 'express';
import { PORT } from './config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { resolvers, typeDefs } from './graphql';
import './db'
import { IContext } from './types';
import { verifyToken } from './middlewares';
import { IUser } from './models';

const app = express()
    .use(json())
    .use(cors())


const server = new ApolloServer<IContext>({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers: mergeResolvers(resolvers),
    formatError: (error) => {
        return ({ message: error.message })
    },
});

async function bootStrap() {
    await server.start();
    app
        .use('/graphql', expressMiddleware(server, {
            context: async ({ req }) => {
                let user: IUser | undefined = undefined;
                if (req?.headers['authorization']) {
                    user = await verifyToken(req.headers['authorization'])
                };
                return { user }
            }
        }))
        .listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}`);
        })
}

bootStrap()