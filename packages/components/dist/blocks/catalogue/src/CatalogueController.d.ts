import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    arrayHolder: any;
    token: string;
}
interface SS {
    id: any;
}
export default class CatalogueController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    getListRequest: (token: any) => void;
    receive(from: string, message: Message): Promise<void>;
}
export {};
