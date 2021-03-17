import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
export declare const configJSON: any;
export interface Props {
    navigation: any;
}
interface S {
    accountType: string;
    emailSchema: any;
    phoneSchema: any;
    otpSchema: any;
    passwordSchema: any;
    accountStatus: any;
    passwordRules: any;
    emailValue: any;
    phoneValue: any;
    countryCodeSelected: any;
    token: any;
    enablePasswordField: Boolean;
    btnConfirmPasswordShowHide: Boolean;
}
interface SS {
    navigation: any;
}
export default class ForgotPasswordController extends BlockComponent<Props, S, SS> {
    validationAPICallId: any;
    requestEmailOtpCallId: any;
    requestPhoneOtpCallId: any;
    requestChangePasswordCallId: any;
    requestGoToConfirmationCallId: any;
    otpToken: any;
    isChangePassword: boolean;
    labelTextIsAccountRecovery: string;
    secondLabelText: string;
    thirdLabelText: string;
    forthLabelText: string;
    fifthLabelText: string;
    sixthLabelText: string;
    firstInputAutoCompleteType: any;
    firstInputKeyboardStyle: any;
    firstInputPlaceholder: string;
    firstInputErrorColor: any;
    buttonTextIsNext: string;
    buttonColorForNextButton: any;
    secondInputAutoCompleteType: any;
    secondInputKeyboardType: any;
    secondInputPlaceholder: string;
    secondInputErrorColor: any;
    thirdInputPlaceholder: string;
    thirdInputErrorColor: any;
    buttonTitleIsSMSPhoneAccount: string;
    buttonTitleIsEmailAccount: string;
    labelTextIsPleaseEnterYourNewPassword: string;
    labelTextIsYourPasswordHasBeenSuccessfullyChanged: string;
    placeholderIsPassword: string;
    passwordVisibleImage: any;
    passwordInvisibleImage: any;
    placeholderIsReTypePassword: string;
    buttonTitleIsOk: string;
    buttonColorForOkButton: any;
    countryCodeSelectorPlaceholder: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    validationRulesRequest: () => void;
    receive(from: string, message: Message): Promise<void>;
    startForgotPassword(accountType: String): void;
    goToOtpAfterEmailValidation(values: {
        accountType: string;
        email: string;
    }): void;
    goToOtpAfterPhoneValidation(values: {
        phone: string;
    }): void;
    goToChangePasswordAfterOtp(values: {
        otpCode: string;
    }): void;
    goToConfirmationAfterPasswordChange(values: {
        password: any;
        confirmPassword: any;
    }): void;
    goToHome(): void;
    goToLogin(): void;
}
export {};
