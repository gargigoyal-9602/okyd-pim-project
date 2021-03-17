import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
}
interface SS {
    id: any;
}
export default class AuditTrailControllerWeb extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    getAllMembersApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    callGetAllMembersApi(): boolean;
}
export {};
