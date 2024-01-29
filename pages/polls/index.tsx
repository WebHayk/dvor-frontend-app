import {FC, Suspense} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const Polls = dynamic(() => import("@components/Polls"), {
    suspense: true
});

const PollsPage: FC = () => {

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
                        <Breadcrumb href={"/desktop"} label={"Главная"} />
                        <Divider />
                        <Breadcrumb href={"/polls"} label={"Голосования"} />
                    </Breadcrumbs>
                    <Suspense fallback={"Загрузка.."}>
                        <Polls />
                    </Suspense>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default PollsPage;