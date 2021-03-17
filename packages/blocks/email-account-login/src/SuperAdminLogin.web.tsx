// @ts-nocheck

import React from "react";

// Customizable Area Start
import { withRouter } from "react-router-dom";
import { filled, lock, superAdminImg } from "./assets";

import "./EmailAccountLogin.css";

//@ts-ignore
// Customizable Area End

import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController";

class SuperAdminLogin extends EmailAccountLoginController {
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
          <img src={superAdminImg} alt="superAdminImg" className="admin-img" />
        </div>
        <div className="botton-wrapper">
          <div className="inner-box">
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">Welcome back Admin Sign In to get started</h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">Login to continue</p>
            <form>
              <div className="field-wrapper mb-6 relative">
                <label>Email</label>
                <input type="email" placeholder="Enter Email Id" />
                <img src={filled} alt="" />
              </div>
              <div className="field-wrapper mb-6 relative">
                <label>Password</label>
                <input type="password" placeholder="Enter password" />
                <img src={lock} alt="" />
              </div>

              <div className="links-wrapper">
                <div className="relative radios-one">
                  <input type="radio" id="test1" name="radio-group" checked />
                  <label for="test1">Remember Me</label>
                </div>
                <div>
                  <span>
                    <a
                      href="#"
                      onClick={() =>
                        this.props.history.push("/super-admin-new-password")
                      }
                    >
                      Recover Password
                    </a>
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <button className="button w-full op-btn-primary mt-5">
                  Sign In
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
export default withRouter(SuperAdminLogin);
