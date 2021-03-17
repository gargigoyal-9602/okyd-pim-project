import React from "react";
/**
 * Components
 */
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
// import Modal from "@material-ui/core/Modal";
import Select from "react-select";
import Modal from "../../../components/src/GenericModal.web";
import { uploadIcon, img } from "./assets";
import * as Yup from "yup";
/**
 * Controller
 */
import CatalogueController, { Props } from "./CatalogueController.web";
import { range } from "lodash";
/**
 * Assets
 */

// import { validationSchema } from './Categoriessubcategories.web.validation';

export const configJSON = require("./config");

const variationOption = [
  { value: "x", label: "X" },
  { value: "xxl", label: "XXL" },
];

const variationTypeOption = [
  { value: "shirt", label: "Shirt" },
  { value: "tshirt", label: "T-shirt" },
];

// const [selectedstatusOption, setSelectedstatusOption] = React.useState();

class CatalogueVariation extends CatalogueController {
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
        <div className="flex pt-8">
          <div className="w-1/6 pt-32 pr-16">
            <form>
              <div className=" material-ui-select field-wrapper mb-6 relative">
                <label>Add Variation </label>
                {/* <select name="country" id="country" title="country">
                  <option value="select country">select country</option>
                  <option value="india">india</option>
                  <option value="germany">germany</option>
                  <option value="caneda">caneda</option>
                </select> */}
                <Select
                  // value={selectedstatusOption}
                  onChange={(e: any) => console.log("e", e)}
                  options={variationTypeOption}
                />
                {/* <i className="las la-angle-down img" /> */}
              </div>
            </form>
          </div>

          <div className="w-5/6">
            <div className=" mb-4 flex justify-between items-center">
              <form className="w-3/12">
                <div className="material-ui-select field-wrapper mb-6 relative">
                  <label>Add Variation</label>
                  {/* <select name="country" id="country2" title="country">
                    <option value="select country">select country</option>
                    <option value="india">india</option>
                    <option value="germany">germany</option>
                    <option value="caneda">caneda</option>
                  </select> */}
                  <Select
                    // value={selectedstatusOption}
                    onChange={(e: any) => console.log("e", e)}
                    options={variationOption}
                  />
                  {/* <i className="las la-angle-down img" /> */}
                </div>
              </form>
              <button
                type="button"
                className="op-btn-primary-light flex font-black items-center"
                onClick={() => this.handleToggleAddVariationModal()}
              >
                Add New Variation Type
              </button>
            </div>
            {/* start */}
            <div className="grid grid-cols-3 gap-4">
              {range(5).map((x, idx) => {
                return (
                  <div className="border rounded-lg p-4 " key={idx}>
                    <div className="flex justify-between items-center">
                      <div className="border h-9 w-9 rounded-lg flex items-center justify-center ">
                        <i className="las la-ellipsis-h" />
                      </div>
                      <label className="switch relative inline-block">
                        <input type="checkbox" />
                        <span className="slider round absolute" />
                      </label>
                    </div>
                    <h4 className="text-base font-bold text-center">XL</h4>
                    <form className="px-4">
                      <div className=" field-wrapper mb-6 relative w-full mt-4">
                        <label className="">Enter Initial Price</label>
                        <input
                          type="text"
                          placeholder="0.0"
                          className="w-full"
                        />
                        <i className="las la-arrows-alt-v input-field-icons" />
                      </div>
                      <div className=" field-wrapper mb-6 relative w-full">
                        <label className="">Enter Initial Price</label>
                        <input
                          type="text"
                          placeholder="0.0"
                          className="w-full"
                        />
                        <i className="las la-arrows-alt-v input-field-icons" />
                      </div>
                      <div className=" w-full mt-4 mb-6">
                        <label className="text-gray-400 text-sm">
                          Add Images
                        </label>
                        <div className="flex mt-2">
                          <img src={img} alt="" className="h-9 w-9 mr-2" />
                          <img src={img} alt="" className="h-9 w-9 mr-2" />
                          <img src={img} alt="" className="h-9 w-9 mr-2" />

                          <div className=" h-9 w-9 flex border rounded-lg items-center justify-center">
                            <label
                              htmlFor="file-input"
                              className="rounded-2xl flex justify-center items-center bg-white h-9 w-9"
                            >
                              <i className="las la-plus text-gray-400" />
                            </label>

                            <input id="file-input" type="file" />
                          </div>
                        </div>
                      </div>
                      <h6 className="text-xs font-bold text-gray-500 mb-4">
                        Configure Pricing
                      </h6>
                      <div className="grid grid-cols-3 gap-4">
                        <div className=" field-wrapper mb-6 relative w-full">
                          <label className="">Base Price</label>
                          <input
                            type="text"
                            placeholder="0.0"
                            className="w-full"
                          />
                          <i className="las la-arrows-alt-v input-field-icons" />
                        </div>
                        <div className=" field-wrapper mb-6 relative w-full">
                          <label className="">High Vol.</label>
                          <input
                            type="text"
                            placeholder="0.0"
                            className="w-full"
                          />
                          <i className="las la-arrows-alt-v input-field-icons" />
                        </div>
                        <div className=" field-wrapper mb-6 relative w-full">
                          <label className="">Wholesale</label>
                          <input
                            type="text"
                            placeholder="0.0"
                            className="w-full"
                          />
                          <i className="las la-arrows-alt-v input-field-icons" />
                        </div>
                      </div>
                    </form>
                  </div>
                );
              })}
            </div>
            {/* end */}
          </div>
          {/* dddd */}
        </div>

