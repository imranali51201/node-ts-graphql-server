import { IUser } from "../models";

export type EmptyObject = Record<never, any>;
export type AnyObject = Record<string, any>;
export type AnyArray = unknown[];
export type AnyObjectOrArray = AnyObject | AnyArray;
export type Key<T extends AnyObjectOrArray> = keyof T;
export type Val<T extends AnyObjectOrArray> = T[Key<T>];
export type Entry<T extends AnyObjectOrArray> = [Key<T>, Val<T>];
export type MapFunc<AT, RT> = (item: AT, index?: number, array?: AT[]) => RT;
export type Func1<AT = void, RT = void> = (arg: AT) => RT;

export type WithoutTimestamps<T> = Omit<T, 'createdAt' | 'deletedAt' | 'updatedAt'>;
export type ToEnum<O extends AnyObject> = O[keyof O];

export type Resolver = {
    Query?: {
        [key: string]: <Response>(parent: any, args: any, context: { user?: IUser }, info: any) => (Promise<Response> | Response) | any;
    }
    Mutation?: {
        [key: string]: <Response>(parent: any, args: any, context: { user?: IUser }, info: any) => (Promise<Response> | Response) | any;
    }
}