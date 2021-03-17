import React from "react";
/**
 * Components
 */
export const configJSON = require("./config.js");

import { withRouter } from "react-router-dom";
import Sidebar from "../../../components/src/Sidebar";
/**
 * Controller
 */

import { logo, dashboardIcon, menuIcon, menuDownIcon } from "./assets";

import DashboardController, { Props } from "./DashboardControllerNew.web";

class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    return (
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
                <i className="las la-user-plus" />
                <div className="ml-3">
                  <p className="text-secondary-base text-sm font-bold">
                    {/* {this.state.message.slice(8)} */}
                    {window.localStorage.getItem("fullname")}

                  </p>
                  <p className="text-primary-light-xs">Subscriber</p>
                </div>
              </div>
              <button className="op-btn-transparent" type="button">
                <img src={menuDownIcon} alt="" className="h-9" />
              </button>
            </div>

            {/* Overview Content start*/}
            {/* Overview Content end*/}
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
                  {/* <i className="las la-bars text-gray-500" /> */}
                  <i className="las la-arrows-alt-h text-primary-light" />
                </div>
                <h2 className="text-xl font-bold">Dashboard</h2>
              </div>

              <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 border">
                <i className="las la-search text-gray-500" />
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-center h-64">
                <p className="text-xl text-indigo-600 font-semibold capitalize">
                  {this.state.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(Dashboard);
