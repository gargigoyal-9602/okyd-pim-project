import FilteroptionsController, { Props } from "./FilteroptionsController";
export default class Filteroptions extends FilteroptionsController {
    constructor(props: Props);
    getBrands(item: any, index: any): JSX.Element;
    getCategory(item: any, index: any): JSX.Element;
    onCheck: (item: any, i: any) => void;
    onCheckCategory: (item: any, i: any) => void;
    searchFilterFunction: (text: any) => void;
    valueChange(value: any): void;
    valueChangeFinish(): void;
    render(): JSX.Element;
}
