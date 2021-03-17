import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    memberDetails: any;
}
interface S {
    user_type: string;
    menuCollapsed: boolean;
    searchText: string | null | undefined;
    GeneralInformationSchema: any;
    ChangePasswordSchema: any;
    generalInformation: boolean;
    changePassword: boolean;
    fullname: string;
    designation: string;
    full_phone_number: string;
    email: string;
    address: string;
    country: string;
    companyName: string;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
    old_password_visible: boolean;
    new_password_visible: boolean;
    confirm_new_password_visible: boolean;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    auth: string | null | undefined;
}
interface SS {
    id: any;
}
export default class UserProfileSettingController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    userProfileApiCallId: string;
    userUpdateProfileApiCallId: string;
    userUpdateChangePassword: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    getUserProfileDetails: () => boolean;
    handleUpdateProfileDetails: (values: any) => boolean;
    handleUpdateChangePassword: (values: any) => boolean;
    onMenuToggle: () => void;
    handleGeneralInformation: () => void;
    handleChangePassword: () => void;
    handleOldPasswordVisible: () => void;
    handleNewPasswordVisible: () => void;
    handleConfirmNewPasswordVisible: () => void;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    handleCancel: () => void;
}
export {};
