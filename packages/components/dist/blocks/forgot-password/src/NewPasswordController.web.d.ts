import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    email: string;
    errorEmail: string;
    password: string;
    errorPassword: string;
    confirmPassword: string;
    errorConfirmPassword: string;
    EmailOnlySchema: any;
    NewPasswordSchema: any;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
}
interface SS {
    id: any;
}
export default class EmailAccountLoginController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    apiPasswordCallId: string;
    apiForgotCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    txtInputPasswordWebProps: {
        onChange: (text: any) => void;
    };
    txtInputConfirmPasswordWebProps: {
        onChange: (text: any) => void;
    };
    txtInputEmailWebProps: {
        onChange: (text: any) => void;
    };
    txtInputEmailMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChange: (text: any) => void;
    };
    txtInputEmailProps: {
        onChange: (text: any) => void;
    };
    receive(from: string, message: Message): Promise<void>;
    sendLoginFailMessage(): void;
    saveLoggedInUserData(responseJson: any): void;
    openInfoPage(): void;
    goToForgotPassword(): void;
    goToSocialLogin(): void;
    createNewPassword: (values: any) => Boolean;
    callGetValidationApi(): void;
    handleForgotPassword: (values: any) => Boolean;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
}
export {};
