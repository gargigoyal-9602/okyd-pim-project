import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Dashboard from "../../src/Dashboard";
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "Dashboard",
};
const feature = loadFeature("./__tests__/features/dashboard-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to dashboard", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    // let instance: Dashboard;
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      expect(dashboardWrapper).toBeTruthy();
    });

    // when("I navigate to the dashboard", () => {
    //   instance = dashboardWrapper.instance() as Dashboard;
    //   expect(dashboardWrapper).toBeTruthy();
    //   expect(dashboardWrapper).toMatchSnapshot();
    // });

    // then("dashboard will load with out errors", () => {
    //   expect(dashboardWrapper).toBeTruthy();
    //   expect(dashboardWrapper).toMatchSnapshot();
    // });
    // then('I can enter text with out errors', () => {
    //     let textInputComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'txtInput');
    //     textInputComponent.simulate('changeText', 'hello@aol.com');
    //     expect(dashboardWrapper).toMatchSnapshot();
    // });

    // then('I can select the button with with out errors', () => {
    //     expect(dashboardWrapper).toMatchSnapshot();
    //     expect(instance.state.txtSavedValue).toEqual("hello@aol.com")
    // });

    // then("I can leave the screen with out errors", () => {
    //   instance.componentWillUnmount();
    //   expect(dashboardWrapper).toBeTruthy();
    //   expect(dashboardWrapper).toMatchSnapshot();
    // });
  });
});
