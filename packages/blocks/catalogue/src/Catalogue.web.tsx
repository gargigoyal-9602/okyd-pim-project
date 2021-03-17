import React from "react";
/**
 * Components
 */
import { Link, withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../../components/src/Sidebar";
import { img } from "./assets";
import NoCatalogueFound from "./NoCatalogueFound.web";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
/**
 * Controller
 */
import CatalogueController, { Props } from "./CatalogueController.web";
import { isEmpty } from "lodash";
/**
 * Assets
 */

// import { validationSchema } from './Categoriessubcategories.web.validation';

export const configJSON = require("./config");

// const Pagination = () => {
//   return (
//     <>
//       <div className="flex justify-between pt-10 pagination">
//         <div>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-12 font-bold color-grey px-10"
//           >
//             <i className="las la-angle-left pr-2" />
//             Prev
//           </a>
//         </div>
//         <div className="flex">
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey  active mr-2 font-14 color-black font-bold"
//           >
//             1
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey  mr-2 color-black font-14 font-bold"
//           >
//             2
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             3
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             4
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-14 color-black font-bold"
//           >
//             5
//           </a>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey font-14 color-black font-bold"
//           >
//             6
//           </a>
//         </div>
//         <div>
//           <a
//             href="#"
//             className="h-w-36 rounded-lg flex items-center justify-center bg-grey mr-2 font-12 font-bold color-grey  px-10"
//           >
//             Next
//             <i className="las la-angle-right pl-2" />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

class Catalogue extends CatalogueController {
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
                    <p className="text-primary-light-xs">
                      Trails logged today
                    </p>
                    <p className="text-secondary-base text-sm font-bold">
                      298
                    </p>
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
                    <p className="text-secondary-base text-sm font-bold">
                      20
                    </p>
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
                this.state.menuCollapsed
                  ? "admin-body-collapsed"
                  : "admin-body"
              }
            >
              <div className="flex justify-between py-6">
                <div className="flex items-center" onClick={this.onMenuToggle}>
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 mr-6 border">
                    <i className="las la-arrows-alt-h text-primary-light" />
                  </div>
                  <h2 className="font-20 font-bold">Products</h2>
                </div>

                <div className="flex">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gray-200 border mr-2 ">
                    <i className="las la-search " />
                  </div>

                  <Link
                    to="/catalogues/add"
                    className="op-btn-transparent h-9"
                  >
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center bg-blue-500 border text-white"
                    // onClick={() => this.props.history.push("catalogues/add")}
                    >
                      <i className="las la-plus-circle " />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="">
                {isEmpty(this.state.displayProducts) ? (
                  <NoCatalogueFound />
                ) : (
                    <>
                      <div className=" p-6 bg-white">
                        <div className="bg-transparent-200 grid grid-cols-9 gap-4 font-bold px-8 py-3 my-6 font-12">
                          <div className="col-span-2 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            {/* <label className="okyd-container-checkbox">
                            <input type="checkbox" checked />
                            <span className="okyd-checkmark" />
                          </label> */}
                            <button
                              type="button"
                              className="flex items-center op-btn-transparent text-primary-light-xs font-bold"
                              onClick={this.handleSortingName}
                            >
                              Name
                            {this.state.sortName === "asc" ? (
                                <i className="las la-sort-alpha-down ml-3 text-lg" />
                              ) : (
                                  <i className="las la-sort-alpha-up ml-3 text-lg" />
                                )}
                            </button>
                          </div>
                          <div className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            Category
                        </div>
                          <div className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            Qty In Stock
                        </div>
                          <div className="col-span-3 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            <button
                              type="button"
                              className=""
                              onClick={this.handleSortingPricing}
                            >
                              Pricing
                            {this.state.sortPricing !== "desc" ? (
                                <i className="las la-sort-alpha-down ml-3 text-lg" />
                              ) : (
                                  <i className="las la-sort-alpha-up ml-3 text-lg" />
                                )}
                            </button>
                          </div>
                          <div className=" flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            Status
                        </div>
                          <div className=" flex items-center op-btn-transparent text-primary-light-xs font-bold">
                            Active
                        </div>
                        </div>

                        {/* display products */}

                        {this.state.displayProducts.map(
                          (data: any, index: any) => (
                            <div
                              key={data.id}
                              className="border grid grid-cols-9 gap-4 px-8 py-4 rounded-lg mb-2 bg-gray-50"
                            >
                              <div className="col-span-2 flex items-center">
                                <label className="okyd-container-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={data.checkboxStatus}
                                    onChange={(e: any) =>
                                      this.handleCheckBox(
                                        index,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span className="okyd-checkmark" />
                                </label>
                                <img src={img} alt="" className="hw-46" />
                                <div className=" pl-4">
                                  <p className="at-col-value font-bold">
                                    {data.attributes.name}
                                  </p>
                                  <p className="at-col-title">
                                    {data.attributes.sku}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-center flex-col">
                                <div className="text-primary-light-sm inline-block font-bold bg-light-200 py-1 px-3 rounded-md mr-2">
                                  {data.attributes.category.name}
                                </div>
                              </div>
                              <div className="flex justify-center flex-col">
                                <p className="at-col-value">
                                  {data.attributes.stock_qty}
                                </p>
                                <p className="at-col-title">Qty.</p>
                              </div>
                              <div className="col-span-3 flex items-center ">
                                <div className="list-inner-divs">
                                  <p className="at-col-value">
                                    {/* {data.currencySymbol} */}
                                  Rs.{data.attributes.price}
                                  </p>
                                  <p className="at-col-title">Base</p>
                                </div>
                                {/* <div className="list-inner-divs">
                                <p className="at-col-value">
                                  {data.currencySymbol}
                                  {data.price.wholesale}
                                </p>
                                <p className="at-col-title">Wholesale</p>
                              </div>
                              <div className="list-inner-divs">
                                <p className="at-col-value">
                                  {data.currencySymbol}
                                  {data.price.highVol}
                                </p>
                                <p className="at-col-title">
                                  High Volume price
                                </p>
                              </div> */}
                              </div>
                              <div className="flex items-center">
                                <div className="status w-auto text-center mr-2">
                                  <span className="dots-for-status green-dot " />

                                  {data.attributes.availability === "in_stock"
                                    ? "Available"
                                    : "Unavailable"}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="switch mr-6 relative inline-block">
                                  <input
                                    type="checkbox"
                                    checked={data.attributes.active}
                                    onChange={(e: any) =>
                                      this.handleActiveStatusOfProduct(
                                        e.target.checked,
                                        data.id
                                      )
                                    }
                                  />
                                  <span className="slider round absolute" />
                                </label>
                                <div className="flex items-center justify-center border h-9 w-9 rounded-lg">
                                  <i className="las la-ellipsis-h" />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      {/* <Pagination /> */}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>

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
      </>
    );
  }
}

//@ts-ignore
export default withRouter(Catalogue);
