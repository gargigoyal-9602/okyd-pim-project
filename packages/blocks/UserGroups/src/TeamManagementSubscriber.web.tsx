import React from "react";
// import AuditTrailListRow from "./components/AuditTrailListRow.web";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { range, isEmpty } from "lodash";
// import Select from 'react-select'

/**
 * Contaroller
 */
import UserGroupsController, {
  Props,
  configJSON,
} from "./UserGroupsController.web";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Modal from "../../../components/src/GenericModal.web";
import Select from "react-select";
import Sidebar from "../../../components/src/Sidebar";

/**
 * Assets
 */
import {
  logo,
  dashboardIcon,
  menuIcon,
  menuDownIcon,
  logsWighBgActiveIcon,
  timeWithBgIcon,
} from "./assets";
import { timeStamp } from "console";
import Autocomplete, { AutocompleteRenderInputParams } from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const ConvertOption = (data: any) => {
  let arr = [];
  if (data) {
    for (let i = 0; i < data; i++) {
      let obj = {
        ...data,
        value: data[i]?.attributes?.id,
        label: data[i]?.attributes?.id
      }
      arr.push(obj)
    }
  }
  return arr
}

// const Pagination = () => {
//   return (
//     <>
//       <div className="flex justify-between pt-10 pagination">
//         <div>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-12 font-bold color-grey px-10"
//           >
//             <i className="las la-angle-left pr-2" />
//             Prev
//           </a>
//         </div>
//         <div className="flex">
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey  active mr-2 font-14 color-black font-bold"
//           >
//             1
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey  mr-2 color-black font-14 font-bold"
//           >
//             2
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             3
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             4
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             5
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey font-14 color-black font-bold"
//           >
//             6
//           </a>
//         </div>
//         <div>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-12 font-bold color-grey  px-10"
//           >
//             Next
//             <i className="las la-angle-right pl-2" />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// this.state.rolesList && this.state.rolesList.map((x:any)=>{value:x.attributes.id, label:x.attributes.name})
class TeamManagementSubscriber extends UserGroupsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    this.state.rolesList.length > 0 && ConvertOption(this.state.rolesList)
    return (
      <>
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

            {/*  Body */}
            <div
              className={
                this.state.menuCollapsed ? "admin-body-collapsed" : "admin-body"
              }
            >
              {/* <div className="flex space-between py-6">
                  <div className="flex items-center">
                    <div className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-6">
                      <i className="las la-arrows-alt-h text-primary-light" />
                    </div>
                    <h2 className="font-20 font-bold w-max">Your Team</h2>
                  </div>

                  <div className="flex justify-end w-full">
                    <div className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2">
                      <i className="las la-search color-grey" />
                    </div>
                    <div
                      className="h-w-36 rounded-lg flex items-center justify-center bg-blue"
                      onClick={() => this.openTrailViewDetailsModalHandler()}
                    >
                      <i className="las la-plus-circle color-white" />
                    </div>
                  </div>
                </div> */}
              <div className="flex justify-between py-6">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 mr-6 border" onClick={this.onMenuToggle}>
                    <i className="las la-arrows-alt-h text-primary-light" />
                  </div>
                  <h2 className="font-20 font-bold">Your Team</h2>
                </div>

                <div className="flex">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 border mr-2 ">
                    <i className="las la-search " />
                  </div>
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center bg-blue-500 border text-white"
                    onClick={() => this.openTrailViewDetailsModalHandler()}
                  >
                    <i className="las la-plus-circle " />
                  </div>
                </div>
              </div>
              <div className="">

                <div className=" p-6 bg-white">
                  {/* <div className="text-xs text-gray-500 flex justify-end items-center font-bold">
                    <i className="las la-filter  " />
                    <span className="px-2">SORT</span>
                    <select className="text-gray-900 font-bold ">
                      <option>A-Z</option>
                      <option>Z-A</option>
                    </select>
                  </div> */}
                  <div className="bg-transparent-200  grid grid-cols-5 gap-4 font-bold px-8 py-3 my-6 font-12">
                    <button
                      type="button"
                      className="flex items-center op-btn-transparent text-primary-light-xs font-bold"
                      onClick={this.handleSortingName}
                    >
                      Name
                            {this.state.sortName === "asc" ? (
                        <i className="las la-sort-alpha-down ml-3 text-lg" />
                      ) : (
                          <i className="las la-sort-alpha-up ml-3 text-lg" />
                        )}
                    </button>
                    <div className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                      Email
                    </div>
                    <div className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                      Phone
                    </div>
                    <div className="col-span-2 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                      Role
                    </div>
                  </div>

                  {this.state.getTeamMembetList &&
                    this.state.getTeamMembetList.map((member: any) => (
                      <>
                        <div key={member?.id}>
                          <div className="border grid grid-cols-5 gap-4 px-8 py-4 rounded-lg mb-2">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center rounded-lg h-12 w-12  rounded-lg bg-indigo-100">
                                <i className="las la-user text-blue-700" />
                              </div>
                              <div className=" pl-4">
                                <p className="at-col-value font-bold">
                                  {member?.attributes?.fullname}
                                </p>
                                <p className="at-col-title">
                                  {member?.attributes?.designation}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-center flex-col">
                              <p className="at-col-value">{member?.attributes?.email}</p>
                              <p className="at-col-title">
                                Email
                              </p>
                            </div>
                            <div className="flex justify-center flex-col">
                              <p className="at-col-value"> {member?.attributes?.country_code} {member?.attributes?.full_phone_number}</p>
                              <p className="at-col-title">
                                Phone
                              </p>
                            </div>
                            <div className="flex items-center ">
                              {member?.attributes?.roles.length > 0 ?
                                member?.attributes?.roles.map((role: any) => <div className="text-primary-light-sm inline-block font-bold bg-light-200 py-1 px-3 rounded-md mr-2">
                                  {role?.name}
                                </div>
                                )
                                : <div className=" w-auto text-center mr-2 text-sm text-blue-700">
                                  No Roles Assign
                              </div>}
                            </div>
                            <div className="flex items-center justify-end flex-shrink">
                              <div
                                className="h-9 w-9 rounded-lg flex items-center justify-center  border mr-2"
                                onClick={() => {
                                  this.handleEditTeamMember(member)
                                }}
                              >
                                <i className="las la-edit text-gray-400" />
                              </div>
                              <div
                                className="h-9 w-9 rounded-lg flex items-center justify-center  border mr-2"
                                onClick={() => {
                                  this.deleteTeamMemberbyId(member)
                                }}
                              >
                                <i className="las la-trash text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  {/* <Pagination /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Team Member Modal */}
        <Modal
          visible={this.state.memberDetailsModal}
          onClose={this.closeTrailViewDetailsModalHandler}
          bodyStyles="p-8 model-width-622px"
        >
          <>
            <div className="flex justify-between items-center mb-8">
              <h6 className="text-sm text-gray-500 font-semibold">Create New Team Member</h6>
              <div className="border rounded-lg flex justify-center items-center w-10 h-10">
                <i className="las la-ellipsis-h" />
              </div>
            </div>
            <div className="">
              <Formik
                initialValues={{
                  firstName: this.state.firstName || "",
                  designation: this.state.designation || "",
                  email: this.state.email || "",
                  phone: this.state.phone || "",
                  rolesGroup: this.state.rolesGroup || [],
                }}
                validationSchema={Yup.object().shape(
                  this.state.TeamMemberSchema
                )}
                onSubmit={(values) => {
                  (this.state.currentId) ?
                    this.updateTeamMemberbyId(values) :
                    this.handleInviteTeamMember(values)
                }}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="add-person-section flex justify-center mb-8">
                      {/* <i className="las la-user-plus " /> */}
                      <div className="input-type-file flex  ">
                        <label htmlFor="file-input" className="rounded-2xl flex justify-center items-center p-9">
                          <i className="las la-user-plus text-3xl text-blue-600"></i>
                        </label>

                        <input id="file-input" type="file" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="mb-6 relative field-wrapper">
                        <label>Full Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="Start typing…"
                          className="w-full "
                        />
                        <i className="las la-address-card input-field-icons" />
                        <span className="text-red-600 text-sm">
                          <ErrorMessage name="firstName" />
                        </span>
                      </div>
                      <div className="mb-6 relative field-wrapper">
                        <label>Designation</label>
                        <Field
                          type="text"
                          name="designation"
                          placeholder="Start typing…"
                          className="w-full"
                        />
                        <i className="las la-id-badge input-field-icons" />
                        {/* <i className="las la-id-badge"></i> */}
                        <span className="text-red-600 text-sm">
                          <ErrorMessage name="designation" />
                        </span>
                      </div>
                    </div>
                    <div className="grid-cols-1 ">
                      <div className="mb-6 relative field-wrapper">
                        <label>Email</label>
                        {/* <Field
                          type="text"
                          name="email"
                          placeholder="Start typing…"
                          className="w-full"
                        /> */}
                        <Field
                          type="text"
                          name="email"
                          placeholder="Start typing…"
                          disabled={this.state.currentId ? true : false}
                          className={`w-full ${this.state.currentId && "opacity-50 cursor-not-allowed"}`}
                        />
                        <i className="las la-envelope-open input-field-icons" />
                        <span className="text-red-600 text-sm">
                          <ErrorMessage name="email" />
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="relative field-wrapper">
                        <label>Phone</label>
                        <Field
                          type="text"
                          name="phone"
                          placeholder="Start typing…"
                          className="w-full"
                        />
                        <i className="las la-fax input-field-icons" />
                        <span className="text-red-600 text-sm">
                          <ErrorMessage name="phone" />
                        </span>
                      </div>
                      <div className="field-wrapper mb-6 relative material-ui-select">
                        <label htmlFor="rolesGroup" className="mb-4">
                          Roles Groups
                          </label>
                        <Select
                          defaultValue={values.rolesGroup}
                          name="rolesGroup"
                          isMulti
                          onChange={(e: any) => setFieldValue("rolesGroup", e)}
                          options={this.state.rolesList}
                        />
                        <span className="error">
                          <ErrorMessage name="rolesGroup" />
                        </span>
                      </div>
                      <div />
                    </div>
                    {/* {JSON.stringify(values, null, 2)} */}

                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="button op-btn-light"
                        onClick={() => this.closeTrailViewDetailsModalHandler()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="button op-btn-primary w-auto"
                      >
                        {this.state.currentId ? "Update" : "Invite"} Contact
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        </Modal>

        {/* Invited Team Member Detail Modal */}
        <Modal
          visible={this.state.inviteMemberDetailModal}
          onClose={this.closeInviteTeamMemberModalHandler}
          bodyStyles=" model-width-622px"
        >
          <>
            <div className="modal-header h-28">
              <h4 className="border-t-2 border-gray-100 mt-14 pt-4 text-xl font-bold text-center">
                {this.state.firstName}
              </h4>
              <p className="at-col-title text-center">{this.state.designation}</p>
              <div className="h-9 w-9 rounded-lg flex items-center justify-center  border absolute right-10 top-7">
                <i className="las la-ellipsis-h" />
              </div>
            </div>
            <div className="modal-body">
              <div className="pb-10">
                <div className="grid gap-2 grid-cols-2">
                  <div className="text-center pl-18">
                    <h5 className="pb-0 text-lg font-bold">Email</h5>
                    <p className="text-sm">{this.state.email}</p>
                  </div>
                  <div className="text-center pr-18">
                    <h5 className="pb-0 text-lg font-bold">Phone</h5>
                    <p className="text-sm">{this.state.phone}</p>
                  </div>
                </div>
              </div>
              <div className="pt-10 mb-16 border-t-2 border-gray-100">
                <h5 className="text-lg font-bold mb-8">Roles Assigned</h5>
                <div className="flex">
                  {this.state.rolesGroup &&
                    this.state.rolesGroup.map((x: any) => <div className="text-primary-light-sm inline-block font-bold bg-light-200 py-1 px-3 rounded-md mr-2" key={x.id}>
                      {x.label}
                    </div>)}
                </div>
              </div>
            </div>
            <div className="fixed border-t-2 border-gray-100 w-full left-0 bottom-0">
              <div className="grid grid-cols-3">
                <button
                  type="button"
                  className="okyd-edit-del-btn flex items-center justify-center text-xs pt-3 pb-3"
                  onClick={() => this.openEditTeamMemberModalHandler()}
                >
                  <i className="las la-edit mr-2" />
                  Edit User
                </button>
                <button
                  type="button"
                  onClick={() => this.deleteTeamMemberbyId(this.state.currentId)}
                  className="okyd-edit-del-btn border-solid border-l-2 border-gray-300 flex items-center justify-center text-xs pt-3 pb-3"
                >
                  <i className="las la-trash mr-2" />
                  Delete User
                </button>
                <button
                  type="button"
                  onClick={() => this.handleResentInviteTeamMember()}
                  className="okyd-edit-del-btn border-solid border-l-2 border-gray-300 flex items-center justify-center text-xs pt-3 pb-3"
                >
                  <i className="las la-redo-alt mr-2" />
                  Resend Invite
                </button>
              </div>
            </div>
          </>
        </Modal>

        {/* Snackbar for display success and failed messages. */}
        <Snackbar
          open={this.state.snackBar.show}
          autoHideDuration={3000}
          onClose={this.closeSnackBarHandler}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.closeSnackBarHandler}
            severity={this.state.snackBar.type}
          >
            {this.state.snackBar.message}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
}
//@ts-ignore
export default withRouter(TeamManagementSubscriber);
