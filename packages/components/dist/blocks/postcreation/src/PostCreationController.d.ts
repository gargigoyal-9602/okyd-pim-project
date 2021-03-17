import PostCreationCommonController from './PostCreationCommonController';
export declare const configJSON: any;
export interface Props {
    navigation: any;
}
export default class PostCreationController extends PostCreationCommonController {
    componentDidMount(): Promise<void>;
    chooseImage: () => void;
}
