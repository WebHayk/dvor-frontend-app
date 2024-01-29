import MainLayout from "@layouts/MainLayout";
import {Suspense} from "react";
import styles from "./styles.module.scss";
import AuthProvider from "@hoc/AuthProvider";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("@components/Desktop/Main"), {
    ssr: false
});
const Events = dynamic(() => import("@components/Desktop/Events"), {
    suspense: true
});

const Desktop = () => {
    return (
        <AuthProvider>
            <RoleScreenProvider
                isProfileVerified={"all"}
                roles={["resident", "owner", "spokesman"]}
            >
                <MainLayout>
                    <div className={styles.Desktop}>
                        <Main/>
                        <Suspense fallback={"Загрузка.."}>
                            <Events/>
                        </Suspense>
                    </div>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default Desktop
