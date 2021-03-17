import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    outOfStock: boolean;
    pricerange: boolean;
    brand: boolean;
    category: boolean;
    tag: boolean;
    checkedStock: boolean;
    checkedDiscounted: boolean;
    checkedBrand: any;
    rangeLow: any;
    rangeHigh: any;
    value: any;
    token: string;
    data: any;
    checkedCategory: boolean;
    checkedTag: boolean;
    GetAllBrand: any;
    BrandList: any;
    selectedItems: any;
    selectedCategory: any;
    scrollEnabled: boolean;
    minValue: any;
    maxValue: any;
    priceMin: any;
    priceMax: any;
    price: any;
    arrayHolder: any;
    categoryArray: any;
    catHolder: any;
}
interface SS {
    id: any;
}
export default class FilteroptionsController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    getBrandApiCallId: any;
    applyAllApiCallId: any;
    constructor(props: Props);
    valueChange(value: any): void;
    openFilter(value: any): void;
    componentDidMount(): Promise<void>;
    getToken: () => void;
    getListRequest: (token: any) => void;
    getBrandList: (token: any) => void;
    applyAllfilters: () => void;
    receive(from: string, message: Message): Promise<void>;
}
export {};
