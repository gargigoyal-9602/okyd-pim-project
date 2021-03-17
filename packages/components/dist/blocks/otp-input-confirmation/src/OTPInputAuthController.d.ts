import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
export interface S {
    otp: string;
    otpAuthToken: string;
    userAccountID: string;
    labelInfo: string;
    toMessage: string;
    isFromForgotPassword: boolean;
}
export interface SS {
    id: any;
}
export default class OTPInputAuthController extends BlockComponent<Props, S, SS> {
    otpAuthApiCallId: any;
    btnTxtSubmitOtp: string;
    placeHolderOtp: string;
    labelInfo: string;
    submitButtonColor: any;
    constructor(props: Props);
    receive(from: String, message: Message): Promise<void>;
    submitOtp(): Promise<void>;
    btnSubmitOTPProps: {
        onPress: () => Promise<void>;
    };
    txtMobilePhoneOTPWebProps: {
        onChangeText: (text: string) => void;
    };
    txtMobilePhoneOTPMobileProps: {
        keyboardType: string;
        onChangeText: (text: string) => void;
    };
    txtMobilePhoneOTPProps: {
        onChangeText: (text: string) => void;
    };
}
