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
    brandsData: object[];
    modulesData: object[];
    brandDetailsData: any;
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
export default class BrandsController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    getBrandApiCallId: string;
    brandDetailsApiCallId: string;
    brandCreateApiCallId: string;
    brandUpdateApiCallId: string;
    deleteBrandApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getBrandList: () => boolean;
    brandDetails: (accountId: number) => boolean;
    createBrand: (values: any) => boolean;
    updateBrand: (values: any) => boolean;
    deleteBrandHandler: (accountId: number) => boolean;
    updateActiveStatus: (brandId: number, active: boolean) => void;
    handleImageUpload: (event: any) => void;
    receive(from: string, message: Message): Promise<void>;
    onMenuToggle: () => void;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    handleSortingName: () => void;
    handleSortingDiscount: () => void;
}
export {};
