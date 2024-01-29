import {FC} from "react";
import MainLayout from "@layouts/MainLayout";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import VideoObservingComponent from "@components/VideoObserving";
import Breadcrumbs from "@ui/Breadcrumbs";
import AuthProvider from "@hoc/AuthProvider";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";

const VideoObserving: FC = () => {

    let state = useMainSelector();
    let isProfileVerified = state.profile?.user.is_verified;

    return (
        <AuthProvider>
            <RoleScreenProvider
                roles={["owner", "senior", "spokesman", "resident"]}
                isProfileVerified={isProfileVerified}
            >
                <MainLayout>
                    <Breadcrumbs>
                        <Breadcrumb href={"/desktop"} label={"Главная"}/>
                        <Divider/>
                        <Breadcrumb href={"/video-observing"} label={"Видеонаблюдение"}/>
                    </Breadcrumbs>
                    <VideoObservingComponent/>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default VideoObserving