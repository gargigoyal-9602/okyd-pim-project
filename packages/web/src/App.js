// App.js - WEB
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-firebase';
import { Redirect } from 'react-router-dom';
import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import UserGroups from '../../blocks/UserGroups/src/UserGroups';
import BarcodeSettings from '../../blocks/BarcodeSettings/src/BarcodeSettings';
import SalesReporting from '../../blocks/SalesReporting/src/SalesReporting';
import Filteritems from '../../blocks/filteritems/src/Filteritems';
import Filteroptions from '../../blocks/filteritems/src/Filteroptions';
import Sorting from '../../blocks/sorting/src/Sorting';
import Notes from '../../blocks/Notes/src/Notes';
import GraphicalCharts from '../../blocks/GraphicalCharts/src/GraphicalCharts';
import PeopleManagement from '../../blocks/PeopleManagement/src/PeopleManagement';
import InventoryManagementIntegration from '../../blocks/InventoryManagementIntegration/src/InventoryManagementIntegration';
import CustomisedOrderStatus from '../../blocks/CustomisedOrderStatus/src/CustomisedOrderStatus';
import LanguageOptions from '../../blocks/LanguageOptions/src/LanguageOptions';
import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlock';
import RecommendationEngine from '../../blocks/RecommendationEngine/src/RecommendationEngine';
import MultitieredPricing from '../../blocks/MultitieredPricing/src/MultitieredPricing';
import Dashboard from '../../blocks/dashboard/src/Dashboard.web';
import DynamicContent from '../../blocks/DynamicContent/src/DynamicContent';
import CustomFormBuilder from '../../blocks/CustomFormBuilder/src/CustomFormBuilder';
import CountryCodeSelector from '../../blocks/country-code-selector/src/CountryCodeSelector';
import AdvancedSearch from '../../blocks/AdvancedSearch/src/AdvancedSearch';
import Download from '../../blocks/Download/src/Download';
import OrderDetailView from '../../blocks/OrderDetailView/src/OrderDetailView';
import EmailAccountRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistration';
import PostCreation from '../../blocks/postcreation/src/PostCreation';
import Posts from '../../blocks/postcreation/src/Posts';
import PostDetails from '../../blocks/postcreation/src/PostDetails';
import LoyaltySystem from '../../blocks/LoyaltySystem/src/LoyaltySystem';
import ShoppingCart from '../../blocks/ShoppingCart/src/ShoppingCart';
import UserProfileBasicBlock from '../../blocks/user-profile-basic/src/UserProfileBasicBlock';
import EmailNotifications from '../../blocks/EmailNotifications/src/EmailNotifications';
import ApiIntegration from '../../blocks/ApiIntegration/src/ApiIntegration';
import Multiwarehouse from '../../blocks/Multiwarehouse/src/Multiwarehouse';
import Documentation from '../../blocks/Documentation/src/Documentation';
import LinkShare from '../../blocks/LinkShare/src/LinkShare';
import SmartCategorisation from '../../blocks/SmartCategorisation/src/SmartCategorisation';
import Ordermanagement from '../../blocks/ordermanagement/src/Ordermanagement';
import OrderDetails from '../../blocks/ordermanagement/src/OrderDetails';
import RolesPermissions from '../../blocks/RolesPermissions/src/RolesPermissions.web';
import UploadMedia from '../../blocks/UploadMedia/src/UploadMedia';
import BroadcastMessage from '../../blocks/BroadcastMessage/src/BroadcastMessage';
import OTPInputAuth from '../../blocks/otp-input-confirmation/src/OTPInputAuth';
import CustomForm from '../../blocks/CustomForm/src/CustomForm';
import BaselineReporting from '../../blocks/BaselineReporting/src/BaselineReporting';
import Gallery from '../../blocks/Gallery/src/Gallery';
import InventoryTrendAnalysis from '../../blocks/InventoryTrendAnalysis/src/InventoryTrendAnalysis';
import ProductQuickview from '../../blocks/ProductQuickview/src/ProductQuickview';
import DataImportexportcsv from '../../blocks/DataImportexportcsv/src/DataImportexportcsv';
import PricingEngine from '../../blocks/PricingEngine/src/PricingEngine';
import KeywordSearch from '../../blocks/KeywordSearch/src/KeywordSearch';
import Categoriessubcategories from '../../blocks/categoriessubcategories/src/Categoriessubcategories.web';
import CategoryAdd from '../../blocks/categoriessubcategories/src/Category.add.web';
import CategoryEdit from '../../blocks/categoriessubcategories/src/Category.edit.web';
import SubCategories from '../../blocks/categoriessubcategories/src/SubCategories.web';
import SubCategoryAdd from '../../blocks/categoriessubcategories/src/SubCategory.add.web';
import SubCategoryEdit from '../../blocks/categoriessubcategories/src/SubCategory.edit.web';
import Brands from '../../blocks/categoriessubcategories/src/Brands.web';
import BrandAdd from '../../blocks/categoriessubcategories/src/Brand.add.web';
import BrandEdit from '../../blocks/categoriessubcategories/src/Brand.edit.web';
import DragDropInterface from '../../blocks/DragDropInterface/src/DragDropInterface';
import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../../blocks/forgot-password/src/NewPassword';
import Catalogue from '../../blocks/catalogue/src/Catalogue';
import DiscountsOffers from '../../blocks/DiscountsOffers/src/DiscountsOffers';
import Mentionstagging from '../../blocks/Mentionstagging/src/Mentionstagging';
import AuditTrail from '../../blocks/AuditTrail/src/AuditTrail.web';
import AuditTrailDealer from '../../blocks/AuditTrail/src/AuditTrail.dealer.web';
import EmailAccountLoginBlockWeb from '../../blocks/email-account-login/src/EmailAccountLoginBlock-email.web';
import EmailAccountLoginBlockEmailWelWeb from '../../blocks/email-account-login/src/EmailAccountLoginBlock-email-wel.web';
import EmailAccountSignup from '../../blocks/email-account-registration/src/EmailAccountSignup.web';
import EmailSendSuccessfully from '../../blocks/email-account-login/src/EmailSendSuccBlock.web';
import EmailAcountLoginBlockEmailSignin from '../../blocks/email-account-login/src/EmailAcountLoginBlock-emailSignin.web';
import SelectDomain from './components/Login/src/SelectDomain.web';
import InviteTeam from './components/Login/src/InviteTeam.web';
import ForgotPwd from '../../blocks/forgot-password/src/ForgotPwd.web';
import NewPasswordWeb from '../../blocks/forgot-password/src/NewPassword.web';
import SuperAdminLogin from '../../blocks/email-account-login/src/SuperAdminLogin.web';
import SuperAdminNewPwd from '../../blocks/forgot-password/src/SuperAdminNewPwd.web';
import SuperAdminPwdRecovery from '../../blocks/forgot-password/src/SuperAdminPwdRecovery.web';
import CatalogueWeb from '../../blocks/catalogue/src/Catalogue.web';
import CaralogueAddProduct from '../../blocks/catalogue/src/CaralogueAddProduct.web';
import TeamManagementSubscriber from '../../blocks/UserGroups/src/TeamManagementSubscriber.web';
import UserProfileSetting from '../../blocks/user-profile-basic/src/UserProfileSetting';

