import { FunctionComponent } from "react";
interface Props {
    onSelectDate: (selectedDate: string) => void;
    selectDate?: any;
    testID: string;
}
declare const GenericCalendarList: FunctionComponent<Props>;
export default GenericCalendarList;
