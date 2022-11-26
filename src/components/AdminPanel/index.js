import { React, useEffect, useState } from "react";
import { Auth, API, navRight } from "aws-amplify";
import { Storage } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from "../AdminButton/AdminButton";
import { getOrganization } from "../../graphql/queries";
import AppHeader from "../Header/AppHeader";

// import Grid from '@mui/material/Grid';

const AdminPanel = () => {
  const navigate = useNavigate();
  const orgId = localStorage.getItem("token");

  const initialOrganizationState = {
    name: "",
    url: "",
    locationAddress: "",
    locationZipCode: "",
    locationCity: "",
    locationState: "",
    locationCountry: "",
    headerColor: "",
    sectionHeaderColor: "",
    menuColor: "",
    linkFontColor: "",
    adminIconColor: "",
    homepageBackground: "",
    font: "",
    logo: "",
    coverMedia: "",
    deleted: false,
    suspended: false,
  };

  const initialImages = {
    logo: "",
    coverMedia: "",
  };

  const [organization, setOrganization] = useState(initialOrganizationState);
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    getOrg();
  }, []);

  function load() {
    const orgID = localStorage.getItem("token");
    if (!orgID) {
      console.log("Sign in load check");
      navigate(0);
    }
  }

  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: orgId },
    });

    if (org.data.getOrganization.logo) {
      const image = await Storage.get(org.data.getOrganization.logo);
      setImages({ ...images, logo: image });
    }
    if (org.data.getOrganization.coverMedia) {
      const image = await Storage.get(org.data.getOrganization.coverMedia);
      setImages({ ...images, coverMedia: image });
    }

    setOrganization({
      name: org.data.getOrganization.name,
      locationAddress: org.data.getOrganization.locationAddress,
      locationZipCode: org.data.getOrganization.locationZipCode,
      locationCity: org.data.getOrganization.locationCity,
      locationState: org.data.getOrganization.locationState,
      locationCountry: org.data.getOrganization.locationCountry,
      headerColor: org.data.getOrganization.headerColor,
      sectionHeaderColor: org.data.getOrganization.sectionHeaderColor,
      menuColor: org.data.getOrganization.menuColor,
      linkFontColor: org.data.getOrganization.linkFontColor,
      adminIconColor: org.data.getOrganization.adminIconColor,
      homepageBackground: org.data.getOrganization.homepageBackground,
      font: org.data.getOrganization.font,
      logo: org.data.getOrganization.logo,
      coverMedia: org.data.getOrganization.coverMedia,
      deleted: org.data.getOrganization.deleted,
      suspended: org.data.getOrganization.suspended,
    });
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
      {/* <AppHeader
        menuProp={<button onClick={() => signOut()}>Sign Out</button>}
        organizationProp={organization}
        imagesProp={images}
      ></AppHeader> */}
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
              <Link to={"/notes"}>
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
              <Link to={"/deleteOrganizations"}>
                <AdminButton>Delete Organizations</AdminButton>
              </Link>
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
