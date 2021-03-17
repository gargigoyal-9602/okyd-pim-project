import React from "react";
/**
 * Components
 */
import { withRouter, Link } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import RefreshIcon from "@material-ui/icons/Refresh";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../components/src/GenericModal.web";
import GenericBackdrop from "../../../components/src/GenericBackdrop";
import Sidebar from "../../../components/src/Sidebar";
import { img } from "./assets";
import Select from "react-select";

/**
 * Controller
 */
import CatalogueController, { Props } from "./CatalogueController.web";
import { isEmpty } from "lodash";
import { Switch } from "@material-ui/core";
import CaralogueProductDetails from "./CaralogueProductDetails.web";
import CatalogueVariation from "./CatalogueVariation.web";
import CatalogueImage from "./CatalogueImage.web";
import CataloguePricing from "./CataloguePricing.web";
import CatalogueRelated from "./CatalogueRelated.web";

/**
 * Assets
 */

// import { validationSchema } from './Categoriessubcategories.web.validation';

export const configJSON = require("./config");

interface FormValues {
  roleId: string | null | undefined;
  roleName: string | null | undefined;
  module_roles_attributes: any;
}

const Tabs = ({ color }: any) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-indigo-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="las la-list pr-2" />
                Primary Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-indigo-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="las la-expand-arrows-alt pr-2" />
                Variations
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-indigo-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="las la-dollar-sign pr-2" />
                Pricing
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-indigo-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="las la-image pr-2" />
                Images
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-indigo-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="las la-industry pr-2" />
                RELATED
              </a>
            </li>
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
            <div className="">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <CaralogueProductDetails />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <CatalogueVariation />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <CataloguePricing />
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <CatalogueImage />
                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                  <CatalogueRelated />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const variationOption = [
  { value: "x", label: "X" },
  { value: "xxl", label: "XXL" },
];

class CaralogueAddProduct extends CatalogueController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="admin-wrapper">
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
              className={`w-3/12 bg-white flex-shrink-0 ${this.state.menuCollapsed &&
                this.state.userType === configJSON.subscriber
                ? "block"
                : "hidden"
                }`}
            >
              {/* Overview Header */}
              <div className="flex items-center justify-between py-6 px-6 border-b border-light-400 mb-6">
                <div className="flex items-center">
                  {/* <img src={menuIcon} alt="" className="h-9" /> */}
                  <div className="ml-3">
                    <p className="text-secondary-base text-sm font-bold">
                      {window.localStorage.getItem("fullname")}
                    </p>
                    <p className="text-primary-light-xs">
                      {this.state.userType}
                    </p>
                  </div>
                </div>
                <button className="op-btn-transparent" type="button">
                  {/* <img src={menuDownIcon} alt="" className="h-9" /> */}
                </button>
              </div>
              {/* Overview Content */}
              <div className="px-6">
                <div className="pb-5">
                  <p className="text-secondary-base text-sm font-bold">
                    Trails Overview
                  </p>
                  <p className="text-primary-light-xs">
                    Overall members & trails performance
                  </p>
                </div>
                <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                  <div>
                    <p className="text-primary-light-xs">Trails logged today</p>
                    <p className="text-secondary-base text-sm font-bold">298</p>
                  </div>
                  <button className="op-btn-transparent" type="button">
                    {/* <img src={logsWighBgActiveIcon} alt="" className="h-9" /> */}
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                  <div>
                    <p className="text-primary-light-xs">
                      Members logged in today
                    </p>
                    <p className="text-secondary-base text-sm font-bold">20</p>
                  </div>
                  <button className="op-btn-transparent" type="button">
                    {/* <img src={timeWithBgIcon} alt="" className="h-9" /> */}
                  </button>
                </div>
              </div>
            </div>
            {/* Admin Body */}
            <div
              className={
                this.state.menuCollapsed ? "admin-body-collapsed" : "admin-body"
              }
            >
              <div className="admin-page-title-wrapper justify-between">
                <div className="flex items-center">
                  <button type="button" className="op-btn-primary-transparent" onClick={this.onMenuToggle} >
                    <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
                      <i className="las la-arrows-alt-h text-primary-light" />
                    </div>
                  </button>
                  <p className="admin-page-title">Add Products</p>
                </div>
              </div>
              <div className="">
                <div className="pt-8 pl-8 pr-16 pb-8 bg-white min-height-tab-wrapper">
                  <Tabs color="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

//@ts-ignore
export default withRouter(CaralogueAddProduct);
