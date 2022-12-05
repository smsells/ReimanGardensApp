import { React, useEffect, useState } from "react";
import "./App.css";
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
//import { Authenticator, Link } from '@aws-amplify/ui-react';
import { Auth, API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { createOrganization as createOrganizationMutation } from "./graphql/mutations";
import { getOrganization, listOrganizations } from ".//graphql/queries";

import { Routes, Route, Link } from "react-router-dom";
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
import ManageOrganizations from "./components/ManageOrganizations";
import AddShipments from "./components/AddShipments";
import AdminPanel from "./components/AdminPanel";
import crypto from "crypto-js";
import ButterflyDetail from "./components/Gallery/ButterflyDetail";

function App() {
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getOrganizationList();
    }
    fetchData();
  }, []);

  async function getOrganizationList() {
    let filter = {
      and: [
        {
          deleted: { eq: false },
        },
        {
          suspended: { eq: false },
        },
      ],
    };
    const apiData = await API.graphql({
      query: listOrganizations,
      variables: { filter: filter },
    });
    const organizationsFromAPI = apiData.data.listOrganizations.items;
    let orgList = [];
    await Promise.all(
      organizationsFromAPI.map((organization) => {
        if (organization.orgURL) {
          orgList.push(organization);
        }
        return organization;
      })
    );
    // console.log("organization list with url", orgList);
    setOrganizationList(orgList);
  }

  return (
    <div className="App" style={{ backgroundColor: "#BC6C25", height: "100%" }}>
      {organizationList.map((org, index) => (
        <Routes key={org.orgURL}>
          <Route exact path={"/" + org.orgURL + "/"} element={<Home />} />
          <Route exact path={"/" + org.orgURL + "/stats"} element={<Stats />} />
          <Route
            exact
            path={"/" + org.orgURL + "/gallery"}
            element={<Gallery />}
          />
          <Route exact path={"/" + org.orgURL + "/parks"} element={<Parks />} />
          <Route
            exact
            path={"/" + org.orgURL + "/butterfly/:id"}
            element={<ButterflyDetail />}
          />
        </Routes>
      ))}
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/adminPanel" element={<AdminPanel />} />
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
          path="/manageOrganizations"
          element={<ManageOrganizations />}
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
