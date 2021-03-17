// @ts-nocheck

import React from "react";

// Customizable Area Start
// import '../../../../blocks/email-account-login/src/EmailAccountLogin.css';
import { img1, img2, img3, key } from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export const configJSON = require("./config");
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//@ts-ignore
// Customizable Area End

import NewPasswordController, { Props } from "./NewPasswordController.web";

class NewPassword extends NewPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    console.log("this",this.props.match.url)
    // console.log("object", this.props.location.search.split('=').pop());                                                                                        
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
            {this.props.match.url === "/active-account" && (
              <>
                <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
                  Active Your
                </h4>
                <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
                  OKYD Account
                </h4>
              </>
            )}
            {this.props.match.url === "/new-password" && (
              <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
                Create New Password For Your Subscriber Admin Account
              </h4>
            )}
            {this.props.match.url === "/super-admin-new-password" && (
              <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
                Create New Password For Your Admin Account
              </h4>
            )}
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              Before we continue, set your password
            </p>
            <Formik
              initialValues={{
                password: "",
                passwordConfirmation: "",
                token:this.props.location.search.split('=').pop(),
                type:this.props.match.url === "/active-account" ? "activePassword": "newPassword"
              }}
              validationSchema={Yup.object().shape(
                this.state.NewPasswordSchema
              )}
              onSubmit={(values) => this.createNewPassword(values)}
              enableReinitialize
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="grid-cols-1 ">
                    <div className="mb-6 relative field-wrapper">
                      <label>Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder={configJSON.placeholderIsNewPassword}
                        className="w-full"
                      />
                      <i className="las la-key line-icons absolute right-0 top-7 text-base text-grey-500" />
                      <span className="error">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                  </div>
                  <div className="grid-cols-1 ">
                    <div className="mb-6 relative field-wrapper">
                      <label>Confirm Password</label>
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        placeholder={configJSON.placeholderIsNewPassword}
                        className="w-full"
                      />
                      <i className="las la-key line-icons absolute right-0 top-7 text-base text-grey-500" />
                      <span className="error">
                        <ErrorMessage name="passwordConfirmation" />
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="button w-96 op-btn-primary mb-3"
                      // onClick={() => this.props.history.push('select-domain')}
                    >
                      Take Me To Dashboard
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

export default withRouter(NewPassword);
