import "react-datepicker/dist/react-datepicker.css";
/**
 * Contaroller
 */
import AuditTrailController, { Props } from "./AuditTrailController.web";
export declare const configJSON: any;
export default class AuditTrail extends AuditTrailController {
    constructor(props: Props);
    openModalHandler: (accountId: number) => void;
    closeModalHandler: () => void;
    auditTrailListRow: (memberDetails: any) => JSX.Element;
    render(): JSX.Element;
}
