import React from "react";
/**
 * Components
 */
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import RefreshIcon from "@material-ui/icons/Refresh";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';
import RichTextEditor from 'react-rte';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import Switch from "../../../components/src/Switch";
import GenericBackdrop from "../../../components/src/GenericBackdrop";
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
  uploadIcon,
  totalProductsIcon,
  totalCategoriesIcon,
} from "./assets";

import { validationSchema } from "./SubCategory.web.validation";

export const configJSON = require("./subCategories.config.js");

interface FormValues {
  subCategoryId: string | null | undefined;
  name: string | null | undefined;
  description: any;
  discount: number | null | undefined;
  active: boolean;
  private: boolean;
  default_category: boolean;
  meta_title: string | null | undefined;
  meta_description: string | null | undefined;
  parent_categories: object | null | undefined;
}

class CategoriesSubcategories extends SubCategoriesController {
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
                    Subscriber-Name
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
                  Product Categories
                </p>
                <p className="text-primary-light-xs">
                  Overall members & trails performance
                </p>
              </div>
              <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                <div>
                  <p className="text-primary-light-xs">Number</p>
                  <p className="text-secondary-base text-sm font-bold">
                    Total Categories
                  </p>
                </div>
                <button className="op-btn-transparent" type="button">
                  <img src={totalCategoriesIcon} alt="" className="h-9" />
                </button>
              </div>
              <div className="flex items-center justify-between py-3 px-5 bg-transparent-200 mb-2">
                <div>
                  <p className="text-primary-light-xs">Total Products</p>
                  <p className="text-secondary-base text-sm font-bold">
                    Number
                  </p>
                </div>
                <button className="op-btn-transparent" type="button">
                  <img src={totalProductsIcon} alt="" className="h-9" />
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
            </div>
            {/* Page Content */}
            <div className="admin-body-content px-8 py-12">
              <Formik
                initialValues={{
                  subCategoryId: '',
                  name: this.state.categoryDetailsData?.attributes?.name || '',
                  description: RichTextEditor.createEmptyValue().toString('html'),
                  discount: this.state.categoryDetailsData?.attributes?.discount || '',
                  active: this.state.categoryDetailsData?.attributes?.active || true,
                  private: this.state.categoryDetailsData?.attributes?.private || false,
                  default_category: this.state.categoryDetailsData?.attributes?.default_category || false,
                  meta_title: this.state.categoryDetailsData?.attributes?.meta_title || '',
                  meta_description: this.state.categoryDetailsData?.attributes?.meta_description || '',
                  parent_categories: this.state.categoryDetailsData?.attributes?.categories[0].id || null,
                }}
                validationSchema={validationSchema}
                onSubmit={(
                  values: FormValues,
                  { setSubmitting }: FormikHelpers<FormValues>
                ) => {
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    this.createSubCategory(values);
                    setSubmitting(false);
                  }, 500);
                }}
                enableReinitialize
                render={({ values, setFieldValue, isSubmitting }) => {
                  return (
                    <Form>
                      <GenericBackdrop open={this.state.loader} />
                      <Field id="subCategoryId" name="subCategoryId" type="hidden" />
                      <div className="grid grid-cols-2 gap-12 pb-8">
                        <div>
                          <div className="flex -mx-4">
                            <div className="w-3/12 px-4">
                              <input
                                accept="image/*"
                                className="hidden"
                                id="categoryImage"
                                multiple
                                type="file"
                                onChange={this.handleImageUpload}
                              />
                              <div className="field-wrapper mb-6 relative">
                                <label htmlFor="categoryName">
                                  Category Image
                                </label>
                              </div>
                              <label htmlFor="categoryImage">
                                <img
                                  src={
                                    this.state.selectedFile &&
                                      this.state.selectedFile !== null
                                      ? this.state.selectedFile
                                      : uploadIcon
                                  }
                                  alt="Upload"
                                  className="w-full"
                                />
                              </label>
                              <span className="error">
                                <ErrorMessage name="categoryImage" />
                              </span>
                            </div>
                            <div className="w-9/12 px-4">
                              <div className="field-wrapper mb-6 relative">
                                <label htmlFor="name">Category name*</label>
                                <Field
                                  id="name"
                                  name="name"
                                  placeholder="Start typing…"
                                />
                                {/* <img src={filled} alt="" /> */}
                                <span className="error">
                                  <ErrorMessage name="name" />
                                </span>
                              </div>
                              <div className="field-wrapper mb-6 relative">
                                <label htmlFor="parent_categories">
                                  Parent Category*
                                </label>
                                <Field
                                  name="parent_categories"
                                  id="parent_categories"
                                  component={Autocomplete}
                                  options={this.state.categoryData}
                                  getOptionLabel={(option: any) => option.name}
                                  renderInput={(params: AutocompleteRenderInputParams) => (
                                    <TextField {...params} className="transparent-input" label="" />
                                  )}
                                />
                                <span className="error">
                                  <ErrorMessage name="parent_categories" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="field-wrapper mb-6 relative">
                            <label htmlFor="discount">Discount*</label>
                            <Field
                              id="discount"
                              name="discount"
                              placeholder="0%"
                            />
                            <span className="error">
                              <ErrorMessage name="discount" />
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="field-wrapper mb-6 relative">
                            <label htmlFor="description">Description</label>
                            <RichTextEditor
                              className="oked-editor"
                              value={this.state.editor}
                              placeholder="Start typing…"
                              onChange={(value: any) => {
                                this.setState({ editor: value });
                                setFieldValue("description", value.toString('html'));
                              }}
                            />
                            <span className="error">
                              <ErrorMessage name="description" />
                            </span>
                          </div>
                          <div className="flex">
                            <div className="field-wrapper mb-6 relative mr-8">
                              <label htmlFor="active">Is Active?</label>
                              <div>
                                <Switch
                                  name="active"
                                  checked={values.active}
                                  onChange={(e: any): void => {
                                    setFieldValue("active", e.target.checked);
                                  }}
                                />
                              </div>
                              {/* <img src={filled} alt="" /> */}
                              <span className="error">
                                <ErrorMessage name="active" />
                              </span>
                            </div>
                            <div className="field-wrapper mb-6 relative mr-8">
                              <label htmlFor="private">Make Private?</label>
                              <div>
                                <Switch
                                  name="private"
                                  onChange={(e: any): void => {
                                    setFieldValue("private", e.target.checked);
                                  }}
                                />
                              </div>
                              {/* <img src={filled} alt="" /> */}
                              <span className="error">
                                <ErrorMessage name="private" />
                              </span>
                            </div>
                            <div className="field-wrapper mb-6 relative">
                              <label htmlFor="default_category">
                                Make Default Category
                              </label>
                              <div>
                                <Switch
                                  name="default_category"
                                  onChange={(e: any): void => {
                                    setFieldValue(
                                      "default_category",
                                      e.target.checked
                                    );
                                  }}
                                />
                              </div>
                              {/* <img src={filled} alt="" /> */}
                              <span className="error">
                                <ErrorMessage name="default_category" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-12 border-t border-light-300 py-8">
                        <div>
                          <div className="field-wrapper mb-6 relative">
                            <label htmlFor="meta_title">Meta Title</label>
                            <Field
                              id="meta_title"
                              name="meta_title"
                              placeholder="Type meta title. This will be added to the HTML"
                            />
                            {/* <img src={filled} alt="" /> */}
                            <span className="error">
                              <ErrorMessage name="meta_title" />
                            </span>
                          </div>
                          <div className="field-wrapper mb-6 relative">
                            <label htmlFor="meta_description">
                              Meta Description
                            </label>
                            <Field
                              id="meta_description"
                              name="meta_description"
                              placeholder="Type meta description. This will be added to the HTML"
                            />
                            {/* <img src={filled} alt="" /> */}
                            <span className="error">
                              <ErrorMessage name="meta_description" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-12">
                        <button
                          type="submit"
                          className="button op-btn-primary flex items-center"
                          disabled={isSubmitting}
                        >
                          Add Sub Category
                          {isSubmitting && (
                            <RefreshIcon
                              style={{ fontSize: 16, marginLeft: 10 }}
                              className="op-rotate"
                            />
                          )}
                        </button>
                        <button
                          type="button"
                          className="button op-btn-light ml-4"
                          onClick={() => {
                            //@ts-ignore
                            this.props?.history.push('/sub-categories');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  );
                }}
              />
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
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(CategoriesSubcategories);
