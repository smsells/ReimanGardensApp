import { stack as Menu } from "react-burger-menu";
import { Auth, API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import { React, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

export default function AppMenu({ organizationProp, admin = false }) {
  const navigate = useNavigate();

  //used for closing hamburger menu
  const [isMenuOpen, handleMenu] = useState(false);

  const handleCloseMenu = () => {
    // navigate(0);
    handleMenu(false);
  };

  const handleStateChange = (state) => {
    handleMenu(state.isOpen);
  };

  const signOut = async () => {
    console.log("in the signoutFunction");
    localStorage.removeItem("token");
    try {
      await Auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.log("error signing out " + error);
    }
    navigate(0);
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
        to={"/" + organizationProp.orgURL + "/stats"}
        onClick={() => handleCloseMenu()}
      >
        Stats
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
        Parks Around the World
      </Link>
      {admin ? (
        <Link
          className="menu-link"
          style={{ color: organizationProp.menuColor }}
          to="/adminPanel"
          onClick={() => handleCloseMenu()}
        >
          Admin Panel
        </Link>
      ) : (
        ""
      )}
      {admin ? (
        <Link
          className="menu-link"
          style={{ color: organizationProp.menuColor }}
          onClick={() => {
            signOut();
            handleCloseMenu();
          }}
        >
          Sign out
        </Link>
      ) : (
        ""
      )}
    </Menu>
  );
}
