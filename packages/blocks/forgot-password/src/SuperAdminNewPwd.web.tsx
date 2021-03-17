// @ts-nocheck

import React from "react";

// Customizable Area Start
import { key, superAdminImg } from "./assets";

import { withRouter } from "react-router-dom";
//@ts-ignore
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

class SuperAdminNewPwd extends ForgotPasswordController {
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
        <div className="upper-wrapper ">
          <img src={superAdminImg} alt="" className="admin-img" />
        </div>
        <div className="botton-wrapper">
          <div className="inner-box">
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">Create New Password For Your Admin Account</h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">Before we continue, set your password</p>
            <form>
              <div className="field-wrapper mb-6 relative">
                <label>Password</label>
                <input type="password" placeholder="Enter new password" />
                <img src={key} alt="" />
              </div>
              <div className="field-wrapper mb-6 relative">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm new password" />
                <img src={key} alt="" />
              </div>

              <div className="mt-12">
                <button className="button w-96 op-btn-primary mt-5">
                  Take Me To Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="copyright-info">copyright 2020 okyd</p>
      </div>
    );
  }
}

// Customizable Area Start

// Customizable Area End
export default withRouter(SuperAdminNewPwd);
