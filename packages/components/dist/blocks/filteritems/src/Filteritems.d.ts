import FilteritemsController, { Props } from "./FilteritemsController";
export default class Filteritems extends FilteritemsController {
    constructor(props: Props);
    getList(item: any): JSX.Element;
    render(): JSX.Element;
}
