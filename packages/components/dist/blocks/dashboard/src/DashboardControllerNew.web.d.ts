import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    dashboardData: any;
    token: string;
    errorMsg: string;
    loading: boolean;
    user_type: string;
    menuCollapsed: boolean;
    searchText: string | null | undefined;
    message: string;
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
export default class DashboardController extends BlockComponent<Props, S, SS> {
    userDashboardApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    getDashboardDetails: () => boolean;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    onMenuToggle: () => void;
}
export {};
