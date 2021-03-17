import React from "react";
/**
 * Components
 */
import Moment from "moment";
import DatePicker from "react-datepicker";
import Modal from "../../../components/src/GenericModal.web";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Contaroller
 */
import AuditTrailController, { Props } from "./AuditTrailController.web";
/**
 * Assets
 */
import {
  membersIcon,
  logsIcon,
  membersActiveIcon,
  logsActiveIcon,
  teamManagementIcon,
  auditTrailIcon,
  accountSettingsIcon,
  purchaseSettingsIcon,
  logOutIcon,
  refreshIcon,
  filtersIcon,
  userIcon,
  viewIcon,
  lastLogIcon,
  clearFilterIcon,
  fillterPrimaryIcon,
} from "./assets";

export const configJSON = require("./config");

export default class AuditTrail extends AuditTrailController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  openModalHandler = (accountId: number): void => {
    this.trailsOfTeamMember(accountId);
    this.setState({memberDetailsModal: true});
  };

  closeModalHandler = () => {
    this.setState({memberDetailsModal: false});
  };
  
  // Audit Trail Row
  auditTrailListRow = (memberDetails: any) => {
    return (
      <React.Fragment>
        {/* List row */}
        <div className="at-list-row grid-cols-adminMemberListLayout">
          <div className="at-list-col">
            <img src={userIcon} alt="" className="h-12" />
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value font-bold">
              {memberDetails?.attributes?.account_detail?.name}
            </h4>
            <p className="at-col-title">{configJSON.designationText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{memberDetails?.attributes?.account_detail?.email}</h4>
            <p className="at-col-title">{configJSON.emailText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{memberDetails?.attributes?.activity}</h4>
            <p className="at-col-title">{configJSON.trailsText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{Moment(memberDetails?.attributes?.created_at).format("ddd DD-MMM-YYYY, hh:mm A")}</h4>
            <p className="at-col-title">{configJSON.lastLogText}</p>
          </div>
          {/* View Details */}
          <div className="at-list-col text-right">
            <button
              type="button"
              className="op-btn-primary-transparent font-black flex items-center ml-auto"
              onClick={() => this.openModalHandler(memberDetails?.attributes?.account_id)}
            >
              <img src={viewIcon} alt="View Details" className="h-3 mr-1" />
            </button>
          </div>
        </div>
        {/* View Details Modal */}
        <Modal visible={this.state.memberDetailsModal} onClose={this.closeModalHandler}>
          <div className="flex items-center mb-10">
            <img src={lastLogIcon} alt="" className="mr-3 h-5" />
            <span className="text-primary-light-sm font-bold">
              {/* TODO: @akash */}
              Last log at 12/12/2020 12:00 PM
            </span>
          </div>
          <div className="flex items-end justify-between pb-4 mb-4 border-b border-light-300">
            <div>
              <h4 className="text-xl text-secondary-base font-bold">
                Trail for {this.state.trailsOfTeamMemberData.name}
              </h4>
              <p className="text-primary-light-sm">Total {this.state.trailsOfTeamMemberData.count} logs</p>
            </div>
            <div className="flex items-center">
              <button type="button" className="op-btn-transparent mr-3">
                <img src={clearFilterIcon} alt="Clear Filter" className="h-9" />
              </button>
              <button type="button" className="op-btn-transparent">
                <img src={fillterPrimaryIcon} alt="Filter" className="h-9" />
              </button>
            </div>
          </div>
          {/* Members List */}
          <div className="at-list px-0">
            {/* Trail Row */}
            {this.state.trailsOfTeamMemberData.data && (
              <>
                {this.state.trailsOfTeamMemberData.data.map(
                  (log: any, index: number) => {
                    return (
                      <div className="at-list-row grid-cols-adminMemberTrailLayout" key={String(index)}>
                        <div className="at-list-col">
                          <h4 className="at-col-value font-bold">
                            {log?.attributes?.event_name}
                          </h4>
                          <p className="at-col-title">
                            {configJSON.eventNameText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">
                            {log?.attributes?.activity}
                          </h4>
                          <p className="at-col-title">
                            {configJSON.moduleText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">
                          {Moment(log?.attributes?.created_at).format("ddd DD-MMM-YYYY, hh:mm A")}
                          </h4>
                          <p className="at-col-title">
                            {configJSON.logTimeText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">
                            {log?.attributes?.activity}
                          </h4>
                          <p className="at-col-title">
                            {configJSON.descriptionText}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            )}
          </div>
        </Modal>
      </React.Fragment>
    );
  }
  // Customizable Area End
  render() {
    const selectedDate =
      this.state.endDate !== null
        ? String(
            this.state.endDate &&
              `${Moment(this.state.startDate).format("DD-MM-YYYY")} to ${Moment(
                this.state.endDate
              ).format("DD-MM-YYYY")}`
          )
        : "";

    return (
      <div className="dealer-wrapper">
        <div className="container mx-auto">
          {/* Sidebar */}
          <div className="dealer-sidebar">
            {/* Sidebar Title */}
            <div className="dealer-card-title">Manage & Settings</div>
            {/* Sidebar Menu */}
            <div className="dealer-sidebar-menu">
              <div className="dealer-sidebar-menu-item">
                <img src={teamManagementIcon} alt="Dashboard" className="h-5" />
                <p
                  className={`dealer-sidebar-menu-item-text ml-2 ${
                    this.state.menuCollapsed ? "hidden" : "block"
                  }`}
                >
                  Team Management
                </p>
              </div>
              <div className="dealer-sidebar-menu-item">
                <img src={auditTrailIcon} alt="Audit Trail" className="h-5" />
                <p
                  className={`dealer-sidebar-menu-item-text ml-2 ${
                    this.state.menuCollapsed ? "hidden" : "block"
                  }`}
                >
                  Audit Trail
                </p>
              </div>
              <div className="dealer-sidebar-menu-item">
                <img src={accountSettingsIcon} alt="" className="h-5" />
                <p
                  className={`dealer-sidebar-menu-item-text ml-2 ${
                    this.state.menuCollapsed ? "hidden" : "block"
                  }`}
                >
                  Account Settings
                </p>
              </div>
              <div className="dealer-sidebar-menu-item">
                <img src={purchaseSettingsIcon} alt="" className="h-5" />
                <p
                  className={`dealer-sidebar-menu-item-text ml-2 ${
                    this.state.menuCollapsed ? "hidden" : "block"
                  }`}
                >
                  Purchase Settings
                </p>
              </div>
              <div className="dealer-sidebar-menu-item">
                <img src={logOutIcon} alt="" className="h-5" />
                <p
                  className={`dealer-sidebar-menu-item-text ml-2 ${
                    this.state.menuCollapsed ? "hidden" : "block"
                  }`}
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
          <div className="dealer-body-container">
            {/* Dealer Body */}
            <div
              className={
                this.state.menuCollapsed ? "admin-body-collapsed" : "admin-body"
              }
            >
              {/* Page Content */}
              <div className="dealer-body-content">
                <div className="dealer-card-title-secondary mb-5">
                  <div className="flex justify-between items-center">
                    Audti Trails
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="op-btn-primary-outline-sm flex items-center mr-5"
                        onClick={() =>
                          this.handleTrailType(configJSON.membersText)
                        }
                      >
                        <img
                          src={refreshIcon}
                          alt="Members"
                          className="h-3 mr-2"
                        />
                        Refresh
                      </button>
                      <button
                        type="button"
                        className="op-btn-secondary-sm flex items-center mr-5"
                        onClick={() =>
                          this.handleTrailType(configJSON.membersText)
                        }
                      >
                        <img
                          src={filtersIcon}
                          alt="Members"
                          className="h-3 mr-2"
                        />
                        Filter
                      </button>
                      <button
                        type="button"
                        className={`${
                          this.state.trailType === configJSON.membersText
                            ? "op-btn-secondary-sm"
                            : "op-btn-primary-outline-sm"
                        } flex items-center mr-5`}
                        onClick={() =>
                          this.handleTrailType(configJSON.membersText)
                        }
                      >
                        <img
                          src={
                            this.state.trailType === configJSON.membersText
                              ? membersIcon
                              : membersActiveIcon
                          }
                          alt="Members"
                          className="h-3 mr-2"
                        />
                        {configJSON.membersText}
                      </button>
                      <button
                        type="button"
                        className={`${
                          this.state.trailType === configJSON.allLogsText
                            ? "op-btn-secondary-sm"
                            : "op-btn-primary-outline-sm"
                        } flex items-center`}
                        onClick={() =>
                          this.handleTrailType(configJSON.allLogsText)
                        }
                      >
                        <img
                          src={
                            this.state.trailType === configJSON.allLogsText
                              ? logsActiveIcon
                              : logsIcon
                          }
                          alt="All Logs"
                          className="h-3 mr-2"
                        />
                        {configJSON.allLogsText}
                      </button>
                    </div>
                  </div>
                  {/* Filters */}
                  <div className="dealer-filters">
                    <div className="flex items-center mt-4">
                      <div className="w-3/12 pr-3 relative">
                        <input
                          type="text"
                          placeholder="Start-end Date"
                          className="op-input-primary w-full"
                          onClick={this.onCalendarOpen}
                          value={selectedDate}
                        />
                        {this.state.showFilterCalendar && (
                          <div className="absolute">
                            <DatePicker
                              selected={this.state.startDate}
                              onChange={this.hanldeOnChangeDate}
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              selectsRange
                              inline
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-2/12 pr-3">
                        <input
                          type="text"
                          placeholder="Search"
                          className="op-input-primary w-full"
                        />
                      </div>
                      <div className="w-2/12 pr-3">
                        <input
                          type="text"
                          placeholder="Search"
                          className="op-input-primary w-full"
                        />
                      </div>
                      <div className="w-2/12 pr-3">
                        <input
                          type="text"
                          placeholder="Search"
                          className="op-input-primary w-full"
                        />
                      </div>
                      <div className="w-1/12 pr-3">
                        <button
                          type="submit"
                          className="op-btn-secondary-sm w-full"
                        >
                          GO
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="at-list">
                  {/* Members List */}
                  {this.state.trailType === configJSON.membersText && (
                    <>
                      {this.state.membersData.length > 0 && (
                        <>
                          {this.state.membersData.map(
                            (member: any, index: any) => {
                              return (
                                <React.Fragment key={String(index)}>
                                {/* <AuditTrailListRow memberDetails={member} /> */}
                                  {this.auditTrailListRow(member)}
                                </React.Fragment>
                              );
                            }
                          )}
                        </>
                      )}
                    </>
                  )}
                  {/* All Logs */}
                  {this.state.trailType === configJSON.allLogsText && (
                    <>
                      {/* Trail Row */}
                      <div className="at-list-row grid-cols-adminMemberTrailLayout">
                        <div className="at-list-col">
                          <h4 className="at-col-value font-bold">Event-Name</h4>
                          <p className="at-col-title">
                            {configJSON.eventNameText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">resource-type</h4>
                          <p className="at-col-title">
                            {configJSON.moduleText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">12/12/2020 12:00 PM</h4>
                          <p className="at-col-title">
                            {configJSON.logTimeText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">
                            some-description-goes -here-in-simple-language
                          </h4>
                          <p className="at-col-title">
                            {configJSON.descriptionText}
                          </p>
                        </div>
                      </div>
                      <div className="at-list-row grid-cols-adminMemberTrailLayout">
                        <div className="at-list-col">
                          <h4 className="at-col-value font-bold">Event-Name</h4>
                          <p className="at-col-title">
                            {configJSON.eventNameText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">resource-type</h4>
                          <p className="at-col-title">
                            {configJSON.moduleText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">12/12/2020 12:00 PM</h4>
                          <p className="at-col-title">
                            {configJSON.logTimeText}
                          </p>
                        </div>
                        <div className="at-list-col">
                          <h4 className="at-col-value">
                            some-description-goes -here-in-simple-language
                          </h4>
                          <p className="at-col-title">
                            {configJSON.descriptionText}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
