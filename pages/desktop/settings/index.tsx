import {FC} from "react";
import MainLayout from "@layouts/MainLayout";
import House from "@components/Desktop/Settings/House";
import AuthProvider from "@hoc/AuthProvider";
import dynamic from "next/dynamic";

let Profile = dynamic(() => import("@components/Desktop/Settings/Profile"), {ssr: false});

const Settings: FC = () => {
    return (
        <AuthProvider>
            <MainLayout>
                <Profile/>
                {/*<House/>*/}
            </MainLayout>
        </AuthProvider>
    )
}

export default Settings