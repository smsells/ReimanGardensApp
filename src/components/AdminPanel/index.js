import { React, useEffect, useState } from "react";
import { Auth, API, navRight } from "aws-amplify";
import { Storage } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from "../AdminButton/AdminButton";
import { getOrganization } from "../../graphql/queries";
import AppHeader from "../Header/AppHeader";
import AdminMenu from "../Header/AdminMenu";
import {
  initialImages,
  initialOrganizationState,
} from "../utils/initialStates";
import { getPropsID } from "../Header/Props";

// import Grid from '@mui/material/Grid';

const AdminPanel = () => {
  const navigate = useNavigate();
  const orgID = localStorage.getItem("token");
  const masterID =
    "9478d3c2d6d4f0b3d58ed8c2c1c6b4625520a4522c8246d94a52b6d6532ea706261529c5be5913e829c70205da0c6dace51ac2d677778671b05cd66bc8ed7d12";

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

  // function testOnload(){
  //     console.log("Hey I loaded");
  // }

  return (
    <Authenticator>
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
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
            images.coverMedia ||
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
          <div style={{ gridArea: "2 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/displayShipments"}>
                <AdminButton backgroundColor={organization.sectionHeaderColor}>
                  View Shipments
                </AdminButton>
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
              {orgID === masterID ? (
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
