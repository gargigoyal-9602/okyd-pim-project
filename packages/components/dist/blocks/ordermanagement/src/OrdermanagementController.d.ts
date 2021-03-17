import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    orders: any;
    isCancelVisible: boolean;
    isRateVisible: boolean;
    cancelDialog: boolean;
    starCount: number;
    comment: string;
    token: string;
    itemDetail: any;
    activeOrderId: number;
    activeItemId: number;
    activeAddress: any;
}
interface SS {
    id: any;
}
export default class OrdermanagementController extends BlockComponent<Props, S, SS> {
    getOrdersAPICallId: any;
    getItemDetailAPICallId: any;
    cancelOrderAPICallId: any;
    rateOrderAPICallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    receive(from: string, message: Message): Promise<void>;
    cancelOrder: (orderId: number, itemId: number) => void;
    rateOrder: () => void;
    hideCancelModal: () => void;
    selectCancel: () => void;
    getOrdersDataRequest: (token: string) => void;
    getItemDetailDataRequest: (id: number) => boolean;
    cancelOrderDataRequest: () => boolean;
    rateOrderDataRequest: (id: number) => boolean;
}
export {};
