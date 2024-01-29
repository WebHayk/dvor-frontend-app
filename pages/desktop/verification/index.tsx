import {FC, memo, useEffect, useState} from "react";
import MainLayout from "@layouts/MainLayout";
import Section from "@ui/Section";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import AuthProvider from "@hoc/AuthProvider";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";
import {useQuery} from "@apollo/client";
import {USER_VERIFICATION_REQUESTS} from "@api/query/query";
import {Simulate} from "react-dom/test-utils";
import {VerificationRequestModel} from "@typescript/interfaces";
import useActions from "@hooks/useActions";

const VerificationTab = dynamic(() => import("@components/Desktop/Verification/VerificationTab"), {
    ssr: false
});
const VerificationCheck = dynamic(() => import("@components/Desktop/Verification/VerificationCheck"), {
    ssr: false
});

const Verification: FC = memo(() => {

    const state = useMainSelector();
    let {setGloballyUpdateStateAction} = useActions();
    const verificationRequests = useQuery(USER_VERIFICATION_REQUESTS);
    let [verificationRequest, setVerificationRequest] = useState<VerificationRequestModel>();

    useEffect(() => {
        verificationRequests.refetch()
            .then(response => {
                let {user_verification_requests} = response.data;

                if (user_verification_requests.length) {
                    setVerificationRequest(user_verification_requests[0]);
                }

                if (state.isUpdate) {
                    setGloballyUpdateStateAction(false);
                }
            })
            .catch(error => console.log(error))
    }, [state.isUpdate]);

    return (
        <AuthProvider>
            <MainLayout>
                <Breadcrumbs>
                    <Breadcrumb href={"/desktop"} label={"Главная"}/>
                    <Divider/>
                    <Breadcrumb href={"/desktop/verification"} label={"Верификация"}/>
                </Breadcrumbs>
                <Section
                    title={"Верификация"}
                    description={"Ты можешь пройти верификацию двумя способами"}
                >
                    {
                        verificationRequest
                        ?
                        verificationRequest.is_success != null && !state.profile?.user.is_verified
                        ?
                        <VerificationTab/>
                        :
                        <VerificationCheck verificationRequest={verificationRequest}/>
                        :
                        null
                    }
                </Section>
            </MainLayout>
        </AuthProvider>
    )
});

Verification.displayName = "Verification";

export default Verification