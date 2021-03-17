import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
interface SelectOptions {
    value: string;
    label: string;
}
export interface Props {
    navigation: any;
    id: string;
    memberDetails: any;
}
interface S {
    auth: string | null | undefined;
    trailType: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    showFilterCalendar: boolean;
    userType: string;
    menuCollapsed: boolean;
    membersData: object[];
    allLogsData: object[];
    trailsOfTeamMemberData: any;
    memberDetailsModal: boolean;
    showLogsFilter: boolean;
    selectedEventTypeOption: SelectOptions | null;
    selectedResourceTypeOption: SelectOptions | null;
    searchText: string | null | undefined;
    memberListingLoader: boolean;
    logsListingLoader: boolean;
    trailDetailsLoader: boolean;
}
interface SS {
    id: any;
}
export default class AuditTrailControllerWeb extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    getAllMembersApiCallId: string;
    getAllLogsApiCallId: string;
    trailsOfTeamMemberApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getMembersList: () => boolean;
    getAllLogs: () => boolean;
    trailsOfTeamMember: (accountId: number) => boolean;
    receive(from: string, message: Message): Promise<void>;
    handleTrailType: (type: string) => void;
    hanldeOnChangeDate: (dates: any) => any;
    onCalendarClose: () => void;
    onCalendarOpen: () => void;
    onMenuToggle: () => void;
    openTrailViewDetailsModalHandler: (accountId: number) => void;
    closeTrailViewDetailsModalHandler: () => void;
    logsFilterHandler: () => void;
    handleEventTypeChange: (selectedOption: any) => void;
    handleResourceTypeChange: (selectedOption: any) => void;
}
export {};
