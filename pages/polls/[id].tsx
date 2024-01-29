import {FC, memo, Suspense} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const Poll = dynamic(() => import("@components/Polls/Poll"), {
    suspense: true
});

const PollPage: FC = memo(() => {

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
                        <Breadcrumb href={"/polls"} label={"Голосования"}/>
                    </Breadcrumbs>
                    <Suspense fallback={"Загрузка.."}>
                        <Poll/>
                    </Suspense>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
});

PollPage.displayName = "PollPage";

export default PollPage