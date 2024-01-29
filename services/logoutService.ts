import {client} from "../apollo-client";

export class LogoutService {
    static resetStore = () => {
        client.resetStore()
            .then(() => {
                client.cache.reset()
                    .then(res => console.log(res))
            })
    }
}