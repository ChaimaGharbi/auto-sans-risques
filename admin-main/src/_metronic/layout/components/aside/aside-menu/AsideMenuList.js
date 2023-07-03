/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import ItemsSide from "./ItemsSide";
import { useSelector } from "react-redux";
import constants from "../../../../constants";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const { menus, configs } = constants;
  const { user } = useSelector((state) => state.auth);
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <ItemsSide
          access="menus"
          allows={user?.allows}
          sides={menus}
          getMenuItemActive={getMenuItemActive}
        />

        {/* Setting */}
        {/* begin::section */}
        <ItemsSide
          title="Configuration"
          access="configs"
          allows={user?.allows}
          sides={configs}
          getMenuItemActive={getMenuItemActive}
        />
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
