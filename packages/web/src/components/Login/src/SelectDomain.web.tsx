// @ts-nocheck

import React from 'react';
import { img1, img2, img3 } from './assets';
import { isEmpty } from 'lodash';

// Customizable Area Start
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//@ts-ignore
// Customizable Area End

import EmailAccountLoginController, {
  Props
} from 'blocks/email-account-login/src/EmailAccountLoginController.web';

class SelectDomain extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area Ends
  }

  render() {
    const lsdomain = JSON.parse(localStorage.getItem('domain') || '[]');
    return (
      <div className="outer-wrapper min-h-screen">
        <div className="upper-wrapper">
          <div className="">
            <div class="flex flex-wrap -mx-3 overflow-hidden sm:-mx-px md:-mx-3 lg:-mx-3 xl:-mx-3">
              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img1} alt="" className="mx-auto"/>
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img2} alt="" className="mx-auto"/>
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>

              <div class="my-3 px-3 w-1/3 overflow-hidden sm:my-px sm:px-px md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/3">
                <div className="top-infomation text-white text-center">
                  <img src={img3} alt="" className="mx-auto"/>
                  <h5 className="">Some Title Goes Here</h5>
                  <p>Some description goes here. Some description goes here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="botton-wrapper">
          <div className="inner-box">
            <h4 className="text-3xl text-gray-900 font-bold text-center leading-10 mb-4">Select Your Domain</h4>
            <p className="text-center text-sm tracking-wide leading-5 mb-11 text-gray-400">
              Select your OKYD subscriber domain to continue
            </p>
            <div className="mb-12">
              {lsdomain.length ? (
                lsdomain.map(dom => (
                  <label
                    className="radio-container active"
                    key={dom.id}
                    active={
                      this.state.selectedDomain === dom.domain_name
                        ? true
                        : false
                    }
                  >
                    {dom.domain_name}
                    <input
                      type="radio"
                      name="radio"
                      value={dom.domain_name}
                      {...this.btnSelectDominWebProps}
                    />
                    <span className="checkmark" />
                  </label>
                ))
              ) : (
                <h6>No Domain Available</h6>
              )}
            </div>
            <form>
              <div className="">
                <button
                  type="submit"
                  className="button w-96 op-btn-primary mb-3"
                  onClick={e => {
                    e.preventDefault(), this.handleDomainSelection();
                  }}
                  // onClick={() =>
                  //   this.props.history.push('email-account-Login-welcome')
                  // }
                >
                  Continue
                </button>
                <button
                  type="button"
                  className="button w-96 op-btn-secondary"
                  onClick={() =>
                    this.props.history.push('email-acount-login-signin')
                  }
                >
                  Change Account
                </button>
              </div>
            </form>
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

export default withRouter(SelectDomain);
