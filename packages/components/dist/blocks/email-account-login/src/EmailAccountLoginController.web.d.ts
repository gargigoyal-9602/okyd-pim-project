import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    password: string;
    email: string;
    enablePasswordField: boolean;
    checkedRememberMe: boolean;
    placeHolderEmail: string;
    placeHolderPassword: string;
    imgPasswordVisible: any;
    imgPasswordInVisible: any;
    labelHeader: string;
    btnTxtLogin: string;
    labelRememberMe: string;
    btnTxtSocialLogin: string;
    labelOr: string;
    errorEmail: string;
    errorPassword: string;
    domain: any;
    selectedDomain: string;
    EmailSchema: any;
    PasswordOnlySchema: any;
    EmailOnlySchema: any;
    inviteSchema: any;
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
    apiEmailCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    btnSocialLoginProps: {
        onClick: () => void;
    };
    btnPasswordShowHideProps: {
        onClick: () => void;
    };
    CustomCheckBoxProps: {
        onChange: (value: any) => void;
        isChecked: boolean;
    };
    btnForgotPasswordProps: {
        onClick: () => void;
    };
    txtInputPasswordProps: {
        onChange: (text: any) => void;
        secureTextEntry: boolean;
    };
    btnPasswordShowHideImageProps: {
        source: any;
    };
    btnSelectDominWebProps: {
        onChange: (text: any) => void;
    };
    btnRememberMeProps: {
        onClick: (evt: any) => void;
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
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    sendLoginFailMessage(): void;
    sendLoginSuccessMessage(): void;
    saveLoggedInUserData(responseJson: any): void;
    openInfoPage(): void;
    goToForgotPassword(): void;
    goToSocialLogin(): void;
    doEmailLogIn: (values: any) => Boolean;
    handleEmailLogin: (values: any) => Boolean;
    handleDomainSelection(): Boolean;
    callGetValidationApi(): void;
}
export {};
