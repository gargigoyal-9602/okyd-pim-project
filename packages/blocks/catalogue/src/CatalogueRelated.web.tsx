import React from "react";

import { withRouter } from "react-router-dom";
import CatalogueController, { Props } from "./CatalogueController.web";
import { img } from "./assets";

class CatalogueRelated extends CatalogueController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="flex justify-center flex-col items-center mt-10">
          <div className="field-wrapper w-1/2 relative mb-6">
            <label>Search Products</label>
            <input type="text" placeholder="search here" />
            <i className="las la-search absolute -right-0 bottom-5" />
          </div>
          <div className="w-10/12">
            <div className="grid grid-cols-9 gap-4 font-bold px-5 py-3 my-6 font-12 bg-transparent-200 text-gray-500">
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
              <div className=" col-span-2 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                Category
              </div>
              <div className="col-span-3 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                Status
              </div>
              <div className=" col-span-2 flex items-center op-btn-transparent text-primary-light-xs font-bold">
                Buy With
              </div>
            </div>
            {this.state.displayProducts &&
              this.state.displayProducts.map((data: any, index: any) => (
                <div
                  key={data.id}
                  className="border grid grid-cols-9 gap-4 px-8 py-4 rounded-lg mb-2 new-bg-color"
                >
                  <div className="col-span-2 flex items-center">
                    <img src={img} alt="" className="hw-46" />
                    <div className=" pl-4">
                      <p className="at-col-value font-bold">
                        {data.attributes.name}
                      </p>
                      <p className="at-col-title">{data.attributes.sku}</p>
                    </div>
                  </div>
                  <div className=" col-span-2 flex justify-center flex-col">
                    <div className="text-primary-light-sm inline-block font-bold bg-light-200 py-1 px-3 rounded-md mr-2">
                      {data.attributes.category.name}
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <div className="status w-auto text-center mr-2">
                      <span className="dots-for-status green-dot " />

                      {data.attributes.availability === "in_stock"
                        ? "Available"
                        : "Unavailable"}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <label className="switch mr-6 relative inline-block">
                      <input
                        type="checkbox"
                        checked={data.activeStatus}
                        onChange={(e) =>
                          this.handleToggle(index, e.target.checked)
                        }
                      />
                      <span className="slider round absolute" />
                    </label>
                    <div className="border h-9 w-9 rounded-lg flex items-center justify-center ">
                      <i className="las la-trash text-gray-500" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
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
      </>
    );
  }
}
//@ts-ignore
export default withRouter(CatalogueRelated);
