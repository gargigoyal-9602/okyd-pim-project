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
    subCategoryData: object[];
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
export default class SubCategoriesController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    getCategoryApiCallId: string;
    getSubCategoryApiCallId: string;
    subCategoryDetailsApiCallId: string;
    subCategoryCreateApiCallId: string;
    subCategoryUpdateApiCallId: string;
    deleteSubCategoryApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getCategoryList: () => boolean;
    getSubCategoryList: () => boolean;
    categoryDetails: (subCatId: number) => boolean;
    createSubCategory: (values: any) => boolean;
    updateSubCategory: (values: any) => boolean;
    deleteSubCategoryHandler: (subCatId: number) => boolean;
    updateActiveStatus: (subCatId: number, active: boolean) => void;
    handleImageUpload: (event: any) => void;
    receive(from: string, message: Message): Promise<void>;
    onMenuToggle: () => void;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    handleSortingName: () => void;
    handleSortingDiscount: () => void;
}
export {};
