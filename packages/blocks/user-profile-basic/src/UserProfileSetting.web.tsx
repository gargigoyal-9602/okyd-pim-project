import React from "react";
// import AuditTrailListRow from "./components/AuditTrailListRow.web";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { range } from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Sidebar from "../../../components/src/Sidebar";

/**
 * Contaroller
 */
import UserProfileSettingController, {
  Props,
  configJSON,
} from "./UserProfileSettingController.web";

import {
  logo,
  dashboardIcon,
  menuIcon,
  menuDownIcon,
  logsWighBgActiveIcon,
  timeWithBgIcon,
} from "./assets";

class UserProfileSetting extends UserProfileSettingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
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
              className={`w-3/12 bg-white flex-shrink-0 ${this.state.menuCollapsed
                ? //this.state.user_type === configJSON.admin
                "block"
                : "hidden"
                }`}
            >
              {/* Overview Header */}
              <div className="flex items-center justify-between py-6 px-6 border-b border-light-400 mb-6">
                <div className="flex items-center">
                  <i className="las la-user text-blue-700 text-3xl" />
                  {/* <profile-icon-img src={menuIcon} alt="" className="h-9" /> */}

                  <div className="ml-3">
                    <p className="text-secondary-base text-sm font-bold">
                      {this.state.fullname}
                    </p>
                    <p className="text-primary-light-xs">
                      {this.state.user_type}
                    </p>
                  </div>
                </div>
                <button className="op-btn-transparent" type="button">
                  <img src={menuDownIcon} alt="" className="h-9" />
                </button>
              </div>

              {/* Overview Content */}
              <div className="border-gray-200 rounded-2xl m-6 mb-80">
                <div
                  className={`flex items-center px-5 py-4 border rounded-md border-gray-100 cursor-pointer ${this
                    .state.generalInformation && "profile-active-section"}`}
                  onClick={this.handleGeneralInformation}
                >
                  <div>
                    <i className="las la-user-edit text-gray-500 text-2xl" />
                  </div>
                  <div className="pl-4">
                    <p className="text-black text-sm font-bold profile-heading-text">
                      General Information
                    </p>
                    <p className="text-xs text-gray-500">
                      Main settings and details
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center px-5 border border-t-0 rounded-md border-gray-100 py-4 bordercursor-pointer ${this
                    .state.changePassword && "profile-active-section"}`}
                  onClick={this.handleChangePassword}
                >
                  <div>
                    {" "}
                    <i className="las la-key text-gray-500 text-2xl" />
                  </div>
                  <div className="pl-4">
                    <p className="text-black text-sm font-bold profile-heading-text">
                      Change Password
                    </p>
                    <p className="text-xs text-gray-500">
                      Update login information
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-6">
                <div className="border-gray-200 rounded-lg">
                  <div
                    className="flex items-center px-5 py-4 cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      // @ts-ignore
                      this.props.history.push("login");
                    }}
                  >
                    <div>
                      {" "}
                      <i className="las la-sign-out-alt text-gray-500 text-2xl" />
                    </div>
                    <div className="pl-4">
                      <p className="text-black text-sm font-bold ">Logout</p>
                      <p className="text-xs text-gray-500">Signout of OKYD</p>
                    </div>
                  </div>
                </div>
                <div className="border-gray-200 rounded-lg mt-3">
                  <div className="flex items-center px-5 py-4 cursor-pointer">
                    <div>
                      {" "}
                      <i className="las la-trash-alt text-gray-500 text-2xl" />
                    </div>
                    <div className="pl-4">
                      <p className="text-black text-sm font-bold ">
                        Disable Account
                      </p>
                      <p className="text-xs text-gray-500">
                        Disable accounts and remove activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Body */}
            <div
              className={
                this.state.menuCollapsed ? "admin-body-collapsed" : "admin-body"
              }
            >
              <div className="flex justify-between py-6">
                <div className="flex items-center">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 mr-6 border"
                    onClick={this.onMenuToggle}
                  >
                    <i className="las la-arrows-alt-h text-primary-light" />
                  </div>
                  <h2 className="text-xl font-bold">Profile & Settings</h2>
                </div>

                <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200  border">
                  <i className="las la-search text-primary-light" />
                </div>
              </div>
              <div className="  bg-white p-8">
                {/* enabled general info */}
                {this.state.generalInformation ? (
                  <div className="bg-white relative rounded-xl profile-box-wrapper">
                    <Formik
                      initialValues={{
                        fullname: this.state.fullname || "",
                        designation: this.state.designation || "",
                        email: this.state.email || "",
                        full_phone_number: this.state.full_phone_number || "",
                        address: this.state.address || "",
                        companyName: this.state.companyName || "",
                        country: this.state.country || "",
                      }}
                      validationSchema={Yup.object().shape(
                        this.state.GeneralInformationSchema
                      )}
                      onSubmit={(values) => {
                        this.handleUpdateProfileDetails(values);
                      }}
                      enableReinitialize
                    >
                      {({ }) => (
                        <Form className="w-10/12">
                          <div className="h-24 w-24 flex items-center justify-center rounded-lg mb-12 bg-gray-100">
                            <i className="las la-user text-blue-700 text-3xl " />
                          </div>
                          <div className=" grid grid-cols-2 gap-x-8 gap-y-4">
                            <div className="field-wrapper relative mb-6">
                              <label>Full Name*</label>
                              <Field
                                type="text"
                                name="fullname"
                                placeholder="Start typing…"
                                autoComplete="off"
                              />
                              <i className="las la-signature profile-icon-img" />
                              <span className="text-red-500">
                                <ErrorMessage name="fullname" />
                              </span>
                            </div>
                            <div className="field-wrapper relative p-t-20 mb-6">
                              <label>Email</label>
                              <Field
                                type="text"
                                name="email"
                                placeholder="Start typing…"
                                autoComplete="off"
                                disabled={true}
                                className="opacity-50 cursor-not-allowed"
                              />
                              <i className="las la-envelope-open profile-icon-img" />
                              <span className="text-red-500">
                                <ErrorMessage name="email" />
                              </span>
                            </div>
                            <div className="field-wrapper relative p-t-20 mb-6">
                              <label>Designation*</label>
                              <Field
                                type="text"
                                name="designation"
                                placeholder="Start typing…"
                                autoComplete="off"
                              />
                              <i className="las la-id-badge profile-icon-img" />
                              <span className="text-red-500">
                                <ErrorMessage name="designation" />
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-3 pt-3">
                            <div className="field-wrapper relative mb-6">
                              <label>Phone*</label>
                              <Field
                                type="text"
                                name="full_phone_number"
                                placeholder="Start typing…"
                                autoComplete="off"
                              />
                              <i className="las la-phone-volume profile-icon-img" />
                              <span className="text-red-500">
                                <ErrorMessage name="full_phone_number" />
                              </span>
                            </div>
                            <div className="field-wrapper relative p-t-20 mb-6">
                              <label>Address*</label>
                              <Field
                                type="text"
                                name="address"
                                placeholder="Start typing…"
                                autoComplete="off"
                              />
                              <i className="las la-address-book profile-icon-img" />

                              <span className="text-red-500">
                                <ErrorMessage name="address" />
                              </span>
                            </div>
                            <div className="field-wrapper relative mb-6">
                              <label>Company Name</label>
                              <Field
                                type="text"
                                name="companyName"
                                placeholder="Start typing…"
                                autoComplete="off"
                                disabled={true}
                                className="opacity-50 cursor-not-allowed"
                              />
                              <i className="las la-address-book profile-icon-img" />
                              <span className="text-red-500">
                                <ErrorMessage name="companyName" />
                              </span>
                            </div>
                            <div className="field-wrapper relative mb-6">
                              <label>Country*</label>
                              <Field
                                type="text"
                                // as="select"
                                name="country"
                                autoComplete="off"
                              >
                                {/* <option value=" India">India</option>
                                <option value="Germany">Germany</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Cuba">Cuba</option> */}
                              </Field>
                              <span className="text-red-500">
                                <ErrorMessage name="country" />
                              </span>
                            </div>
                            <div />
                          </div>

                          <div className="mt-16">
                            <button
                              type="submit"
                              className="button op-btn-primary px-20 mr-2 justify-center w-24"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="button op-btn-light w-20 justify-center"
                              onClick={this.handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                ) : null}

                {/* // enabled change Password.. */}

                {this.state.changePassword ? (
                  <div className=" bg-white relative rounded-xl profile-box-wrapper">
                    <Formik
                      initialValues={{
                        old_password: this.state.old_password || "",
                        new_password: this.state.new_password || "",
                        confirm_new_password:
                          this.state.confirm_new_password || "",
                      }}
                      validationSchema={Yup.object().shape(
                        this.state.ChangePasswordSchema
                      )}
                      onSubmit={(values) => {
                        this.handleUpdateChangePassword(values);
                      }}
                      enableReinitialize
                    >
                      {({ }) => (
                        <Form className="w-6/12">
                          <div className="grid grid-cols-1">
                            <div className="field-wrapper relative mb-6">
                              <label>Old Password*</label>
                              <Field
                                type={`${this.state.old_password_visible
                                  ? "text"
                                  : "password"
                                  }`}
                                name="old_password"
                                placeholder="Enter old password"
                                autoComplete="off"
                              />
                              <span onClick={this.handleOldPasswordVisible}>
                                {this.state.old_password_visible ? (
                                  <i className="lar la-eye profile-icon-img" />
                                ) : (
                                    <i className="lar la-eye-slash profile-icon-img" />
                                  )}
                              </span>

                              <span className=" text-red-500">
                                <ErrorMessage name="old_password" />
                              </span>
                            </div>
                            <div className="field-wrapper relative mb-6">
                              <label>New Password*</label>
                              <Field
                                type={`${this.state.new_password_visible
                                  ? "text"
                                  : "password"
                                  }`}
                                name="new_password"
                                placeholder="Enter new password"
                                autoComplete="off"
                              />
                              <span onClick={this.handleNewPasswordVisible}>
                                {this.state.new_password_visible ? (
                                  <i className="lar la-eye profile-icon-img" />
                                ) : (
                                    <i className="lar la-eye-slash profile-icon-img" />
                                  )}
                              </span>
                              <span className="text-red-500">
                                <ErrorMessage name="new_password" />
                              </span>
                            </div>
                            <div className="field-wrapper relative mb-6">
                              <label>Confirm New Password*</label>
                              <Field
                                type={`${this.state.confirm_new_password_visible
                                  ? "text"
                                  : "password"
                                  }`}
                                name="confirm_new_password"
                                placeholder="Confirm new password"
                                autoComplete="off"
                              />
                              <span
                                onClick={this.handleConfirmNewPasswordVisible}
                              >
                                {this.state.confirm_new_password_visible ? (
                                  <i className="lar la-eye profile-icon-img" />
                                ) : (
                                    <i className="lar la-eye-slash profile-icon-img" />
                                  )}
                              </span>
                              <span className="text-red-500">
                                <ErrorMessage name="confirm_new_password" />
                              </span>
                            </div>

                            <div className="flex items-center justify-start mt-12">
                              <button
                                type="submit"
                                className="button op-btn-primary flex items-center mr-2 justify-center w-24"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="button op-btn-light"
                                onClick={this.handleGeneralInformation}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Snackbar for display success and failed messages. */}
          <Snackbar
            open={this.state.snackBar.show}
            autoHideDuration={3000}
            onClose={this.closeSnackBarHandler}
          >
            <MuiAlert
              elevation={9}
              variant="filled"
              onClose={this.closeSnackBarHandler}
              severity={this.state.snackBar.type}
            >
              {this.state.snackBar.message}
            </MuiAlert>
          </Snackbar>
        </div>
      </>
    );
  }
}
//@ts-ignore
export default withRouter(UserProfileSetting);
