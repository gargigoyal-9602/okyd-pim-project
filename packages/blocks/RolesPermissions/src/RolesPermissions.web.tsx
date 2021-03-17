import React from "react";
/**
 * Components
 */
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import RefreshIcon from '@material-ui/icons/Refresh';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../components/src/GenericModal.web";
import Switch from "../../../components/src/Switch";
import GenericBackdrop from "../../../components/src/GenericBackdrop";
import Sidebar from "../../../components/src/Sidebar";
/**
 * Controller
 */
import RolesPermissionsController, { Props } from "./RolesPermissionsController.web";
/**
 * Assets
 */
import {
  menuDownIcon,
  logsWighBgActiveIcon,
  timeWithBgIcon,
  deleteIcon,
  updateIcon,
  searchIcon,
  addIcon,
  atozIcon
} from "./assets";
import { validationSchema } from './RolesPermissions.web.validation';

export const configJSON = require("./config");

interface FormValues {
  roleId: string | null | undefined;
  roleName: string | null | undefined;
  module_roles_attributes: any;
}

class RolesPermissions extends RolesPermissionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Table Row
  tableRow = (roleDetails: any) => {
    return (
      <div className="at-list-row grid-cols-adminRolesPermissionsListLayout">
        <div className="at-list-col">
          <h4 className="at-col-value font-bold">
            {roleDetails?.attributes?.name}
          </h4>
          {/* <p className="at-col-title">Assigned Count</p> */}
        </div>
        <div className="at-list-col">
          <h4 className="at-col-value">
            {roleDetails?.attributes?.modules.map((module: any, index: number) => (
              <React.Fragment key={String(index)}>
                {module.module_name}, {' '}
                {module.sub_modules && module.sub_modules.length > 0 && (
                  <React.Fragment>
                    {module.sub_modules.map((sub_module: any, subIndex: number) => (
                      <React.Fragment key={String(subIndex)}>
                        {sub_module}, {' '}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
            {roleDetails?.attributes?.name}
          </h4>
          <p className="at-col-title">Modules, Submodules Covered</p>
        </div>
        {/* View Details */}
        <div className="at-list-col flex items-center justify-end">
          {/* <button type="button" className="op-btn-transparent h-9">
            <img src={duplicateIcon} alt="Duplicate" className="h-9" />
          </button> */}
          <button type="button" className="op-btn-transparent h-9" onClick={() => {
            this.openUpdateRolesModalHandler(roleDetails?.attributes?.id)
            this.handleSortingRoleDataByName()
          }}>
            <img src={updateIcon} alt="Duplicate" className="ml-3 h-9" />
          </button>
          <button type="button" className="op-btn-transparent h-9" onClick={() => {
            this.deleteRolesHandler(roleDetails?.attributes?.id)
            this.handleSortingRoleDataByName()
          }}>
            <img src={deleteIcon} alt="Duplicate" className="ml-3 h-9" />
          </button>
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
                <button className="op-btn-transparent h-9">
                  <img src={searchIcon} alt="Duplicate" className="h-9" />
                </button>
                <button className="op-btn-transparent h-9" onClick={this.openRolesModalHandler}>
                  <img src={addIcon} alt="Duplicate" className="ml-3 h-9" />
                </button>
              </div>
            </div>
            {/* Page Content */}
            <div className="admin-body-content">
              <div className="at-list mb-4">
                <div className="grid gap-5 items-center grid-cols-adminRolesPermissionsListLayout bg-transparent-200 rounded px-5 py-3">
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold" onClick={this.handleSortingRoleDataByName}>
                    Name
                    {this.state.sortOrder === 'asc' ? <i className="las la-sort-alpha-down ml-3 text-lg" /> :
                      < i className="las la-sort-alpha-up ml-3 text-lg" />}
                  </button>
                  <button type="button" className="flex items-center op-btn-transparent text-primary-light-xs font-bold">
                    Permissions Assigned
                  </button>
                  <div />
                </div>
                {/* Roles List */}
                {this.state.rolesData.length > 0 && (
                  <React.Fragment>
                    {this.state.rolesData.map(
                      (role: any, index: number) => {
                        return (
                          <React.Fragment key={String(index)}>
                            {this.tableRow(role)}
                          </React.Fragment>
                        );
                      }
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Create Roles */}
        <Modal visible={this.state.rolesCreateModal} onClose={this.closeRolesModalHandler} bodyStyles="sm:max-w-screen-sm">
          <Formik
            initialValues={{
              roleId: this.state.roleDetailsData?.attributes?.id || '',
              roleName: this.state.roleDetailsData?.attributes?.name || '',
              module_roles_attributes: this.state.attributeData
            }}
            validationSchema={validationSchema}
            onSubmit={(
              values: FormValues,
              { setSubmitting }: FormikHelpers<FormValues>
            ) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                this.createRole(values);
                setSubmitting(false);
              }, 500);
              this.handleSortingRoleDataByName()
            }}
            enableReinitialize
            render={({ values, setFieldValue, isSubmitting }) => {
              return (
                <Form>
                  <GenericBackdrop open={this.state.loader} />
                  <div className="text-primary-light-sm font-bold mb-12">
                    {values.roleId !== '' ? 'Update Role' : 'Create New Role'}</div>
                  <Field id="roleId" name="roleId" type="hidden" />
                  <div className="field-wrapper mb-6 relative">
                    <label htmlFor="roleName">Role Name*</label>
                    <Field id="roleName" name="roleName" placeholder="Start typing…" />
                    {/* <img src={filled} alt="" /> */}
                    <span className="error">
                      <ErrorMessage name="roleName" />
                    </span>
                  </div>
                  <div className="text-secondary-lg font-bold mb-7 mt-12">Permissions</div>
                  {/* Table Header */}
                  <div className="grid gap-5 items-center grid-cols-permissionsListLayout bg-transparent-200 rounded px-5 py-4">
                    <div className="text-primary-light-xs font-bold">Module / Sub-Module</div>
                    <div className="text-primary-light-xs font-bold text-center">Create</div>
                    <div className="text-primary-light-xs font-bold text-center">Update</div>
                    <div className="text-primary-light-xs font-bold text-center">Delete</div>
                    <div className="text-primary-light-xs font-bold text-center">View</div>
                  </div>
                  <div className="grid gap-2 px-2 overflow-auto h-80">
                    {/* Table Body */}
                    {/* Permission */}
                    {this.state.attributeData.length > 0 && values.module_roles_attributes.length > 0 && (
                      <>
                        {this.state.attributeData.map((module: any, index: number) => {
                          const fieldName = `module_roles_attributes.${index}`;
                          return (
                            <React.Fragment key={`module_${String(index)}`}>
                              <div className="grid gap-5 items-center grid-cols-permissionsListLayout bg-light-200 rounded-xl px-5 py-6">
                                <div className={`${module.parent_id ? 'text-primary-light-xs justify-end' : 'text-secondary-base justify-between'}  text-base font-bold flex items-center`}>
                                  {module.name}
                                  {/* <button type="button" className="op-btn-transparent">
                                    <img src={expandIcon} alt="" className="ml-3 h-9" />
                                  </button> */}
                                </div>
                                <Field name={`${fieldName}.id`} id={`${fieldName}.id`} type="hidden" />
                                <div className="text-primary-light-xs font-bold text-center">
                                  <Switch
                                    name={`${fieldName}.create_action`}
                                    checked={values.module_roles_attributes[index].create_action}
                                    onChange={(e: any): void => {
                                      setFieldValue(`${fieldName}.create_action`, e.target.checked);
                                    }}
                                  />
                                </div>
                                <div className="text-primary-light-xs font-bold text-center">
                                  <Switch
                                    name={`${fieldName}.update_action`}
                                    checked={values.module_roles_attributes[index].update_action}
                                    onChange={(e: any): void => {
                                      setFieldValue(`${fieldName}.update_action`, e.target.checked);
                                    }}
                                  />
                                </div>
                                <div className="text-primary-light-xs font-bold text-center">
                                  <Switch
                                    name={`${fieldName}.delete_action`}
                                    checked={values.module_roles_attributes[index].delete_action}
                                    onChange={(e: any): void => {
                                      setFieldValue(`${fieldName}.delete_action`, e.target.checked);
                                    }}
                                  />
                                </div>
                                <div className="text-primary-light-xs font-bold text-center">
                                  <Switch
                                    name={`${fieldName}.view_action`}
                                    checked={values.module_roles_attributes[index].view_action}
                                    onChange={(e: any): void => {
                                      setFieldValue(`${fieldName}.view_action`, e.target.checked);
                                    }}
                                  />
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        }
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-12">
                    <button type="button" className="button op-btn-light">
                      Cancel
                    </button>
                    <button type="submit" className="button op-btn-primary flex items-center" disabled={isSubmitting}>
                      {values.roleId ? 'Update Role' : 'Create Role'}
                      {isSubmitting && (
                        <RefreshIcon style={{ fontSize: 16, marginLeft: 10 }} className="op-rotate" />
                      )}
                    </button>
                  </div>
                </Form>
              )
            }}
          />
        </Modal>
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
export default withRouter(RolesPermissions);