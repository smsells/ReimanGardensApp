import { stack as Menu } from "react-burger-menu";
import { Auth, API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminMenu({ organizationProp }) {
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
        to={"/displayShipments"}
        onClick={() => handleCloseMenu()}
      >
        View Shipments
      </Link>
      <Link
        className="menu-link"
        to="/addShipments"
        onClick={() => handleCloseMenu()}
      >
        Add Shipments
      </Link>
      <Link
        className="menu-link"
        to="/importExportShipments"
        onClick={() => handleCloseMenu()}
      >
        Import/Export Shipments
      </Link>
      <Link
        className="menu-link"
        style={{ color: organizationProp.menuColor }}
        to={"/addButterfly"}
        onClick={() => handleCloseMenu()}
      >
        Add Butterfly
      </Link>
      <Link
        className="menu-link"
        to={"/editButterfly"}
        onClick={() => handleCloseMenu()}
      >
        Edit Butterfly
      </Link>
      <Link
        className="menu-link"
        to={"/customizePage"}
        onClick={() => handleCloseMenu()}
      >
        Customize Organization
      </Link>
      <Link
        className="menu-link"
        to={"/customizeModules"}
        onClick={() => handleCloseMenu()}
      >
        Customize Modules
      </Link>
      <Link
        className="menu-link"
        to="/adminPanel"
        onClick={() => handleCloseMenu()}
      >
        Admin Panel
      </Link>
      <Link
        className="menu-link"
        onClick={() => {
          signOut();
          handleCloseMenu();
        }}
      >
        Sign out
      </Link>
    </Menu>
  );
}
