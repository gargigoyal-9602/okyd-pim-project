import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
export interface S {
    fullName: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    userType: string;
    domainName: string;
    address: string;
    country: string;
    teamMemberOkyd: string;
    natureOfBussiness: string;
    clientTarget: string;
    errorMandatory: string;
    errorEmail: string;
    errorCompanyName: string;
    errorDomainName: string;
    errorFullName: string;
    errorPhnNumber: string;
    errorAddress: string;
    errorCountry: string;
    activated: boolean;
    NewAccSchema: any;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    domainNameSuccessSymbol: any;
}
export interface SS {
    id: any;
}
export default class EmailAccountRegistrationController extends BlockComponent<Props, S, SS> {
    arrayholder: any[];
    passwordReg: RegExp;
    emailReg: RegExp;
    stringReg: RegExp;
    phoneReg: RegExp;
    numberReg: RegExp;
    createAccountApiCallId: any;
    createNewAccountApiCallId: any;
    validationApiCallId: string;
    domainAvailabilityApiCallId: string;
    imgPasswordVisible: any;
    imgPasswordInVisible: any;
    labelHeader: any;
    labelFirstName: string;
    lastName: string;
    labelEmail: string;
    labelPassword: string;
    labelRePassword: string;
    labelLegalText: string;
    labelLegalTermCondition: string;
    labelLegalPrivacyPolicy: string;
    btnTextSignUp: string;
    domainNameSuccessSymbol: boolean;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    goToPrivacyPolicy(): void;
    goToTermsAndCondition(): void;
    isStringNullOrBlank(str: string): boolean;
    isValidEmail(email: string): boolean;
    createAccount: (values: any) => boolean;
    getValidations(): void;
    domainAvailability: (domainValue: any) => boolean;
    isNonNullAndEmpty(value: String): boolean;
    validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string): any;
    btnLegalPrivacyPolicyProps: {
        onClick: () => void;
    };
    btnLegalTermsAndConditionProps: {
        onClick: () => void;
    };
    txtInputEmailWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputEmailMobilePrpos: {
        keyboardType: string;
        onChange: (text: any) => void;
    };
    txtInputEmailPrpos: {
        onChange: (text: any) => void;
    };
    txtInputCompanyNameWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputDomainNameWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputFullNameWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputPhoneNumberWebPrpos: {
        onChange: (text: Number) => void;
    };
    txtInputAddressWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputCountryWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputTeamOkydWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputNatureofBussinessWebPrpos: {
        onChange: (text: any) => void;
    };
    txtInputTargetClientWebPrpos: {
        onChange: (text: any) => void;
    };
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
}
