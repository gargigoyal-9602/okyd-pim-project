import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withRouter } from "react-router-dom";
import CatalogueController, { Props } from "./CatalogueController.web";

class CataloguePricing extends CatalogueController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="pt-8 bg-white ">
          <Accordion className=" mb-4">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="accordion w-full text-left outline-none transition duration-500 ease-in-out focus:outline-none">
                <div>
                  <h4 className="font-bold text-base text-black mb-4">
                    Base Price List
                  </h4>
                  <form className="flex justify-between ">
                    <div className="w-6/12 field-wrapper mb-6 relative">
                      <label className="">Enter Initial Price</label>
                      <input type="text" placeholder="0.0" className="w-full" />
                      <i className="las la-arrows-alt-v input-field-icons" />
                    </div>
                    <div className="flex justify-end flex-col">
                      <a
                        href=""
                        className="rounded-lg p-3 text-sm font-bold text-blue-600 border-blue-600 border-2"
                      >
                        Add Discounts
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="panel overflow-hidden pt-6 w-full">
                <div className="border grid grid-cols-7 gap-4 px-8 py-4 rounded-lg mb-2 bg-gray-100">
                  <div className=" flex items-center">
                    <div className=" pl-4">
                      <p className=" font-bold">Discount 1</p>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">From Quantity</p>
                    <p className="text-gray-600 font-bold text-sm">0.0</p>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Percentage</p>
                    <p className="text-gray-600 font-bold text-sm">0.0 %</p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Date From</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col ">
                    <p className="text-gray-600 text-sm mb-2">Date To</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Final Price</p>
                    <p className="text-black-600 font-bold text-sm">9.5</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center border rounded-lg border-gray-400 w-8 h-8 bg-white">
                      <i className="las la-trash text-gray-600 text-base" />
                    </div>
                  </div>
                </div>

                <div className="border grid grid-cols-7 gap-4 px-8 py-4 rounded-lg mb-2 bg-gray-100">
                  <div className=" flex items-center">
                    <div className=" pl-4">
                      <p className=" font-bold">Discount 1</p>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">From Quantity</p>
                    <p className="text-gray-600 font-bold text-sm">0.0</p>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Percentage</p>
                    <p className="text-gray-600 font-bold text-sm">0.0 %</p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Date From</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col ">
                    <p className="text-gray-600 text-sm mb-2">Date To</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Final Price</p>
                    <p className=" text-black-600 font-bold text-sm">9.5</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center border rounded-lg border-gray-400 w-8 h-8 bg-white">
                      <i className="las la-trash text-gray-600 text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="accordion w-full text-left outline-none transition duration-500 ease-in-out focus:outline-none">
                <div>
                  <h4 className="font-bold text-base text-black mb-4">
                    Base Price List
                  </h4>
                  <form className="flex justify-between ">
                    <div className="w-6/12 field-wrapper mb-6 relative">
                      <label className="">Enter Initial Price</label>
                      <input type="text" placeholder="0.0" className="w-full" />
                      <i className="las la-arrows-alt-v input-field-icons" />
                    </div>
                    <div className="flex justify-end flex-col">
                      <a
                        href=""
                        className="rounded-lg p-3 text-sm font-bold text-blue-600 border-blue-600 border-2"
                      >
                        Add Discounts
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="panel overflow-hidden pt-6 w-full">
                <div className="border grid grid-cols-7 gap-4 px-8 py-4 rounded-lg mb-2 bg-gray-100">
                  <div className=" flex items-center">
                    <div className=" pl-4">
                      <p className=" font-bold">Discount 1</p>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">From Quantity</p>
                    <p className="text-gray-600 font-bold text-sm">0.0</p>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Percentage</p>
                    <p className="text-gray-600 font-bold text-sm">0.0 %</p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Date From</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col ">
                    <p className="text-gray-600 text-sm mb-2">Date To</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Final Price</p>
                    <p className="text-black-600 font-bold text-sm">9.5</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center border rounded-lg border-gray-400 w-8 h-8 bg-white">
                      <i className="las la-trash text-gray-600 text-base" />
                    </div>
                  </div>
                </div>

                <div className="border grid grid-cols-7 gap-4 px-8 py-4 rounded-lg mb-2 bg-gray-100">
                  <div className=" flex items-center">
                    <div className=" pl-4">
                      <p className=" font-bold">Discount 1</p>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">From Quantity</p>
                    <p className="text-gray-600 font-bold text-sm">0.0</p>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Percentage</p>
                    <p className="text-gray-600 font-bold text-sm">0.0 %</p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Date From</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col ">
                    <p className="text-gray-600 text-sm mb-2">Date To</p>
                    <p className=" text-gray-600 font-bold text-sm">
                      12/12/2020
                    </p>
                  </div>
                  <div className=" flex items-center flex-col">
                    <p className="text-gray-600 text-sm mb-2">Final Price</p>
                    <p className=" text-black-600 font-bold text-sm">9.5</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center border rounded-lg border-gray-400 w-8 h-8 bg-white">
                      <i className="las la-trash text-gray-600 text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="flex items-center justify-end mt-12">
            <button
              type="submit"
              className="button op-btn-primary flex items-center mr-2"
            >
              Add Product
            </button>
            <button type="button" className="button op-btn-light" onClick={() => {
              // @ts-ignore
              this.props.history.push("/catalogues")
            }}>
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}
//@ts-ignore
export default withRouter(CataloguePricing);
