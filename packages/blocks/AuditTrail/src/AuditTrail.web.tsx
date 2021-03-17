import React from "react";
/**
 * Components
 */
import { withRouter } from "react-router-dom";
import Moment from "moment";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-datepicker/dist/react-datepicker.css";

/**
 * Contaroller
 */
import AuditTrailControllerWeb, { Props } from "./AuditTrailController.web";
import Modal from "../../../components/src/GenericModal.web";
import Sidebar from "../../../components/src/Sidebar";
/**
 * Assets
 */
import {
  menuDownIcon,
  membersIcon,
  logsIcon,
  membersActiveIcon,
  logsActiveIcon,
  closePrimaryIcon,
  logsWighBgActiveIcon,
  timeWithBgIcon,
  userIcon,
  viewIcon,
  lastLogIcon,
  clearFilterIcon,
  fillterPrimaryIcon,
} from "./assets";

export const configJSON = require("./config");

class AuditTrail extends AuditTrailControllerWeb {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
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
              onClick={() => this.openTrailViewDetailsModalHandler(memberDetails?.attributes?.account_id)}
            >
              <img src={viewIcon} alt="View Trail" className="h-3 mr-1" />
              {configJSON.viewDetailsText}
            </button>
          </div>
        </div>
        {/* View Details Modal */}
        <Modal visible={this.state.memberDetailsModal} onClose={this.closeTrailViewDetailsModalHandler}>
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
            {this.state.trailDetailsLoader ? (
              <div className="flex justify-center py-6">
                <CircularProgress />
              </div>
            ) : (
                <React.Fragment>
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
                </React.Fragment>
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
      <div className="admin-wrapper w-full">
        {/* Sidebar */}
        <Sidebar menuCollapsed={this.state.menuCollapsed} />
        <div
          className={`
            ${this.state.menuCollapsed
              ? "admin-body-container-collapsed"
              : "admin-body-container"
            } flex`}
        >
          {/* Overview */}
          <div
            className={`w-3/12 bg-white flex-shrink-0 ${this.state.menuCollapsed &&
              this.state.userType === configJSON.subscriber
              ? "block"
              : "hidden"
              }`}
          >
            {/* Overview Header */}
            <div className="flex items-center justify-between py-6 px-6 border-b border-light-400 mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
                  <i className="las la-user text-primary-light" />
                </div>
                <div className="ml-3">
                  <p className="text-secondary-base text-sm font-bold">
                    {window.localStorage.getItem("fullname")}

                  </p>
                  <p className="text-primary-light-xs">{this.state.userType}</p>
                </div>
              </div>
              <button className="op-btn-transparent" type="button">
                <img src={menuDownIcon} alt="" className="h-9" />
              </button>
            </div>
            {/* Overview Content */}
            <div className="px-6">
              <div className="pb-5">
                <p className="text-secondary-base text-sm font-bold">
                  Trails Overview
                </p>
                <p className="text-primary-light-xs">
                  Overall members & trails performance
                </p>
              </div>
              <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                <div>
                  <p className="text-primary-light-xs">Trails logged today</p>
                  <p className="text-secondary-base text-sm font-bold">298</p>
                </div>
                <button className="op-btn-transparent" type="button">
                  <img src={logsWighBgActiveIcon} alt="" className="h-9" />
                </button>
              </div>
              <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                <div>
                  <p className="text-primary-light-xs">
                    Members logged in today
                  </p>
                  <p className="text-secondary-base text-sm font-bold">20</p>
                </div>
                <button className="op-btn-transparent" type="button">
                  <img src={timeWithBgIcon} alt="" className="h-9" />
                </button>
              </div>
            </div>
          </div>
          {/* Admin Body */}
          <div
            className={
              this.state.menuCollapsed ? "admin-body-collapsed" : "admin-body"
            }
          >
            {/* Page Title */}
            <div className="admin-page-title-wrapper">
              <button
                type="button"
                className="op-btn-primary-transparent"
                onClick={this.onMenuToggle}
              >
                <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
                  <i className="las la-arrows-alt-h text-primary-light" />
                </div>
              </button>
              <p className="admin-page-title">{configJSON.title}</p>
            </div>
            {/* Page Content */}
            <div className="admin-body-content">
              {/* Filters */}
              <div className="admin-filters">
                <div className="flex items-center justify-between">
                  {/* Tabs */}
                  <div className="flex items-center">
                    {/* Member Button */}
                    <button
                      type="button"
                      className={`${this.state.trailType === configJSON.membersText
                        ? "op-btn-primary"
                        : "op-btn-primary-light"
                        } flex items-center font-black mr-5`}
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
                    {/* All Logs Button */}
                    <button
                      type="button"
                      className={`${this.state.trailType === configJSON.allLogsText
                        ? "op-btn-primary"
                        : "op-btn-primary-light"
                        } flex font-black items-center`}
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
                  {this.state.trailType === configJSON.allLogsText && (
                    <div className="flex items-center justify-between">
                      {/* <button type="button" className="op-btn-transparent mr-3">
                        <img src={clearFilterIcon} alt="Clear Filter" className="h-9" />
                      </button>
                      <button type="button" className="op-btn-transparent" onClick={this.logsFilterHandler}>
                        <img src={fillterPrimaryIcon} alt="Filter" className="h-9" />
                      </button> */}
                      {/* Sort By */}
                      {/* <div className="flex items-center">
                        <img src={sortByIcon} alt="sort by" className="h-4 mr-1" />
                        <label className="text-xs text-primary-light font-bold mr-2">
                          {configJSON.sortBy} :
                        </label>
                        dropdown
                      </div> */}
                    </div>
                  )}
                </div>
                {(this.state.trailType === configJSON.allLogsText && this.state.showLogsFilter) && (
                  <div className="mt-10">
                    <label className="text-primary-light-xs">Date Range</label>
                    <div className="flex items-center mt-3">
                      <div className="w-3/12 pr-3 relative">
                        <input
                          type="text"
                          placeholder="Start-end Date"
                          className="op-input-primary w-full"
                          onClick={this.onCalendarOpen}
                          value={selectedDate}
                          onChange={() => console.log("onchanges")}
                        />
                        {this.state.showFilterCalendar && (
                          <div className="absolute">
                            <DatePicker
                              selected={this.state.startDate}
                              onChange={this.hanldeOnChangeDate}
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              maxDate={new Date()}
                              selectsRange
                              inline
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-3/12 pr-3">
                        <Select
                          value={this.state.selectedResourceTypeOption}
                          onChange={this.handleResourceTypeChange}
                          options={configJSON.resourceTypeOptions}
                          placeholder="Select Resource Type"
                          classNamePrefix="okyd"
                        />
                      </div>
                      <div className="w-3/12 pr-3">
                        <Select
                          value={this.state.selectedEventTypeOption}
                          onChange={this.handleEventTypeChange}
                          options={configJSON.eventTypeOptions}
                          placeholder="Select Event Type"
                          classNamePrefix="okyd"
                        />
                      </div>
                      <div className="w-2/12 pr-3">
                        <input
                          type="text"
                          placeholder="Search"
                          className="op-input-primary w-full"
                        // onChange={() => this.searchTextInputProps}
                        />
                      </div>
                      <div className="w-1/12 pr-3">
                        <button
                          type="button"
                          className="op-btn-primary-sm w-full"
                        // onClick={this.logsFilterHandler}
                        >
                          Filter
                        </button>
                      </div>
                      <div className="w-1/12 leading-0">
                        <button type="button" className="op-btn-transparent">
                          <img src={closePrimaryIcon} alt="" className="h-9" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="at-list mt-12 mb-4">
                {/* Members List */}
                {this.state.trailType === configJSON.membersText && (
                  <React.Fragment>
                    {this.state.memberListingLoader ? (
                      <div className="flex justify-center py-6">
                        <CircularProgress />
                      </div>
                    ) : (
                        <React.Fragment>
                          {this.state.membersData.length > 0 && (
                            <React.Fragment>
                              {this.state.membersData.map(
                                (member: any, index: number) => {
                                  return (
                                    <React.Fragment key={String(index)}>
                                      {this.auditTrailListRow(member)}
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                  </React.Fragment>
                )}
                {/* All Logs */}
                {this.state.trailType === configJSON.allLogsText && (
                  <React.Fragment>
                    {/* Trail Row */}
                    {this.state.allLogsData.length > 0 && (
                      <React.Fragment>
                        {this.state.logsListingLoader ? (
                          <div className="flex justify-center py-6">
                            <CircularProgress />
                          </div>
                        ) : (
                            <React.Fragment>
                              {this.state.allLogsData.map(
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
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(AuditTrail);