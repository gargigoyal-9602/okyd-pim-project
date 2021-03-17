import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";

//Assembler generated adapters start
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to OkydPIM!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'Ordermanagement'}  onPress={() => navigation.navigate("Ordermanagement")} />
<CustomTextItem content={'Sorting'}  onPress={() => navigation.navigate("Sorting")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'filteritems'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'CustomisedOrderStatus'}  onPress={() => navigation.navigate("CustomisedOrderStatus")} />
<CustomTextItem content={'UploadMedia'}  onPress={() => navigation.navigate("UploadMedia")} />
<CustomTextItem content={'CustomFormBuilder'}  onPress={() => navigation.navigate("CustomFormBuilder")} />
<CustomTextItem content={'DataImportexportcsv'}  onPress={() => navigation.navigate("DataImportexportcsv")} />
<CustomTextItem content={'Download'}  onPress={() => navigation.navigate("Download")} />
<CustomTextItem content={'Gallery'}  onPress={() => navigation.navigate("Gallery")} />
<CustomTextItem content={'UserGroups'}  onPress={() => navigation.navigate("UserGroups")} />
<CustomTextItem content={'GraphicalCharts'}  onPress={() => navigation.navigate("GraphicalCharts")} />
<CustomTextItem content={'OrderDetailView'}  onPress={() => navigation.navigate("OrderDetailView")} />
<CustomTextItem content={'InventoryManagementIntegration'}  onPress={() => navigation.navigate("InventoryManagementIntegration")} />
<CustomTextItem content={'InventoryTrendAnalysis'}  onPress={() => navigation.navigate("InventoryTrendAnalysis")} />
<CustomTextItem content={'RecommendationEngine'}  onPress={() => navigation.navigate("RecommendationEngine")} />
<CustomTextItem content={'KeywordSearch'}  onPress={() => navigation.navigate("KeywordSearch")} />
<CustomTextItem content={'LanguageOptions'}  onPress={() => navigation.navigate("LanguageOptions")} />
<CustomTextItem content={'DiscountsOffers'}  onPress={() => navigation.navigate("DiscountsOffers")} />
<CustomTextItem content={'SmartCategorisation'}  onPress={() => navigation.navigate("SmartCategorisation")} />
<CustomTextItem content={'DragDropInterface'}  onPress={() => navigation.navigate("DragDropInterface")} />
<CustomTextItem content={'Multiwarehouse'}  onPress={() => navigation.navigate("Multiwarehouse")} />
<CustomTextItem content={'ShoppingCart'}  onPress={() => navigation.navigate("ShoppingCart")} />
<CustomTextItem content={'SalesReporting'}  onPress={() => navigation.navigate("SalesReporting")} />
<CustomTextItem content={'ApiIntegration'}  onPress={() => navigation.navigate("ApiIntegration")} />
<CustomTextItem content={'RolesPermissions'}  onPress={() => navigation.navigate("RolesPermissions")} />
<CustomTextItem content={'LinkShare'}  onPress={() => navigation.navigate("LinkShare")} />
<CustomTextItem content={'PostCreation'}  onPress={() => navigation.navigate("PostCreation")} />
<CustomTextItem content={'PeopleManagement'}  onPress={() => navigation.navigate("PeopleManagement")} />
<CustomTextItem content={'AdvancedSearch'}  onPress={() => navigation.navigate("AdvancedSearch")} />
<CustomTextItem content={'LoyaltySystem'}  onPress={() => navigation.navigate("LoyaltySystem")} />
<CustomTextItem content={'AuditTrail'}  onPress={() => navigation.navigate("AuditTrail")} />
<CustomTextItem content={'Notes'}  onPress={() => navigation.navigate("Notes")} />
<CustomTextItem content={'BarcodeSettings'}  onPress={() => navigation.navigate("BarcodeSettings")} />
<CustomTextItem content={'BaselineReporting'}  onPress={() => navigation.navigate("BaselineReporting")} />
<CustomTextItem content={'BroadcastMessage'}  onPress={() => navigation.navigate("BroadcastMessage")} />
<CustomTextItem content={'CustomForm'}  onPress={() => navigation.navigate("CustomForm")} />
<CustomTextItem content={'DynamicContent'}  onPress={() => navigation.navigate("DynamicContent")} />
<CustomTextItem content={'Documentation'}  onPress={() => navigation.navigate("Documentation")} />
<CustomTextItem content={'EmailNotifications'}  onPress={() => navigation.navigate("EmailNotifications")} />
<CustomTextItem content={'PricingEngine'}  onPress={() => navigation.navigate("PricingEngine")} />
<CustomTextItem content={'ProductQuickview'}  onPress={() => navigation.navigate("ProductQuickview")} />
<CustomTextItem content={'Mentionstagging'}  onPress={() => navigation.navigate("Mentionstagging")} />
<CustomTextItem content={'MultitieredPricing'}  onPress={() => navigation.navigate("MultitieredPricing")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;