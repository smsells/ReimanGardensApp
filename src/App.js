import { React, useEffect, useState } from "react";
import "./App.css";
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
//import { Authenticator, Link } from '@aws-amplify/ui-react';
import { Auth, API } from "aws-amplify";
//import { listNotes } from './graphql/queries';
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
import DisplayShipments from "./components/DisplayShipments";
import PackingList from "./components/PackingList";
import EditShipments from "./components/EditShipments";
import CustomizePage from "./components/CustomizePage";
import ImportExportShipments from "./components/ImportExportShipments";
import crypto from "crypto-js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  /**
   * Load user-specific organization or create on if user doesn't have an organization
   */
  const isLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        const userName = user.username;
        const sha512Hash = crypto.SHA512(userName).toString();
        console.log("result1", userName);

        const res = await API.graphql({
          query: getOrganization,
          variables: { id: sha512Hash },
        });
        // const res = await API.graphql({
        //   query: listOrganizations,
        // });
        console.log("try", res.data.getOrganization);
        if (res.data.getOrganization == null) {
          const cat = await API.graphql({
            query: createOrganizationMutation,
            variables: {
              input: {
                id: sha512Hash,
                username: userName,
                // Shipments: [
                //   {
                //     shipmentDate: "results.data[1][4]",
                //     arrivalDate: "results.data[1][5]",
                //     supplier: "results.data[1][3]",
                //     packingList: [],
                //   },
                // ],
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
    try {
      await Auth.signOut();
      setLoggedIn(false);
      //right now has to be refreshed to update

      navigate("/");
    } catch (error) {
      console.log("error signing out " + error);
    }
  };

  //used for closing hamburger menu
  const [isMenuOpen, handleMenu] = useState(false);

  const handleCloseMenu = () => {
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
        style={sidebarStyle}
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
      >
        <Link className="menu-link" to={"/"} onClick={() => handleCloseMenu()}>
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
          <Link
            className="menu-link"
            to="/signin"
            onClick={() => handleCloseMenu()}
          >
            Sign In{" "}
          </Link>
        )}
      </Menu>

      <Navbar style={{ backgroundColor: "#2C678E" }} expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={{ color: "#FEFAE0" }}>
            <img src={logo} />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <header className="header">
        <h1>Welcome to Reiman Gardens</h1>
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
        <Route exact path="/displayShipments" element={<DisplayShipments />} />
        <Route exact path="/packingList" element={<PackingList />} />
        <Route exact path="/editShipment" element={<EditShipments />} />
        <Route exact path="/customizePage" element={<CustomizePage />} />
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
