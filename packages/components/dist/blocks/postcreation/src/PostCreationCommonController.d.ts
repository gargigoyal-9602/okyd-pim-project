import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
}
interface S {
    PostData: any;
    token: string;
    name: string;
    description: string;
    price: any;
    currency: string;
    category_id: string;
    image: any;
    uploadedImages: any;
    AllCategory: any;
    id: any;
    refresh: boolean;
    file: any;
    profileImageData: any;
}
interface SS {
    id: any;
}
export default class PostCreationCommonController extends BlockComponent<Props, S, SS> {
    apiPostItemCallId: string;
    apiGetCategoryCallID: string;
    PostApiCallId: string;
    DeleteApiCallId: any;
    addpostApiCallId: any;
    updatePostApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    createPostCreation(): void;
    editNavigation: (item: any) => void;
    navigateToDetails: (item: any) => void;
    AddPostCreation(): boolean;
    getAllCategory(): boolean;
    getPostData(): boolean;
    updateCreatePostData(Id: any): boolean;
    deleteRecord(Id: any): void;
    delete(Id: any): boolean;
    txtInputProductNameProps: {
        onChangeText: (text: string) => void;
    };
    txtInputProductDiscripationProps: {
        onChangeText: (text: string) => void;
    };
    ImageData: {
        onChangeText: (text: string) => void;
    };
    DropDownProps: {
        onChangeText: (text: string) => void;
    };
    txtInputProductPriceProps: {
        onChangeText: (text: string) => void;
    };
    chooseImage: () => void;
    valueExtractor1: (val: {
        data: {
            attributes: {
                id: any;
            };
        };
    }) => any;
    onValueHanndler: (val: {
        data: {
            attributes: {
                name: any;
            };
        };
    }) => any;
}
export {};
