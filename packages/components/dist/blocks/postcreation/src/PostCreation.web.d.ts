import PostCreationController from "./PostCreationController.web";
export interface Props {
    navigation: any;
}
export default class PostCreation extends PostCreationController {
    constructor(props: Props);
    render(): JSX.Element;
}
