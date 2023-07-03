import React from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import { isEmpty } from "lodash-es";

function ItemsSide({ access, getMenuItemActive, allows, sides, title }) {
  
  return (
    <>
      {title && (
        <li className="menu-section ">
          <h4 className="menu-text">{title}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
      )}
      {sides.map((side, idx) =>
        !isEmpty(allows) ? (
          allows[access][side.allowed] && (
            <li
              key={idx}
              className={`menu-item ${getMenuItemActive(side.link)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to={side.link}>
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl(side.linkSvg)} />
                </span>
                <span className="menu-text">{side.title}</span>
              </NavLink>
            </li>
          )
        ) : (
          <li
            key={idx}
            className={`menu-item ${getMenuItemActive(side.link)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to={side.link}>
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl(side.linkSvg)} />
              </span>
              <span className="menu-text">{side.title}</span>
            </NavLink>
          </li>
        )
      )}
    </>
  );
}

export default ItemsSide;
