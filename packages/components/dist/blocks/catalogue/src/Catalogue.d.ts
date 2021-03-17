import CatalogueController, { Props } from "./CatalogueController";
export default class Catalogue extends CatalogueController {
    constructor(props: Props);
    getList(item: any): JSX.Element;
    render(): JSX.Element;
}
