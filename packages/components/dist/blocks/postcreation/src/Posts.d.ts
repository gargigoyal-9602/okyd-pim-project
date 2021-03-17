import PostCreationController, { Props } from "./PostCreationController";
export default class Posts extends PostCreationController {
    constructor(props: Props);
    renderListItem: (item: any) => JSX.Element;
    renderViewAll: () => JSX.Element;
    render(): JSX.Element;
}
