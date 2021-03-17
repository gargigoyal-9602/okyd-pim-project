import React from "react";
import { NavLink } from "react-router-dom";
import { logo, menuIcon } from "./Sidebar.assets";

type PropTypes = {
  menuCollapsed: boolean;
};

const Sidebar = (props: PropTypes) => {
  const { menuCollapsed } = props;

  return (
    <div
      className={menuCollapsed ? "admin-sidebar-collapsed" : "admin-sidebar"}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="OKYD admin" className="mr-5 h-8" />
        {!menuCollapsed && "OKYD Admin"}
      </div>
      {/* Sidebar Menu */}
      <div className="admin-sidebar-menu">
        <NavLink exact to="/" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-tachometer-alt text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Dashboard
            </p>
          </div>
        </NavLink>
        <NavLink
          exact
          to="/profile-setting"
          activeClassName="sidebar-menu-active"
        >
          <div className="admin-sidebar-menu-item">
            <i className="las la-user text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-7 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Manage Profile
            </p>
          </div>
        </NavLink>
        <NavLink exact to="/audit-trail" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-list text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Audit Trail
            </p>
          </div>
        </NavLink>
        <NavLink to="/roles-permissions" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            {/* <img src={dashboardIcon} alt="" className="h-5" /> */}
            <i className="las la-users text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Roles & Permissions
            </p>
          </div>
        </NavLink>
        <NavLink to="/categories" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-boxes text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Categories
            </p>
          </div>
        </NavLink>
        <NavLink to="/sub-categories" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-boxes text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Sub Categories
            </p>
          </div>
        </NavLink>
        <NavLink to="/brands" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-boxes text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Brands
            </p>
          </div>
        </NavLink>
        <NavLink to="/catalogues" activeClassName="sidebar-menu-active">
          <div className="admin-sidebar-menu-item">
            <i className="las la-cube text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Catalogues
            </p>
          </div>
        </NavLink>
        <NavLink
          exact
          to="/team-management"
          activeClassName="sidebar-menu-active"
        >
          <div className="admin-sidebar-menu-item">
            <i className="las la-users-cog text-2xl text-primary-light" />
            <p
              className={`admin-sidebar-menu-item-text ml-6 ${
                menuCollapsed ? "hidden" : "block"
              }`}
            >
              Team Management
            </p>
          </div>
        </NavLink>
      </div>
      <div className="admin-sidebar-account">
        <div className="flex items-center py-3">
          <div className="flex items-center justify-center bg-primary-light rounded bg-opacity-10 w-9 h-9">
            <i className="las la-user-edit text-primary-light" />
          </div>
          <p
            className={`admin-sidebar-menu-item-text ml-4 ${
              menuCollapsed ? "hidden" : "block"
            }`}
          >
            User Name
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
