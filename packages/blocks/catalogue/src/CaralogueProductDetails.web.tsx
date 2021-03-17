import React from "react";
/**
 * Components
 */
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import RefreshIcon from "@material-ui/icons/Refresh";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../components/src/GenericModal.web";
import { Switch } from "@material-ui/core";
import Select from "react-select";
import RichTextEditor from 'react-rte';
import * as Yup from "yup";


/**
 * Controller
 */
import CatalogueController, { Props } from "./CatalogueController.web";
import { uploadIcon } from "./assets";
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

const statusOption = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// const [selectedstatusOption, setSelectedstatusOption] = React.useState();

class CaralogueProductDetails extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }
  // Customizable Area Start

  // Customizable Area End
  render() {
    return (
      <>
        <div className="admin-page-title-wrapper justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="op-btn-primary-transparent"
            // onClick={this.onMenuToggle}
            >
              {/* <img src={menuIcon} alt="Menu" className="h-9" /> */}
            </button>
            <p className="admin-page-title">{configJSON.title}</p>
          </div>
        </div>
        {/* Page Content */}
        <div className="admin-body-content">
          <Formik
            initialValues={{
              productName: this.state.productName || "",
              sku: this.state.sku || "",
              brand: this.state.brand || "",
              category: this.state.category || "",
              status: this.state.status || "",
              description: "",
              active: false,


            }}
            validationSchema={Yup.object().shape(
              this.state.AddProductsSchema)}
            onSubmit={
              (values) => {
                console.log("values", values)
                { this.createCategory(values) }
              }
            }
            enableReinitialize
            render={({ values, setFieldValue, isSubmitting }) => {
              return (
                <Form>
                  {/* <GenericBackdrop
                            open={this.state.loader}
                            /> */}
                  <Field id="productId" name="productId" type="hidden" />
                  <div className="grid grid-cols-2 gap-12 pb-8">
                    <div>
                      <div className="flex -mx-4">
                        <div className="w-3/12 px-4 mb-10">
                          <input
                            accept="image/*"
                            className="hidden"
                            id="productImage"
                            multiple
                            type="file"
                            onChange={
                              (e: any) => console.log("Image", e.target?.files?.[0])
                              // this.handleImageUpload
                            }
                          />
                          <div className="field-wrapper relative mb-6">
                            <label htmlFor="productName">Product Image</label>
                          </div>
                          <label htmlFor="productImage">
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
                            <ErrorMessage name="productImage" />
                          </span>
                        </div>
                        <div className="w-9/12 px-4">
                          <div className="field-wrapper relative mb-6">
                            <label htmlFor="productName">Product name*</label>
                            <Field
                              id="productName"
                              name="productName"
                              placeholder="Start typing…"
                            />

                            <span className="error">
                              <ErrorMessage name="productName" />
                            </span>
                          </div>
                          <div className="field-wrapper mb-6 relative">
                            <label htmlFor="sku">Sku*</label>
                            <Field
                              id="sku"
                              name="sku"
                              placeholder="Start typing…"
                            />

                            <span className="error">
                              <ErrorMessage name="sku" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="material-ui-select field-wrapper mb-6 relative">
                          <label htmlFor="meta_title mb-2">Brand*</label>
                          <Field
                            type="text"
                            as="select"
                            name="brand"
                            autoComplete="off"
                            defaultValue=""

                          >
                            <option value="" disabled>Please Select</option>
                            {this.state.brandData.map((brand: any, index) => (
                              <option key={index} value={brand.label} >
                                {brand.label}
                              </option>
                            ))}
                          </Field>
                          <span className="error">
                            <ErrorMessage name="brand" />
                          </span>
                        </div>
                        <div className="material-ui-select field-wrapper mb-6 relative">
                          <label htmlFor="category">Category*</label>
                          <Field
                            type="text"
                            as="select"
                            name="category"
                            autoComplete="off"
                            defaultValue=""
                          >
                            <option value={""} disabled>Please Select</option>
                            {this.state.categoryData.map((category: any, index) => (
                              <option key={index} value={category.label} >
                                {category.label}
                              </option>
                            ))}
                          </Field>
                          <span className="error">
                            <ErrorMessage name="category" />
                          </span>

                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="field-wrapper mb-6 relative h-72 ">
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

                      </div>
                      <div className="flex">
                        <div className="field-wrapper mb-6 relative mr-8">
                          <label htmlFor="active">Is Active?</label>
                          <div>
                            {/* <Switch
                              name="active"
                              onChange={(e: any): void => {
                                setFieldValue("active", e.target.checked);
                              }}/> */}
                            <div className="flex items-center justify-between mt-2 ml-2">
                              <label className="switch mr-6 relative inline-block">
                                <input
                                  type="checkbox"
                                  checked={values.active}
                                  onChange={(e: any): void => {
                                    setFieldValue("active", e.target.checked);
                                  }}
                                />
                                <span className="slider round absolute" />
                              </label>

                            </div>
                          </div>
                          {/* <img src={filled} alt="" /> */}
                          <span className="error">
                            <ErrorMessage name="active" />
                          </span>
                        </div>
                        <div className="material-ui-select field-wrapper relative flex-grow ">
                          <label htmlFor="meta_description">Status*</label>
                          <Field
                            type="text"
                            as="select"
                            name="status"
                            autoComplete="off"
                            defaultValue=""
                          >
                            <option value="" disabled>Please Select</option>
                            {statusOption.map((status: any, index) => (
                              <option key={index} value={status.label} >
                                {status.label}
                              </option>
                            ))}
                          </Field>

                          <span className="error">
                            <ErrorMessage name="status" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12 border-t border-light-300 py-8" />
                  <div className="flex items-center justify-end mt-12">
                    <button
                      type="submit"
                      className="button op-btn-primary flex items-center mr-2 "
                    // disabled={isSubmitting}
                    >
                      Add Product
                      {/* {isSubmitting && (
                        <RefreshIcon
                          style={{
                            fontSize: 16,
                            marginLeft: 10,
                          }}
                          className="op-rotate"
                        />
                      )} */}
                    </button>
                    <button
                      type="button"
                      className="button op-btn-light"
                      onClick={() => {
                        // @ts-ignore
                        this.props.history.push("/catalogues")
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
      </>
    );
  }
}

//@ts-ignore
export default withRouter(CaralogueProductDetails);
