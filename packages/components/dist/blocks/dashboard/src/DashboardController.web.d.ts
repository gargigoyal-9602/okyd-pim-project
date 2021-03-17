import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    dashboardData: any;
    token: string;
    errorMsg: string;
    loading: boolean;
}
interface SS {
    id: any;
}
export default class DashboardController extends BlockComponent<Props, S, SS> {
}
export {};
