import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    menuCollapsed: boolean;
    acceptedFiles: any;
}
interface SS {
    id: any;
}
export default class CatalogueImageController extends BlockComponent<Props, S, SS> {
    constructor(props: Props);
    onMenuToggle: () => void;
    handleOnDrop: (file: any) => void;
}
export {};
