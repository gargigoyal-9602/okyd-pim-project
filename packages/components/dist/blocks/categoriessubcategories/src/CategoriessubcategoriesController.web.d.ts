import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    match: any;
}
interface S {
    auth: string | null | undefined;
    userType: string;
    menuCollapsed: boolean;
    categoryData: object[];
    modulesData: object[];
    categoryDetailsData: any;
    rolesUpdateModal: boolean;
    checkbox: boolean;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    loader: boolean;
    selectedFile: any;
    editor: any;
    sortDiscount: any;
    sortName: any;
}
interface SS {
    id: any;
}
export default class CategoriessubcategoriesController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    getCategoryApiCallId: string;
    categoryDetailsApiCallId: string;
    categoryCreateApiCallId: string;
    categoryUpdateApiCallId: string;
    deleteCategoryApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getCategoryList: () => boolean;
    categoryDetails: (accountId: number) => boolean;
    createCategory: (values: any) => boolean;
    updateCategory: (values: any) => boolean;
    deleteCategoryHandler: (accountId: number) => boolean;
    updateActiveStatus: (catId: number, active: boolean) => void;
    handleImageUpload: (event: any) => void;
    receive(from: string, message: Message): Promise<void>;
    onMenuToggle: () => void;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    handleSortingName: () => void;
    handleSortingDiscount: () => void;
}
export {};
