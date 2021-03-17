import React from "react";
/**
 * Components
 */
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Controller
 */
import CatalogueController, { Props } from "./CatalogueController.web";
import { noCatalogueFoundIcon } from "./assets";
/**
 * Assets
 */

// import { validationSchema } from './Categoriessubcategories.web.validation';

interface FormValues {
  roleId: string | null | undefined;
  roleName: string | null | undefined;
  module_roles_attributes: any;
}

class NoCatalogueFound extends CatalogueController {
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
        <div className="h-screen flex items-center justify-center flex-col bg-purple-50">
          <img src={noCatalogueFoundIcon} alt="" />
          <h4 className="text-3xl font-extrabold mt-4 mb-2 text-gray-900">
            No products found?
          </h4>
          <p className="text-sm mb-4 w-3/12 text-center text-gray-500">
            Try to create more new products or drag xls files to upload items
            list
          </p>
          <button
            type="button"
            className="button op-btn-primary"
            onClick={() => this.handleToggleAddProductModal()}
          >
            Create Product
          </button>
        </div>
      </>
    );
  }
}

//@ts-ignore
export default withRouter(NoCatalogueFound);
