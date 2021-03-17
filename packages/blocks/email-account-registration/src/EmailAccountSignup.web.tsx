// @ts-nocheck
import React from "react";

// Customizable Area Start
import "./EmailSignup.css";
import { img1, img2, img3 } from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import * as Yup from "yup";
export const configJSON = require("./config");
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//@ts-ignore
// Customizable Area End
import { withRouter } from "react-router-dom";

import EmailAccountRegistrationController, {
  Props,
} from "./EmailAccountRegistrationController.web";

class EmailAccountSignup extends EmailAccountRegistrationController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <div className="outer-wrapper min-h-screen">
        <div className="upper-wrapper">
          <div className="">
            <div className="flex flex-wrap -mx-3 overflow-hidden sm:-mx-px md:-mx-3 lg:-mx-3 xl:-mx-3">
              <div className="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img1} alt="" className="mx-auto" />
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div className="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img2} alt="" className="mx-auto" />
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div className="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img3} alt="" className="mx-auto" />
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="botton-wrapper">
          <div className="inner-box">
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
              Create trial account. Join OKYD
            </h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              Create an account
            </p>

            <Formik
              initialValues={{
                email: "",
                companyName: "",
                domainName: "",
                fullName: "",
                phoneNumber: "",
                address: "",
                country: "",
                teamMemberOkyd: "",
                natureOfBussiness: "",
                clientTarget: "",
                user_type:
                  this.props.match.url === "/email-account-signup"
                    ? "subscriber"
                    : "admin",
              }}
              validationSchema={Yup.object().shape(this.state.NewAccSchema)}
              onSubmit={(values: any) => {
                this.createAccount(values)
                ///this.domainAvailability()
              }}
              enableReinitialize
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Email <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="email"
                      placeholder={configJSON.placeHolderEmail}
                      className="w-full"
                    />
                    <i className="las la-envelope-open line-icons absolute right-0 top-7 text-base text-grey-500" />
                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      placeholder={configJSON.placeHolderCompanyName}
                      className="w-full"
                    />
                    <i className="las la-address-book line-icons absolute right-0 top-7 text-base text-grey-500" />
                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="companyName" />
                    </span>
                  </div>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Your Domain Name
                      <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="domainName"
                      placeholder={configJSON.placeHolderDomainName}
                      className="w-full"
                      onChange={e => {
                        setFieldValue("domainName", e.target.value)
                        this.domainAvailability(e.target.value)

                      }}
                    />
                    <span className="absolute text-gray-400 text-sm font-bold top-8 right-6">.okyd.com</span>
                    {this.state.domainNameSuccessSymbol ?

                      <i className="las la-check-circle text-green-700 line-icons absolute right-0 top-7 text-base " /> :
                      <i className="las la-times-circle text-red-600 line-icons absolute right-0 top-7 text-base " />
                    }

                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="domainName" />
                    </span>
                  </div>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder={configJSON.placeHolderFullName}
                      className="w-full"
                    />
                    <i className="las la-signature line-icons absolute right-0 top-7 text-base text-grey-500" />
                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="fullName" />
                    </span>
                  </div>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder={configJSON.placeHolderPhoneNumber}
                      className="w-full"
                    />
                    <i className="las la-phone-volume line-icons absolute right-0 top-7 text-base text-grey-500" />
                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="phoneNumber" />
                    </span>
                  </div>
                  <div className="mb-6 relative field-wrapper">
                    <label>
                      Address <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="address"
                      placeholder={configJSON.placeHolderAddress}
                      className="w-full"
                    />
                    <i className="las la-address-book line-icons absolute right-0 top-7 text-base text-grey-500" />
                    <span className="text-red-600 text-sm">
                      <ErrorMessage name="address" />
                    </span>
                  </div>

                  <div className="mb-6 field-wrapper relative">
                    <label htmlFor="country">Country</label>
                    <Field
                      name="country"
                      id="country"
                      component={Autocomplete}
                      options={[
                        { id: "IND", name: "India" },
                        { id: "GER", name: "Germany" },
                        { id: "CAN", name: "Canada" },
                      ]}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                          {...params}
                          className="transparent-input"
                          label=""
                          placeholder={configJSON.placeHolderCountry}
                        />
                      )}
                    />
                    <span className="error">
                      <ErrorMessage name="country" />
                    </span>
                  </div>

                  <div className="mb-6 field-wrapper relative">
                    <label htmlFor="teamMemberOkyd">
                      How many of your team member are are going to use OKYD?
                    </label>
                    <Field
                      name="teamMemberOkyd"
                      id="teamMemberOkyd"
                      component={Autocomplete}
                      options={[
                        { id: "10", name: "10" },
                        { id: "20", name: "20" },
                        { id: "30", name: "30" },
                      ]}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                          {...params}
                          className="transparent-input"
                          label=""
                          placeholder={configJSON.placeHolderCount}
                        />
                      )}
                    />
                    <span className="error">
                      <ErrorMessage name="teamMemberOkyd" />
                    </span>
                  </div>

                  <div className="mb-6 field-wrapper relative">
                    <label htmlFor="natureOfBussiness">
                      Nature of your buisness
                    </label>
                    <Field
                      name="natureOfBussiness"
                      id="natureOfBussiness"
                      component={Autocomplete}
                      options={[
                        { id: "Manufacturing", name: "Manufacturing" },
                        { id: "Corporation", name: "Corporation" },
                        { id: "Service", name: "Service" },
                      ]}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                          {...params}
                          className="transparent-input"
                          label=""
                          placeholder={configJSON.placeHolderBusinessType}
                        />
                      )}
                    />
                    <span className="error">
                      <ErrorMessage name="natureOfBussiness" />
                    </span>
                  </div>

                  <div className="mb-6 field-wrapper relative">
                    <label htmlFor="clientTarget">
                      How many clients are you targeting
                    </label>
                    <Field
                      name="clientTarget"
                      id="clientTarget"
                      component={Autocomplete}
                      options={[
                        { id: "10-20", name: "10-20" },
                        { id: "20-30", name: "20-30" },
                        { id: "30-40", name: "30-40" },
                      ]}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                          {...params}
                          className="transparent-input"
                          label=""
                          placeholder={configJSON.placeHolderRange}
                        />
                      )}
                    />
                    <span className="error">
                      <ErrorMessage name="clientTarget" />
                    </span>
                  </div>

                  <div className="mt-10">
                    <button
                      type="submit"
                      className="button w-full op-btn-primary mb-3"
                    >
                      Create Account
                    </button>
                    <button
                      className="button w-full op-btn-secondary"
                      onClick={() =>
                        this.props.history.push("email-acount-login-signin")
                      }
                    >
                      Already Have An Account? Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <p className="copyright-info">copyright 2020 okyd</p>
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
      </div>
    );
  }
}

// Customizable Area Start

// Customizable Area End

export default withRouter(EmailAccountSignup);
