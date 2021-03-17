import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    arrayHolder: any;
    menuCollapsed: boolean;
    userType: string;
    token: string;
    displayProducts: any;
    allCheckboxStatus: any;
    addNewProductModal: any;
    addNewVariationModal: any;
    acceptedFiles: any;
    selectedFile: any;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    editor: any;
    brandData: object[];
    categoryData: object[];
    sortPricing: any;
    sortName: any;
    AddProductsSchema: any;
    NewVariationTypeSchema: any;
    productName: string;
    sku: string;
    brand: string;
    category: string;
    status: string;
    variationName: string;
    variationCode: string;
    friends: any;
}
interface SS {
    id: any;
}
export default class CatalogueController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    getProductListingApiCallId: any;
    getBrandListingApiCallId: any;
    getCategoryListingApiCallId: any;
    putActiveStatusOfProductApiCallId: any;
    catalogueCreateApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    getProductListing: () => boolean;
    getBrandListing: () => boolean;
    getCategoryListing: () => boolean;
    handleActiveStatusOfProduct: (value: any, id: any) => boolean;
    createCategory: (values: any) => boolean;
    getToken: () => void;
    handleCheckBox: (index: any, value: any) => void;
    handleToggle: (index: any, value: any) => void;
    onMenuToggle: () => void;
    handleToggleAddProductModal: () => void;
    handleToggleAddVariationModal: () => void;
    handleImageUpload: (event: any) => void;
    handleOnDrop: (file: any) => void;
    handleSortingName: () => void;
    handleSortingPricing: () => void;
}
export {};
