import {FC, memo} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Statement from "@components/Bank/Statement";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";

const StatementPage: FC = memo(({bank}: any) => {

    let state = useMainSelector();
    let isProfileVerified = state.profile?.user.is_verified;

    return (
        <AuthProvider>
            <RoleScreenProvider
                roles={["senior"]}
                isProfileVerified={isProfileVerified}
            >
                <MainLayout>
                    <Statement />
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
});

StatementPage.displayName = "StatementPage";

export default StatementPage;