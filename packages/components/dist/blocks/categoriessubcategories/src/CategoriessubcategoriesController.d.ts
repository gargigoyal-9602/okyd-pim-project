import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    token: string;
    categoriesArray: any;
    category: string;
    subCategory: string;
    isVisible: boolean;
    dropdownCategoryStatus: boolean;
    activeModalType: string;
    selectedCategoryID: any;
}
interface SS {
    id: any;
}
export default class CategoriessubcategoriesController extends BlockComponent<Props, S, SS> {
    getCategoriesApiCallId: any;
    deleteCategoriesApiCallId: any;
    deleteSubCategoriesApiCallId: any;
    addCategoryApiCallId: any;
    addSubCategoryApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    receive(from: string, message: Message): Promise<void>;
    setCategoryTxt: (text: string) => void;
    setSubCategoryTxt: (text: string) => void;
    clickCategory: (item: any, Index: number) => void;
    toggleModal: (type: string) => void;
    expandCategoryView: () => void;
    expand: (id: string) => void;
    isStringNullOrBlank(str: string): boolean;
    addCategory: () => boolean;
    addSubCategory: () => boolean;
    deleteCategories: (id: number) => boolean;
    deleteSubCategories: (id: number) => boolean;
    getCategories: (token: string) => void;
}
export {};
