import React from "react";
/**
 * Components
 */
import { withRouter, Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from "../../../components/src/SwitchWithOutForm";
import Sidebar from "../../../components/src/Sidebar";
/**
 * Controller
 */
import SubCategoriesController, { Props } from "./SubCategoriesController.web";
/**
 * Assets
 */
import {
  menuDownIcon,
  logsWighBgActiveIcon,
  timeWithBgIcon,
  deleteIcon,
  updateIcon,
  // searchIcon,
  addIcon,
  atozIcon,
} from "./assets";

export const configJSON = require("./subCategories.config.js");

interface FormValues {
  roleId: string | null | undefined;
  roleName: string | null | undefined;
  module_roles_attributes: any;
}

class Categoriessubcategories extends SubCategoriesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Table Row
  tableRow = (subCategoryDetails: any) => {
    return (
      <div className="at-list-row grid-cols-categoriesListLayout">
        <div className="at-list-col">
          <h4 className="at-col-value font-bold">
            {subCategoryDetails?.attributes?.name}
          </h4>
          <div className="at-col-title" dangerouslySetInnerHTML={{ __html: subCategoryDetails?.attributes?.description }} />
        </div>
        <div className="at-list-col">
          {subCategoryDetails?.attributes?.categories.length > 0 && (
            <React.Fragment>
              {subCategoryDetails?.attributes?.categories.map((category: any, index: number) => (
                <h4 className="text-primary-light-sm inline-block font-bold bg-light-200 py-1 px-3 rounded-md mr-2" key={String(index)}>
                  {category.name}
                </h4>
              ))}
            </React.Fragment>
          )}
        </div>
        <div className="at-list-col">
          <h4 className="at-col-value">{subCategoryDetails?.attributes?.discount}{subCategoryDetails?.attributes?.discount > 0 ? '%' : ''}</h4>
          <p className="at-col-title">Discount</p>
        </div>
        {/* View Details */}
        <div className="at-list-col flex items-center justify-between">
          <div>
            <Switch
              name="active"
              checked={subCategoryDetails?.attributes?.active}
              onChange={(e: any): void => {
                this.updateActiveStatus(subCategoryDetails?.attributes?.id, e.target.checked);
              }}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="op-btn-transparent h-9"
              onClick={() => {
                //@ts-ignore
                this.props?.history.push(`/sub-categories/edit/${subCategoryDetails?.attributes?.id}`);
              }}
            >
              <img src={updateIcon} alt="Update" className="ml-3 h-9" />
            </button>
            <button type="button" className="op-btn-transparent h-9" onClick={() => {
              this.deleteSubCategoryHandler(subCategoryDetails?.attributes?.id)
              this.handleSortingName()
            }}>
              <img src={deleteIcon} alt="Delete" className="ml-3 h-9" />
            </button>
          </div>
        </div>
      </div>
    );
  }
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
            className={`w-3/12 bg-white flex-shrink-0 ${this.state.menuCollapsed &&
              this.state.userType === configJSON.subscriber
              ? "block"
              : "hidden"
              }`}
          >
            {/* Overview Header */}
            <div className="flex items-center justify-between py-6 px-6 border-b border-light-400 mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
                  <i className="las la-user text-primary-light" />
                </div>
                <div className="ml-3">
                  <p className="text-secondary-base text-sm font-bold">
                    {window.localStorage.getItem("fullname")}

                  </p>
                  <p className="text-primary-light-xs">{this.state.userType}</p>
                </div>
              </div>
              <button className="op-btn-transparent" type="button">
                <img src={menuDownIcon} alt="" className="h-9" />
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
                  <img src={logsWighBgActiveIcon} alt="" className="h-9" />
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
                  <img src={timeWithBgIcon} alt="" className="h-9" />
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
            {/* Page Title */}
            <div className="admin-page-title-wrapper justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="op-btn-primary-transparent"
                  onClick={this.onMenuToggle}
                >
                  <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
                    <i className="las la-arrows-alt-h text-primary-light" />
                  </div>
                </button>
                <p className="admin-page-title">{configJSON.title}</p>
              </div>
              <div className="at-list-col flex items-center justify-end">
                {/* <button className="op-btn-transparent h-9" type="button">
                  <img src={searchIcon} alt="Search" className="h-9" />
                </button> */}
                <Link to="/sub-categories/add" className="op-btn-transparent h-9">
                  <img src={addIcon} alt="Add Category" className="ml-3 h-9" />
                </Link>
              </div>
            </div>
            {/* Page Content */}
            <div className="admin-body-content">
              <div className="at-list mb-4">
                <div className="grid gap-5 items-center grid-cols-categoriesListLayout bg-transparent-200 rounded px-5 py-3">
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold" onClick={this.handleSortingName}>
                    Name
                    {this.state.sortName === 'asc' ? <i className="las la-sort-alpha-down ml-3 text-lg" /> :
                      < i className="las la-sort-alpha-up ml-3 text-lg" />}
                  </button>
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold" >
                    Category
                  </button>
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold" onClick={this.handleSortingDiscount}>
                    Discount Percentage
                    {this.state.sortDiscount !== "desc" ?
                      <i className="las la-sort-alpha-down ml-3 text-lg" /> :
                      < i className="las la-sort-alpha-up ml-3 text-lg" />
                    }
                  </button>
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                    Active
                  </button>
                </div>
                {/* Sub Category List */}
                {this.state.loader ? (
                  <div className="flex justify-center py-6">
                    <CircularProgress />
                  </div>
                ) : (
                    <React.Fragment>
                      {this.state.subCategoryData.length > 0 && (
                        <React.Fragment>
                          {this.state.subCategoryData.map(
                            (subCategory: any, index: number) => {
                              return (
                                <React.Fragment key={String(index)}>
                                  {this.tableRow(subCategory)}
                                </React.Fragment>
                              );
                            }
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* Snackbar for display success and failed messages. */}
        <Snackbar open={this.state.snackBar.show} autoHideDuration={3000} onClose={this.closeSnackBarHandler}>
          <MuiAlert elevation={6} variant="filled" onClose={this.closeSnackBarHandler} severity={this.state.snackBar.type}>
            {this.state.snackBar.message}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(Categoriessubcategories);