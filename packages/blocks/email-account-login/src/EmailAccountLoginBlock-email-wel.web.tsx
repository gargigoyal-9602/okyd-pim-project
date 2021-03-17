// @ts-nocheck

import React from "react";

// Customizable Area Start
import "./EmailAccountLogin.css";
import { withRouter, Link } from "react-router-dom";
import { lock, okydLogo } from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export const configJSON = require("./config");
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//@ts-ignore
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController.web";

class EmailAccountLoginBlockemailwel extends EmailAccountLoginController {
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
          <img
            src={this.props.match?.params?.id ? lock : okydLogo}
            alt=""
            className="okyd-logo"
          />
        </div>
        <div className="botton-wrapper">
          <div className="inner-box">
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">Sign In to Get Started</h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">Welcome example@example.com</p>
            <Formik
              initialValues={{
                password: "",
                rememberMe: false
              }}
              validationSchema={Yup.object().shape(
                this.state.PasswordOnlySchema
              )}
              onSubmit={(values) => this.doEmailLogIn(values)}
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
                        placeholder={configJSON.placeHolderPassword}
                        className="w-full"
                      />
                      <i className="las la-lock line-icons absolute right-0 top-7 text-base text-grey-500" />
                      <span className="error">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                  </div>
                  <div className="links-wrapper">
                    <div className="relative radios-one">
                      <input type="radio" id="test1" name="radio-group"
                        checked={this.state.checkedRememberMe}
                        {...this.btnRememberMeProps}
                      />
                      <label htmlFor="test1">Remember Me</label>
                    </div>
                    <div>
                      <span>
                        <Link to='/forget-password'>Recover Password</Link>
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="button w-full op-btn-primary mb-3"
                    >
                      Sign In
                </button>
                    <button
                      className="button w-full op-btn-secondary"
                      onClick={() =>
                        this.props.history.push("email-acount-login-signin")
                      }
                    >
                      Wrong Email? Go Back
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

export default withRouter(EmailAccountLoginBlockemailwel);
