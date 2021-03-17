import UserProfileBasicController, { Props } from "./UserProfileBasicController";
export default class UserProfileBasicBlock extends UserProfileBasicController {
    constructor(props: Props);
    render(): JSX.Element;
    componentDidMount(): Promise<void>;
}
