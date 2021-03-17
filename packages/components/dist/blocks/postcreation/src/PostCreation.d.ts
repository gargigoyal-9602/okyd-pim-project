import PostCreationController from "./PostCreationController";
export interface Props {
    navigation: any;
}
export default class PostCreation extends PostCreationController {
    constructor(props: Props);
    render(): JSX.Element;
}
