// @ts-nocheck

import React from "react";

// Customizable Area Start
import { filled, img1, img2, img3 } from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export const configJSON = require("../../email-account-login/src/config");
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//@ts-ignore
// Customizable Area End

import NewPasswordController, { Props } from "./NewPasswordController.web";

class ForgotPwd extends NewPasswordController {
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
            <div class="flex flex-wrap -mx-3 overflow-hidden sm:-mx-px md:-mx-3 lg:-mx-3 xl:-mx-3">
              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img1} alt="" className="mx-auto" />
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img2} alt="" className="mx-auto" />
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
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
              Lost your password?
            </h4>
            <h4 className="text-2xl text-gray-900 font-bold text-center leading-10 mb-4 w-full">
              Enter your details to recover.
            </h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              Enter your email and we’ll email you the further instructions
            </p>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object().shape(this.state.EmailOnlySchema)}
              onSubmit={(values) => this.handleForgotPassword(values)}
              enableReinitialize
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="grid-cols-1 ">
                    <div className="mb-6 relative field-wrapper">
                      <label>Email</label>
                      <Field
                        type="text"
                        name="email"
                        placeholder={configJSON.placeHolderEmail}
                        className="w-full"
                      />
                      <i className="las la-envelope-open line-icons absolute right-0 top-7 text-base text-grey-500" />
                      <span className="error">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="button w-96 op-btn-primary mb-3"
                      // onClick={() =>
                      //   this.props.history.push("email-send-successfully")
                      // }
                    >
                      Recover
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
export default withRouter(ForgotPwd);
