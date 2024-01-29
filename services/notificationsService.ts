import {firebaseCloudMessaging} from "@common/firebase/config";

export class NotificationsService {
    static init = () => {
        return firebaseCloudMessaging.init();
    }

    static initHandler = () => {
        this.init()
            .then(() => {
                console.log("Init! Success!");
            })
            .catch(error => console.log(error))
    }
}