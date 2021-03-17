import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    firstName: any;
    lastName: any;
    email: any;
    phoneNumber: any;
    currentCountryCode: any;
    data: any[];
    passwordHelperText: String;
    enablePasswordField: boolean;
    enableReTypePasswordField: boolean;
    enableNewPasswordField: boolean;
    edtEmailEnabled: boolean;
    llDoChangePwdContainerVisible: boolean;
    llChangePwdDummyShowContainerVisible: boolean;
    currentPasswordText: any;
    newPasswordText: any;
    reTypePasswordText: any;
    edtMobileNoEnabled: boolean;
    countryCodeEnabled: boolean;
    saveButtonDisable: boolean;
}
interface SS {
    id: any;
}
export default class UserProfileBasicController extends BlockComponent<Props, S, SS> {
    labelFirstName: string;
    lastName: string;
    labelArea: string;
    labelMobile: string;
    labelEmail: string;
    labelCurrentPassword: string;
    labelNewPassword: string;
    labelRePassword: string;
    btnTextCancelPasswordChange: string;
    btnTextSaveChanges: string;
    labelHeader: any;
    btnTextChangePassword: string;
    arrayholder: any[];
    passwordReg: RegExp;
    emailReg: RegExp;
    apiCallMessageUpdateProfileRequestId: any;
    validationApiCallId: string;
    apiChangePhoneValidation: any;
    registrationAndLoginType: string;
    authToken: any;
    uniqueSessionRequesterId: any;
    userProfileGetApiCallId: any;
    userAttr: any;
    constructor(props: Props);
    receive(from: String, message: Message): Promise<void>;
    validateMobileAndThenUpdateUserProfile(): void;
    validateEmail(email: string): any;
    validateLastName(lastName: String): string | null;
    validateFirstName(firstName: String): string | null;
    validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string): any;
    validateAndUpdateProfile(): false | undefined;
    validateCurrentPwd(currentPwd: any): any;
    validatePassword(newPwd: any): any;
    validateRePassword(reTypePwd: any): any;
    isNonNullAndEmpty(value: String): boolean;
    validateMobileOnServer(countryCode: any, mobileNo: any): void;
    enableDisableEditPassword(isEditable: boolean): void;
    goToPrivacyPolicy(): void;
    goToTermsAndCondition(): void;
    isStringNullOrBlank(str: string): boolean;
    isValidEmail(email: string): boolean;
    requestSessionData(): void;
    getUserProfile(): void;
    getValidations(): void;
    txtInputFirstNameProps: {
        onChangeText: (text: string) => void;
    };
    txtInputLastNameProps: {
        onChangeText: (text: string) => void;
    };
    txtInputPhoneNumberlWebProps: {
        onChangeText: (text: string) => void;
        editable: boolean;
    };
    txtInputPhoneNumberlMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
        editable: boolean;
    };
    txtInputPhoneNumberProps: {
        onChangeText: (text: string) => void;
        editable: boolean;
    };
    txtInputEmailWebProps: {
        value: string;
        editable: boolean;
        onChangeText: (text: string) => void;
    };
    txtInputEmailMobileProps: {
        keyboardType: string;
        value: string;
        editable: boolean;
        onChangeText: (text: string) => void;
    };
    txtInputEmailProps: {
        value: string;
        editable: boolean;
        onChangeText: (text: string) => void;
    };
    btnEnableEditPasswordProps: {
        onPress: () => void;
    };
    txtInputCurrentPasswordProps: {
        onChangeText: (text: string) => void;
        value: string;
        secureTextEntry: boolean;
    };
    btnPasswordShowHideButtonProps: {
        onPress: () => void;
    };
    imgPasswordShowhideProps: {
        source: any;
    };
    txtInputNewPasswordProps: {
        onChangeText: (text: string) => void;
        value: string;
        secureTextEntry: boolean;
    };
    btnNewPasswordShowHideButtonProps: {
        onPress: () => void;
    };
    imgNewPasswordShowhideProps: {
        source: any;
    };
    txtInputReTypePasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
        value: string;
    };
    imgReTypePasswordShowhideProps: {
        source: any;
    };
    btnReTypePasswordShowHideProps: {
        onPress: () => void;
    };
    btnDisableEditPasswordProps: {
        onPress: () => void;
    };
}
export {};
