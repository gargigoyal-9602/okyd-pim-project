import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    token: string;
    data: any;
    arrayHolder: any;
}
interface SS {
    id: any;
}
export default class FilteritemsController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    navigateToFilter: () => void;
    receive(from: string, message: Message): Promise<void>;
    getListRequest: (token: any) => void;
}
export {};
