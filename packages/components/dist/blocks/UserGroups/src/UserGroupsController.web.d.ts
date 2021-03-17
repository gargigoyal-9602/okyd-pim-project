import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    memberDetails: any;
}
interface S {
    currentId: any;
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    trailType: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    showFilterCalendar: boolean;
    userType: string;
    menuCollapsed: boolean;
    membersData: object[];
    getTeamMembetList: object[];
    trailsOfTeamMemberData: any;
    memberDetailsModal: boolean;
    showLogsFilter: boolean;
    selectedEventTypeOption: SelectOptions | null;
    selectedResourceTypeOption: SelectOptions | null;
    searchText: string | null | undefined;
    TeamMemberSchema: any;
    firstName: string;
    designation: string;
    phone: string;
    email: string;
    rolesGroup: any;
    rolesGroupName: any;
    inviteMemberDetailModal: boolean;
    rolesList: any;
    company_name: any;
    address: any;
    country: any;
    teamMemberOkyd: any;
    natureOfBussiness: any;
    clientTarget: any;
    role_ids: any;
    snackBar: {
        show: boolean;
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
    };
    sortName: any;
}
interface SelectOptions {
    value: string;
    label: string;
}
interface SS {
    id: any;
}
export default class UserGroupsController extends BlockComponent<Props, S, SS> {
    getAllMembersApiCallId: string;
    getTeamMemberApiCallId: string;
    trailsOfTeamMemberApiCallId: string;
    deleteTeamMemberApiCallId: string;
    inviteTeamMemberApiCallId: string;
    updateTeamMemberApiCallId: string;
    rolesListingApiCallId: string;
    resendinviteTeamMemberApiCallId: string;
    constructor(props: Props);
    getTeamMember: () => boolean;
    getRolesList: () => boolean;
    openSnackBarHandler: (type: "success" | "info" | "warning" | "error" | undefined, message: string) => void;
    closeSnackBarHandler: () => void;
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    txtInputWebProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    doButtonPressed(): void;
    handleEventTypeChange: (selectedOption: any) => void;
    handleResourceTypeChange: (selectedOption: any) => void;
    hanldeOnChangeDate: (dates: any) => any;
    onCalendarOpen: () => void;
    logsFilterHandler: () => void;
    handleTrailType: (type: string) => void;
    onMenuToggle: () => void;
    openTrailViewDetailsModalHandler: () => void;
    closeTrailViewDetailsModalHandler: () => void;
    openInviteTeamMemberModalHandler: () => void;
    closeInviteTeamMemberModalHandler: () => void;
    openEditTeamMemberModalHandler: () => void;
    getTeamMemberbyId: (accountId: number) => boolean;
    updateTeamMemberbyId: (values: any) => boolean;
    deleteTeamMemberbyId: (memberDetail: any) => boolean;
    handleInviteTeamMember: (values: any) => boolean;
    handleResentInviteTeamMember: () => boolean;
    handleEditTeamMember: (memberDetail: any) => boolean;
    handleSortingName: () => void;
}
export {};
