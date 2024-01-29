import {getMessaging, getToken} from 'firebase/messaging';
import 'firebase/messaging';
import firebase from 'firebase/compat/app';

const firebaseCloudMessaging = {
    getTokenFromStorage: async () => {
        return localStorage.getItem("fcm_token")
    },
    init: async function () {
            firebase.initializeApp({
                apiKey: process.env.NEXT_PUBLIC_API_KEY,
                authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
                messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
                appId: process.env.NEXT_PUBLIC_APP_ID,
                measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
            });
            try {
                const messaging = getMessaging();

                const status = await Notification.requestPermission();

                if (status && status === "granted") {
                    const fcm_token = await getToken(messaging,{
                        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
                    });
                    if (fcm_token) {
                        localStorage.setItem("fcm_token", fcm_token);
                        return fcm_token;
                    }
                } else {
                    localStorage.removeItem("fcm_token");
                }
            } catch (error) {
                localStorage.removeItem("fcm_token");
                console.error(error);
                return null;
            }
        }

}
export { firebaseCloudMessaging }