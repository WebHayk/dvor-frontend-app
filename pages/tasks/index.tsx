import {FC, Suspense} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import {useMainSelector} from "@store/selectors";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import dynamic from "next/dynamic";

let TasksComponent = dynamic(() => import("@components/Tasks"), {
    suspense: true
});

const Tasks: FC = () => {

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
                        <Breadcrumb href={"/"} label={"Главная"}/>
                        <Divider/>
                        <Breadcrumb href={"/tasks"} label={"Задачи"}/>
                    </Breadcrumbs>
                    <Suspense fallback={"Загрузка.."}>
                        <TasksComponent/>
                    </Suspense>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default Tasks;