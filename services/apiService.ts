import {client} from "../apollo-client";
import {DocumentNode} from "@apollo/client";

export class apiService {
    static queryRequest(query: DocumentNode, variables?: any) {
        if (variables) {
            return client.query({
                query: query,
                variables: variables
            })
        } else {
            return client.query({
                query: query
            })
        }
    }

    static mutationRequest(query: DocumentNode, variables?: any) {
        if (variables) {
            return client.mutate({
                mutation: query,
                variables
            })
        } else {
            return client.mutate({
                mutation: query
            })
        }
    }
}