        {/* Create Variation Modal */}
        <Modal
          visible={this.state.addNewVariationModal}
          onClose={this.handleToggleAddVariationModal}
          bodyStyles="model-width-622px"
        >
          <div className="flex items-center mb-4">
            <h4 className="text-xl text-secondary-base font-bold">
              Create New Variation Type
            </h4>
          </div>
          <div className="admin-body-content py-12">
            <Formik
              initialValues={{
                variationName: this.state.variationName || "",
                variationCode: this.state.variationCode || "",
                friends: this.state.friends || ""
                //friends: ["jared", "ian", "brent"],
              }}
              validationSchema={Yup.object().shape(
                this.state.NewVariationTypeSchema)}
              onSubmit={
                (values) => console.log("values", values)

              }
              enableReinitialize
              render={({ values }) => {
                return (
                  <Form>
                    <div className="flex">
                      <div className="field-wrapper mb-6 relative flex-grow mr-4">
                        <label htmlFor="variationName">Name*</label>
                        <Field
                          id="variationName"
                          name="variationName"
                          placeholder="Start typing"
                        />
                        <span className="error">
                          <ErrorMessage name="variationName" />
                        </span>
                      </div>
                      <div className="field-wrapper mb-6 relative flex-grow">
                        <label htmlFor="variationCode">Code*</label>
                        <Field
                          id="variationCode"
                          name="variationCode"
                          placeholder="Start typing"
                        />
                        <span className="error">
                          <ErrorMessage name="variationCode" />
                        </span>
                      </div>
                    </div>
                    <div className="flex mt-4">
                      <div>
                        <label className="okyd-container-checkbox">
                          <input type="checkbox" />
                          <span className="okyd-checkmark" />
                        </label>
                      </div>
                      <div className="text-sm font-bold">
                        Is required by default
                      </div>
                    </div>
                    <div className="flex items-center my-10">
                      <h4 className="text-sm text-secondary-base font-bold">
                        List of values
                      </h4>
                    </div>
                    <FieldArray
                      name="friends"
                      render={(arrayHelpers) => (
                        <div>
                          {values.friends && values.friends.length > 0 ? (
                            values.friends.map((friend: any, index: any) => (
                              <div key={index}>
                                <div className="field-wrapper mb-6 relative flex-grow mb-6">
                                  <label htmlFor={`friends.${index}`}>
                                    Variation {index + 1}
                                  </label>
                                  <div className="flex">
                                    <Field
                                      id={`friends.${index}`}
                                      name={`friends.${index}`}
                                      placeholder="Unique code of this variant"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                      className="absolute right-0 top-8"
                                    >
                                      <i className="las la-trash text-gray-400" />
                                    </button>

                                  </div>
                                  <span className="error">
                                    <ErrorMessage name={`friends.${index}`} />
                                  </span>
                                </div>
                                {/* <Field name={`friends.${index}`} /> */}
                              </div>
                            ))
                          ) : (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                {/* show this when user has removed all friends from the list */}
                              Add a variant
                              </button>
                            )}
                          <div className="flex">
                            <button
                              type="button"
                              className="m-auto border-solid border  h-10 w-10 rounded-lg"
                              onClick={() =>
                                arrayHelpers.insert(values.friends.length, "")
                              } // insert an empty string at a position
                            >
                              <i className="las la-plus-circle text-gray-400" />
                            </button>
                          </div>
                        </div>
                      )}
                    />
                    {(values.friends.length === 0) &&
                      <span className="error">
                        <ErrorMessage name="friends" />
                      </span>
                    }
                    <div className="flex items-center justify-between mt-12">
                      <button
                        type="button"
                        className="button op-btn-light"
                        onClick={() => this.handleToggleAddVariationModal()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="button op-btn-primary flex items-center"
                      >
                        Add Product
                      </button>
                    </div>
                  </Form>
                );
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
}

//@ts-ignore
export default withRouter(CatalogueVariation);
