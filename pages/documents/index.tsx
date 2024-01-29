import {FC} from "react";
import MainLayout from "@layouts/MainLayout";
import AuthProvider from "@hoc/AuthProvider";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";
import Documents from "@components/Documents";

const DocumentsPage: FC = () => {

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
                        <Breadcrumb href={"/documents"} label={"Документы"}/>
                    </Breadcrumbs>
                    <Documents />
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default DocumentsPage;