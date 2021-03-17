import React from "react";
import Dropzone from "react-dropzone";
import { cloud } from "./assets";
import { withRouter } from "react-router-dom";
import CatalogueController, { Props } from "./CatalogueController.web";

export const configJSON = require("./config");

class CatalogueImage extends CatalogueController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="font-bold px-8 py-3 my-6 font-12">
          <div className="flex flex-col justify-center items-center">
            <Dropzone
              onDrop={this.handleOnDrop}
              accept="image/*"
              minSize={0}
              maxSize={5242880}
              multiple
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex flex-col justify-center items-center border w-2/4 rounded-lg p-12" {...getRootProps()}>
                  <input {...getInputProps()} />

                  <img
                    src={cloud}
                    width="168"
                    height="112"
                    className="text-gray-300 "
                  />
                  <p className="text-base mt-3">Drag Your Files To Upload</p>
                  <p className="text-gray-400 text-sm">
                    or click to the browser
                  </p>
                </div>
              )}
            </Dropzone>
            <div className="mt-8">
              <div className="grid grid-cols-4 gap-4">
                {this.state.acceptedFiles.length > 0 &&
                  this.state.acceptedFiles.map((acceptedFile: any) => (
                    <div className=" border rounded-lg">
                      <img
                        src={URL.createObjectURL(acceptedFile)}
                        alt="image"
                        width="100%"
                        height="286px"
                        className="rounded-t-lg "
                      />
                      <p className="p-2 text-center text-gray-400">Name</p>
                    </div>
                  ))}
              </div>

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
        </div>
      </>
    );
  }
}

//@ts-ignore
export default withRouter(CatalogueImage);
