// @ts-nocheck

import React from "react";

// Customizable Area Start
import { withRouter } from "react-router-dom";
import { checked, img1, img2, img3 } from "./assets";

import "./EmailAccountLogin.css";

//@ts-ignore
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

class EmailSendSuccBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    console.log("this", this.props.match.url);
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
              Form Submitted. Check your email.
            </h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              We have sent you an email for
              {this.props.match.url === "/forgot-email-send-successfully"
                ? " Reset Password"
                : " activation"}
            </p>
            <div className="text-center mb-14">
              <img src={checked} alt="" className="mx-auto mb-4" />
              <p className="text-blue-500 text-xl font-bold">
                {this.props.match.url === "/forgot-email-send-successfully"
                  ? "Please check your Email"
                  : "Thank you for registering with us."}
              </p>
            </div>
            <form>
              <div className="">
                <button
                  className="button w-96 op-btn-primary mb-3"
                  onClick={() => this.props.history.push("login")}
                >
                  Back To Home
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

export default withRouter(EmailSendSuccBlock);