import '../styles/index.css';
import { isEmpty } from 'lodash';

const routeMap = {
  UserGroups: {
    component: UserGroups,
    path: '/UserGroups'
  },
  BarcodeSettings: {
    component: BarcodeSettings,
    path: '/BarcodeSettings'
  },
  SalesReporting: {
    component: SalesReporting,
    path: '/SalesReporting'
  },
  Sorting: {
    component: Sorting,
    path: '/Sorting'
  },
  Notes: {
    component: Notes,
    path: '/Notes'
  },
  GraphicalCharts: {
    component: GraphicalCharts,
    path: '/GraphicalCharts'
  },
  PeopleManagement: {
    component: PeopleManagement,
    path: '/PeopleManagement'
  },
  InventoryManagementIntegration: {
    component: InventoryManagementIntegration,
    path: '/InventoryManagementIntegration'
  },
  CustomisedOrderStatus: {
    component: CustomisedOrderStatus,
    path: '/CustomisedOrderStatus'
  },
  LanguageOptions: {
    component: LanguageOptions,
    path: '/LanguageOptions'
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: '/EmailAccountLoginBlock'
  },
  RecommendationEngine: {
    component: RecommendationEngine,
    path: '/RecommendationEngine'
  },
  MultitieredPricing: {
    component: MultitieredPricing,
    path: '/MultitieredPricing'
  },
  Dashboard: {
    component: Dashboard,
    path: '/',
    exact: true
  },
  DynamicContent: {
    component: DynamicContent,
    path: '/DynamicContent'
  },
  CustomFormBuilder: {
    component: CustomFormBuilder,
    path: '/CustomFormBuilder'
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: '/CountryCodeSelector'
  },
  AdvancedSearch: {
    component: AdvancedSearch,
    path: '/AdvancedSearch'
  },
  Download: {
    component: Download,
    path: '/Download'
  },
  OrderDetailView: {
    component: OrderDetailView,
    path: '/OrderDetailView'
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: '/EmailAccountRegistration'
  },
  PostCreation: {
    component: PostCreation,
    path: '/PostCreation'
  },
  Posts: {
    component: Posts,
    path: '/Posts'
  },
  PostDetails: {
    component: PostDetails,
    path: '/PostDetails'
  },
  LoyaltySystem: {
    component: LoyaltySystem,
    path: '/LoyaltySystem'
  },
  ShoppingCart: {
    component: ShoppingCart,
    path: '/ShoppingCart'
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: '/UserProfileBasicBlock'
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: '/EmailNotifications'
  },
  ApiIntegration: {
    component: ApiIntegration,
    path: '/ApiIntegration'
  },
  Multiwarehouse: {
    component: Multiwarehouse,
    path: '/Multiwarehouse'
  },
  Documentation: {
    component: Documentation,
    path: '/Documentation'
  },
  LinkShare: {
    component: LinkShare,
    path: '/LinkShare'
  },
  SmartCategorisation: {
    component: SmartCategorisation,
    path: '/SmartCategorisation'
  },
  Ordermanagement: {
    component: Ordermanagement,
    path: '/Ordermanagement'
  },
  OrderDetails: {
    component: OrderDetails,
    path: '/OrderDetails'
  },
  RolesPermissions: {
    component: RolesPermissions,
    path: '/roles-permissions'
  },
  UploadMedia: {
    component: UploadMedia,
    path: '/UploadMedia'
  },
  BroadcastMessage: {
    component: BroadcastMessage,
    path: '/BroadcastMessage'
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: '/OTPInputAuth'
  },
  CustomForm: {
    component: CustomForm,
    path: '/CustomForm'
  },
  BaselineReporting: {
    component: BaselineReporting,
    path: '/BaselineReporting'
  },
  Gallery: {
    component: Gallery,
    path: '/Gallery'
  },
  InventoryTrendAnalysis: {
    component: InventoryTrendAnalysis,
    path: '/InventoryTrendAnalysis'
  },
  ProductQuickview: {
    component: ProductQuickview,
    path: '/ProductQuickview'
  },
  DataImportexportcsv: {
    component: DataImportexportcsv,
    path: '/DataImportexportcsv'
  },
  PricingEngine: {
    component: PricingEngine,
    path: '/PricingEngine'
  },
  KeywordSearch: {
    component: KeywordSearch,
    path: '/KeywordSearch'
  },
  Categoriessubcategories: {
    component: Categoriessubcategories,
    path: '/categories',
    exact: true
  },
  CategoryAdd: {
    component: CategoryAdd,
    path: '/categories/add',
    exact: true
  },
  CategoryEdit: {
    component: CategoryEdit,
    path: '/categories/edit/:id',
    exact: true
  },
  SubCategories: {
    component: SubCategories,
    path: '/sub-categories',
    exact: true
  },
  SubCategoryAdd: {
    component: SubCategoryAdd,
    path: '/sub-categories/add',
    exact: true
  },
  SubCategoryEdit: {
    component: SubCategoryEdit,
    path: '/sub-categories/edit/:id',
    exact: true
  },
  Brands: {
    component: Brands,
    path: '/brands',
    exact: true
  },
  BrandAdd: {
    component: BrandAdd,
    path: '/brands/add',
    exact: true
  },
  BrandEdit: {
    component: BrandEdit,
    path: '/brands/edit/:id',
    exact: true
  },
  DragDropInterface: {
    component: DragDropInterface,
    path: '/DragDropInterface'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword'
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP'
  },
  NewPassword: {
    component: NewPassword,
    path: '/NewPassword'
  },
  Catalogue: {
    component: Catalogue,
    path: '/Catalogue'
  },
  DiscountsOffers: {
    component: DiscountsOffers,
    path: '/DiscountsOffers'
  },
  Mentionstagging: {
    component: Mentionstagging,
    path: '/Mentionstagging'
  },
  Filteroptions: {
    component: Filteroptions,
    path: '/Filteroptions'
  },
  Filteritems: {
    component: Filteritems,
    path: '/Filteritems'
  },
  // Home: {
  //   component: Categoriessubcategories,
  //   path: '/',
  //   exact: true
  // },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  // New Routes
  AuditTrail: {
    component: AuditTrail,
    path: '/audit-trail',
    exact: true
  },
  AuditTrailDealer: {
    component: AuditTrailDealer,
    path: '/dealer/audit-trail',
    exact: true
  },
  EmailAccountLoginBlockWeb: {
    component: EmailAccountLoginBlockWeb,
    path: '/login',
    exact: true
  },

  EmailAccountLoginBlockWb: {
    component: EmailAccountLoginBlockWeb,
    path: '/login/:id',
    exact: true
  },

  EmailAccountLoginBlockEmailWelWb: {
    component: EmailAccountLoginBlockEmailWelWeb,
    path: '/email-account-Login-welcome',
    exact: true
  },

  EmailAccountLoginBlockEmailWelWeb: {
    component: EmailAccountLoginBlockEmailWelWeb,
    path: '/email-account-Login-welcome/:id',
    exact: true
  },

  EmailAccountSignup: {
    component: EmailAccountSignup,
    path: '/email-account-signup',
    exact: true
  },

  EmailSendSuccessfully: {
    component: EmailSendSuccessfully,
    path: '/email-send-successfully',
    exact: true
  },

  ForgotMailSendSuccessfully: {
    component: EmailSendSuccessfully,
    path: '/forgot-email-send-successfully',
    exact: true
  },

  EmailAcountLoginBlockEmailSignin: {
    component: EmailAcountLoginBlockEmailSignin,
    path: '/email-acount-login-signin',
    exact: true
  },

  SelectDomain: {
    component: SelectDomain,
    path: '/select-domain',
    exact: true
  },

  InviteTeam: {
    component: InviteTeam,
    path: '/invite-team',
    exact: true
  },

  ForgotPwd: {
    component: ForgotPwd,
    path: '/forget-password',
    exact: true
  },

  NewPasswordWeb: {
    component: NewPasswordWeb,
    path: '/new-password',
    exact: true
  },

  ActivePasswordWeb: {
    component: NewPasswordWeb,
    path: '/active-account'
    // exact: true
  },

  SuperNewPasswordWeb: {
    component: NewPasswordWeb,
    path: '/super-admin-new-password',
    exact: true
  },

  SuperAdminLogin: {
    component: EmailAccountLoginBlockWeb,
    path: '/super-admin-login',
    exact: true
  },

  SuperAdminNewPwd: {
    component: NewPasswordWeb,
    path: '/super-admin-new-password',
    exact: true
  },

  SuperAdminPwdRecovery: {
    component: ForgotPwd,
    path: '/super-admin-recovery-password',
    exact: true
  },

  CatalogueWeb: {
    component: CatalogueWeb,
    path: '/catalogues',
    exact: true
  },
  CaralogueAddProduct: {
    component: CaralogueAddProduct,
    path: '/catalogues/add',
    exact: true
  },

  TeamManagementSubscriber: {
    component: TeamManagementSubscriber,
    path: '/team-management',
    exact: true
  },

  UserProfileSetting: {
    component: UserProfileSetting,
    path: '/profile-setting',
    exact: true
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  render() {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    const auth = localStorage.getItem('auth');
    return (
      <div>
        {WebRoutesGenerator({ routeMap })}
        {/* {isEmpty(auth) && <Redirect from="*" to="/login" />} */}
        {/* {isEmpty(auth) ? (
          <Redirect from="*" to="/login" />
        ) : (
          <Redirect from="*" to="/" />
        )} */}
      </div>
    );
  }
}

export default App;
