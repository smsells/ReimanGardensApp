import { stack as Menu } from "react-burger-menu";
import { Auth, API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import { React, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

export default function AppMenu({ organizationProp }) {
  //used for closing hamburger menu
  const [isMenuOpen, handleMenu] = useState(false);

  const handleCloseMenu = () => {
    // navigate(0);
    handleMenu(false);
  };

  const handleStateChange = (state) => {
    handleMenu(state.isOpen);
  };

  return (
    <Menu
      disableAutoFocus
      right
      // style={menuStyle}
      style={{ color: organizationProp.menuColor }}
      isOpen={isMenuOpen}
      onStateChange={handleStateChange}
    >
      <Link
        className="menu-link"
        style={{ color: organizationProp.menuColor }}
        to={"/" + organizationProp.orgURL + "/"}
        onClick={() => handleCloseMenu()}
      >
        Home
      </Link>
      
      <Link
        className="menu-link"
        style={{ color: organizationProp.menuColor }}
        to={"/" + organizationProp.orgURL + "/gallery"}
        onClick={() => handleCloseMenu()}
      >
        Gallery
      </Link>
      <Link
        className="menu-link"
        style={{ color: organizationProp.menuColor }}
        to={"/" + organizationProp.orgURL + "/parks"}
        onClick={() => handleCloseMenu()}
      >
        Butterfly Houses around the world
      </Link>
    </Menu>
  );
}
