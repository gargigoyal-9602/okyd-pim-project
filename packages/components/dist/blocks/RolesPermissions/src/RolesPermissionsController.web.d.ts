import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    auth: string | null | undefined;
    trailType: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    userType: string;
    menuCollapsed: boolean;
    rolesData: object[];
    modulesData: object[];
    attributeData: object[];
    roleDetailsData: any;
    rolesUpdateModal: boolean;
    rolesCreateModal: boolean;
    checkbox: boolean;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    loader: boolean;
    sortOrder: any;
}
interface SS {
    id: any;
}
export default class RolesPermissionsControllerWeb extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    getRolesApiCallId: string;
    roleDetailsApiCallId: string;
    roleCreateApiCallId: string;
    getModulesApiCallId: string;
    deleteRoleApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getRolesList: () => boolean;
    roleDetails: (accountId: number) => boolean;
    getModulesList: () => boolean;
    createRole: (values: any) => boolean;
    deleteRolesHandler: (accountId: number) => boolean;
    receive(from: string, message: Message): Promise<void>;
    onMenuToggle: () => void;
    openUpdateRolesModalHandler: (accountId: number) => void;
    closeUpdateRolesModalHandler: () => void;
    openRolesModalHandler: () => void;
    closeRolesModalHandler: () => void;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    handleSortingRoleDataByName: () => void;
}
export {};
