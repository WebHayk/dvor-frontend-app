import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloLink,
    concat, split
} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws';
import {onError} from "@apollo/client/link/error";
import {REST_MESSAGES_TYPES} from "@typescript/enums";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_REST_ENDPOINT,
    includeExtensions: true,
    headers: {
        "content-type": "application/json"
    }
});

const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_SOCKET_ENDPOINT as string,
    lazy: true,
    retryAttempts: 100,
    shouldRetry: () => false,
    connectionParams: () => {
        return {
            headers: {
                "content-type": "application/json",
                Authorization: localStorage.getItem("token"),
            }
        }
    }
})) : null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, extensions }) => {
            if (extensions?.code != REST_MESSAGES_TYPES.VALIDATION_FAILED) {
                alert(message);
            } else {
                console.error(message);
            }
        });
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: typeof window !== "undefined" ? localStorage.getItem("token") : null
        }
    }));

    return forward(operation);
});

const splitLink = typeof window !== "undefined" ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink as ApolloLink,
    concat(authMiddleware, httpLink)
) : concat(authMiddleware, httpLink);

export const client = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: errorLink.concat(splitLink)
});
