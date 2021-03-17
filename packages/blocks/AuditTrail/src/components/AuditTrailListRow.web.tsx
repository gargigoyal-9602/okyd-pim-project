import React from "react";
import Moment from "moment";
/**
 * Contaroller
 */
import AuditTrailControllerWeb, { Props } from "../AuditTrailController.web";
import Modal from "../../../../components/src/GenericModal.web";
import {
  userIcon,
  viewIcon,
  lastLogIcon,
  clearFilterIcon,
  fillterPrimaryIcon,
} from "../assets";

export const configJSON = require("../config");

// interface PropTypes {
//   memberDetails: any;
//   key: string;
// }
class AuditTrailListRow extends AuditTrailControllerWeb {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    const openModalHandler = (accountId: number): void => {
      this.trailsOfTeamMember(accountId);
      this.setState({memberDetailsModal: true});
    };

    const closeModalHandler = () => {
      this.setState({memberDetailsModal: false});
    };
    
    return (
      <React.Fragment>
        {/* List row */}
        <div className="at-list-row grid-cols-adminMemberListLayout">
          <div className="at-list-col">
            <img src={userIcon} alt="" className="h-12" />
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value font-bold">
              {this.props.memberDetails?.attributes?.account_detail?.name}
            </h4>
            <p className="at-col-title">{configJSON.designationText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{this.props.memberDetails?.attributes?.account_detail?.email}</h4>
            <p className="at-col-title">{configJSON.emailText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{this.props.memberDetails?.attributes?.activity}</h4>
            <p className="at-col-title">{configJSON.trailsText}</p>
          </div>
          <div className="at-list-col">
            <h4 className="at-col-value">{Moment(this.props.memberDetails?.attributes?.created_at).format("ddd DD-MMM-YYYY, hh:mm A")}</h4>
            <p className="at-col-title">{configJSON.lastLogText}</p>
          </div>
          {/* View Details */}
          <div className="at-list-col text-right">
            <button
              type="button"
              className="op-btn-primary-transparent font-black flex items-center ml-auto"
              onClick={() => openModalHandler(this.props.memberDetails?.attributes?.account_id)}
            >
              <img src={viewIcon} alt="View Details" className="h-3 mr-1" />
              {configJSON.viewDetailsText}
            </button>
          </div>
        </div>
        {/* View Details Modal */}
        <Modal visible={this.state.memberDetailsModal} onClose={closeModalHandler}>
          <div className="flex items-center mb-10">
            <img src={lastLogIcon} alt="" className="mr-3 h-5" />
            <span className="text-primary-light-sm font-bold">
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
};

export default AuditTrailListRow;
