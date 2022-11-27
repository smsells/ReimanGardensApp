import { React, useEffect, useState } from "react";
import { Auth, API, navRight } from "aws-amplify";
import { Storage } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from "../AdminButton/AdminButton";
import { getOrganization } from "../../graphql/queries";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import {
  initialImages,
  initialOrganizationState,
} from "../utils/initialStates";
import { getPropsID } from "../Header/Props";

// import Grid from '@mui/material/Grid';

const AdminPanel = () => {
  const navigate = useNavigate();
  const orgID = localStorage.getItem("token");
  const masterID = "";

  const [organization, setOrganization] = useState(initialOrganizationState);
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
  }, []);

  function load() {
    const orgID = localStorage.getItem("token");
    if (!orgID) {
      console.log("Sign in load check");
      navigate(0);
    }
  }

  async function signOut() {
    console.log("in the signoutFunction");
    localStorage.removeItem("token");
    try {
      await Auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.log("error signing out " + error);
    }
    navigate(0);
  }

  // function testOnload(){
  //     console.log("Hey I loaded");
  // }

  return (
    <Authenticator>
      <AppHeader
        menuProp={<AppMenu organizationProp={organization} admin={true} />}
        organizationProp={organization}
        imagesProp={images}
      ></AppHeader>
      <div
        className="SignIn"
        slot="sign-in"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage:
            "url(https://www.reimangardens.com/wp-content/uploads/2018/01/53-Reiman-Gardens-Entrance-summer.jpg)",
          backgroundSize: "cover",
          maxHeight: "height",
          maxWidth: "width",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            gap: "5%",
            backgroundColor: "rgba(222, 184, 135, 0.5)",
            padding: "10px",
            gridAutoColumns: "30%",
          }}
        >
          {load()}
          <div style={{ gridArea: "2 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/displayShipments"}>
                <AdminButton>View Shipments</AdminButton>
              </Link>
              <Link to={"/addShipments"}>
                <AdminButton>Add Shipment</AdminButton>
              </Link>
              <Link to={"/importExportShipments"}>
                <AdminButton>Import/Export Shipments</AdminButton>
              </Link>
            </div>
          </div>
          <div style={{ gridArea: "3 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/addButterfly"}>
                <AdminButton>Add Butterfly</AdminButton>
              </Link>
              <Link to={"/editButterfly"}>
                <AdminButton>Edit Butterfly</AdminButton>
              </Link>
              <Link to={"/" + organization.orgURL + "/notes"}>
                <AdminButton>Add/Edit Notes</AdminButton>
              </Link>
            </div>
          </div>
          <div style={{ gridArea: "4 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/customizePage"}>
                <AdminButton>Customize Page</AdminButton>
              </Link>
              <Link to={"/customizeModules"}>
                <AdminButton>Customize Modules</AdminButton>
              </Link>
              {orgID !== masterID && true ? (
                <Link to={"/manageOrganizations"}>
                  <AdminButton>Delete Organizations</AdminButton>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>

          <div
            style={{
              display: "-ms-inline-grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>
      </div>
    </Authenticator>
  );
};

export default AdminPanel;
