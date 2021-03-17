const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//MARK::Add Web Blocks
const appIncludes = [
  resolveApp('../blocks/catalogue/src/'),
  resolveApp('../blocks/dashboard/src/'),
  resolveApp('../blocks/user-profile-basic/src/'),
  resolveApp('../blocks/country-code-selector/src/'),
  resolveApp('../blocks/ordermanagement/src/'),
  resolveApp('../blocks/sorting/src/'),
  resolveApp('../blocks/email-account-login/src/'),
  resolveApp('../blocks/email-account-registration/src/'),
  resolveApp('../blocks/forgot-password/src/'),
  resolveApp('../blocks/otp-input-confirmation/src/'),
  resolveApp('../blocks/filteritems/src/'),
  resolveApp('../blocks/categoriessubcategories/src/'),
  resolveApp('../blocks/CustomisedOrderStatus/src/'),
  resolveApp('../blocks/UploadMedia/src/'),
  resolveApp('../blocks/CustomFormBuilder/src/'),
  resolveApp('../blocks/DataImportexportcsv/src/'),
  resolveApp('../blocks/Download/src/'),
  resolveApp('../blocks/Gallery/src/'),
  resolveApp('../blocks/UserGroups/src/'),
  resolveApp('../blocks/GraphicalCharts/src/'),
  resolveApp('../blocks/OrderDetailView/src/'),
  resolveApp('../blocks/InventoryManagementIntegration/src/'),
  resolveApp('../blocks/InventoryTrendAnalysis/src/'),
  resolveApp('../blocks/RecommendationEngine/src/'),
  resolveApp('../blocks/KeywordSearch/src/'),
  resolveApp('../blocks/LanguageOptions/src/'),
  resolveApp('../blocks/DiscountsOffers/src/'),
  resolveApp('../blocks/SmartCategorisation/src/'),
  resolveApp('../blocks/DragDropInterface/src/'),
  resolveApp('../blocks/Multiwarehouse/src/'),
  resolveApp('../blocks/ShoppingCart/src/'),
  resolveApp('../blocks/SalesReporting/src/'),
  resolveApp('../blocks/ApiIntegration/src/'),
  resolveApp('../blocks/RolesPermissions/src/'),
  resolveApp('../blocks/LinkShare/src/'),
  resolveApp('../blocks/postcreation/src/'),
  resolveApp('../blocks/PeopleManagement/src/'),
  resolveApp('../blocks/AdvancedSearch/src/'),
  resolveApp('../blocks/LoyaltySystem/src/'),
  resolveApp('../blocks/AuditTrail/src/'),
  resolveApp('../blocks/Notes/src/'),
  resolveApp('../blocks/BarcodeSettings/src/'),
  resolveApp('../blocks/BaselineReporting/src/'),
  resolveApp('../blocks/BroadcastMessage/src/'),
  resolveApp('../blocks/CustomForm/src/'),
  resolveApp('../blocks/DynamicContent/src/'),
  resolveApp('../blocks/Documentation/src/'),
  resolveApp('../blocks/EmailNotifications/src/'),
  resolveApp('../blocks/PricingEngine/src/'),
  resolveApp('../blocks/ProductQuickview/src/'),
  resolveApp('../blocks/Mentionstagging/src/'),
  resolveApp('../blocks/MultitieredPricing/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  );
  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web')
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean);
  require('react-app-rewire-postcss')(config, true);
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  );

  return config;
};
