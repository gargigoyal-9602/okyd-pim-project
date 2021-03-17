// @ts-nocheck

import React from "react";

// Customizable Area Start
import { filled, superAdminImg } from "./assets";

import { withRouter } from "react-router-dom";
//@ts-ignore
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

class SuperAdminPwdRecovery extends ForgotPasswordController {
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
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">
              Lost your password? Enter your details to recover.
            </h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              Enter your email and we’ll email you the further instructions
            </p>
            <form>
              <div className="field-wrapper mb-6 relative">
                <label>Email</label>
                <input type="email" placeholder="Enter Email Id" />
                <img src={filled} alt="" />
              </div>

              <div className="mt-12">
                <button
                  className="button w-96 op-btn-primary mt-5"
                  onClick={() =>
                    this.props.history.push("/email-send-successfully")
                  }
                >
                  Recover
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
export default withRouter(SuperAdminPwdRecovery);
