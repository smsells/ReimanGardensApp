import { React, useEffect, useState } from "react";
import "./App.css";
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
//import { Authenticator, Link } from '@aws-amplify/ui-react';
import { Auth, API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { createOrganization as createOrganizationMutation } from "./graphql/mutations";
import { getOrganization } from ".//graphql/queries";

import { Routes, Route, Link } from "react-router-dom";
import NoteList from "./components/NoteList";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import Parks from "./components/Parks";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Fonts/CustomFonts";
import logo from "./rg_logo.png";
import sidebarStyle from "./components/Sidebar/Sidebar.css";
import { stack as Menu } from "react-burger-menu";
import AddButterfly from "./components/AddButterfly/AddButterfly";
import EditButterfly from "./components/EditButterfly/EditButterfly";
import DisplayShipments from "./components/DisplayShipments";
import PackingList from "./components/PackingList";
import EditShipments from "./components/EditShipments";
import CustomizePage from "./components/CustomizePage";
import CustomizeModules from "./components/CustomizeModules";
import ImportExportShipments from "./components/ImportExportShipments";
import DeleteOrganizations from "./components/DeleteOrganizations";
import AddShipments from "./components/AddShipments";
import crypto from "crypto-js";

function App() {
  const orgId = localStorage.getItem("token");

  const initialOrganizationState = {
    name: "",
    locationCity: "",
    locationState: "",
    headerColor: "",
    sectionHeaderColor: "",
    menuColor: "",
    linkFontColor: "",
    adminIconColor: "",
    homepageBackground: "",
    font: "",
    logo: "",
    coverMedia: "",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(initialOrganizationState);
  const [images, setImages] = useState({});

  useEffect(() => {
    isLoggedIn();
    getOrg();
  }, []);
  // console.log("Organization", organization);

  const menuStyle = {
    backgroundColor: organization.menuColor || "",
  };

  /**
   * Load user-specific organization or create on if user doesn't have an organization
   */
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setLoggedIn(true);
      return;
    }
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        console.log("user email", user.email);
        const userName = user.username;
        const sha512Hash = crypto.SHA512(userName).toString();
        console.log("result1: ", userName);

        const res = await API.graphql({
          query: getOrganization,
          variables: { id: sha512Hash },
        });
        console.log("try", res.data.getOrganization);
        if (res.data.getOrganization == null) {
          const cat = await API.graphql({
            query: createOrganizationMutation,
            variables: {
              input: {
                id: sha512Hash,
                username: userName,
              },
            },
          });
          console.log("catch", cat);
        }
        localStorage.setItem("token", sha512Hash);
        console.log("done");
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  const onSignIn = () => {
    setLoggedIn(true);
  };

  const signOut = async () => {
    console.log("in the signoutFunction");
    localStorage.removeItem("token");
    try {
      await Auth.signOut();
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("error signing out " + error);
    }
    navigate(0);
  };

  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: orgId },
    });

    if (org.data.getOrganization.logo) {
      const image = await Storage.get(org.data.getOrganization.logo);
      images["logo"] = image;
    }
    if (org.data.getOrganization.coverMedia) {
      const image = await Storage.get(org.data.getOrganization.coverMedia);
      images["coverMedia"] = image;
    }

    setOrganization({
      name: org.data.getOrganization.name,
      locationCity: org.data.getOrganization.locationCity,
      locationState: org.data.getOrganization.locationState,
      headerColor: org.data.getOrganization.headerColor,
      sectionHeaderColor: org.data.getOrganization.sectionHeaderColor,
      menuColor: org.data.getOrganization.menuColor,
      linkFontColor: org.data.getOrganization.linkFontColor,
      adminIconColor: org.data.getOrganization.adminIconColor,
      homepageBackground: org.data.getOrganization.homepageBackground,
      font: org.data.getOrganization.font,
      logo: org.data.getOrganization.logo,
      coverMedia: org.data.getOrganization.coverMedia,
    });
  }

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
    <div className="App" style={{ backgroundColor: "#BC6C25", height: "100%" }}>
      <Menu
        disableAutoFocus
        right
        // style={menuStyle}
        style={{ color: organization.menuColor }}
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
      >
        <Link
          className="menu-link"
          style={{ color: organization.menuColor }}
          to={"/"}
          onClick={() => handleCloseMenu()}
        >
          Home
        </Link>
        <Link
          className="menu-link"
          to={"/notes"}
          onClick={() => handleCloseMenu()}
        >
          NoteList
        </Link>
        <Link
          className="menu-link"
          to={"/stats"}
          onClick={() => handleCloseMenu()}
        >
          Stats
        </Link>
        <Link
          className="menu-link"
          to={"/gallery"}
          onClick={() => handleCloseMenu()}
        >
          Gallery
        </Link>
        <Link
          className="menu-link"
          to={"/parks"}
          onClick={() => handleCloseMenu()}
        >
          Parks Around the World
        </Link>

        <Link
          className="menu-link"
          to="/signin"
          onClick={() => handleCloseMenu()}
        >
          {loggedIn ? "Admin Panel" : "Sign In"}
        </Link>
        {loggedIn ? (
          <Link
            className="menu-link"
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

      <Navbar
        style={{ backgroundColor: organization.headerColor || "#2C678E" }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home" style={{ color: "#FEFAE0" }}>
            {images.logo && <img src={images.logo || logo} />}
          </Navbar.Brand>
        </Container>
      </Navbar>

      <header
        className="header"
        style={{
          backgroundColor: organization.sectionHeaderColor || "#2C678E",
          fontSize: organization.font + "px" || "50px",
        }}
      >
        <h1>Welcome to {organization.name || "Reiman Garden"}</h1>
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/signin"
          element={<SignIn onSignIn={isLoggedIn} />}
        />
        <Route exact path="/notes" element={<NoteList />} />
        <Route exact path="/stats" element={<Stats />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/parks" element={<Parks />} />
        <Route exact path="/addButterfly" element={<AddButterfly />} />
        <Route exact path="/editButterfly" element={<EditButterfly />} />
        <Route exact path="/displayShipments" element={<DisplayShipments />} />
        <Route exact path="/packingList" element={<PackingList />} />
        <Route exact path="/editShipment" element={<EditShipments />} />
        <Route exact path="/customizePage" element={<CustomizePage />} />
        <Route exact path="/customizeModules" element={<CustomizeModules />} />
        <Route exact path="/addShipments" element={<AddShipments />} />
        <Route
          exact
          path="/deleteOrganizations"
          element={<DeleteOrganizations />}
        />
        <Route
          exact
          path="/importExportShipments"
          element={<ImportExportShipments />}
        />
      </Routes>
    </div>
  );
}

export default App;

//TODO problems
//Probs will need to send function that keeps track of current park to dynamically load all the park info
