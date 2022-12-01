import React, { useState, useEffect } from "react";
import "../../App.css";
import { API } from "aws-amplify";
import { listOrganizations } from "../../graphql/queries";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  deleteOrganization as deleteOrganizationMutation,
  updateOrganization as updateOrganizationMutation,
} from "../../graphql/mutations";
import AppHeader from "../Header/AppHeader";

import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";

const ManageOrganizations = () => {
  const orgID = localStorage.getItem("token");
  const [organizations, setOrganizations] = useState([]);
  const [tableRows, setTableRows] = useState();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setFormData(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    const apiData = await API.graphql({ query: listOrganizations });
    const organizationsFromAPI = apiData.data.listOrganizations.items;
    console.log("organizations from API", organizationsFromAPI);
    setOrganizations(apiData.data.listOrganizations.items);
    var data = organizationsFromAPI.map((element) => {
      const status = element.deleted
        ? "deleted"
        : element.suspended
        ? "suspended"
        : "active";
      return (
        <tr>
          <td>{element.name}</td>
          <td>{element.locationAddress}</td>
          <td>{element.locationZipCode}</td>
          <td>{element.locationCity}</td>
          <td>{element.locationState}</td>
          <td>{status}</td>
          <td>
            {status === "deleted" ? (
              ""
            ) : (
              <button onClick={() => updateOrganization(element, "delete")}>
                Delete
              </button>
            )}
          </td>
          <td>
            {status === "deleted" ? (
              ""
            ) : status === "suspended" ? (
              ""
            ) : (
              <button onClick={() => updateOrganization(element, "suspend")}>
                Suspend
              </button>
            )}
          </td>
          <td>
            {status === "deleted" ? (
              ""
            ) : status === "active" ? (
              ""
            ) : (
              <button onClick={() => updateOrganization(element, "activate")}>
                Activate
              </button>
            )}
          </td>
        </tr>
      );
    });
    setTableRows(data);
  }

  async function updateOrganization(organization, action) {
    // const newOrganizationsArray = organizations.filter(
    //   (organization) => organization.id !== id
    // );
    // setOrganizations(newOrganizationsArray);
    if (action === "delete") {
      organization.deleted = true;
      organization.suspended = false;
    } else if (action === "suspend") {
      organization.deleted = false;
      organization.suspended = true;
    } else if (action === "activate") {
      organization.deleted = false;
      organization.suspended = false;
    }
    await API.graphql({
      query: updateOrganizationMutation,
      variables: {
        input: {
          id: organization.id,
          name: organization.name,
          username: organization.username,
          locationAddress: organization.locationAddress,
          locationZipCode: organization.locationZipCode,
          locationCity: organization.locationCity,
          locationState: organization.locationState,
          headerColor: organization.headerColor,
          sectionHeaderColor: organization.sectionHeaderColor,
          menuColor: organization.menuColor,
          linkFontColor: organization.linkFontColor,
          adminIconColor: organization.adminIconColor,
          homepageBackground: organization.homepageBackground,
          font: organization.font,
          logo: organization.logo,
          coverMedia: organization.coverMedia,
          deleted: organization.deleted,
          suspended: organization.suspended,
        },
      },
    });
    navigate(0);
  }

  return (
    <div className="DeleteOrganizations">
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={images}
      />
      <Table hover>
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>Address</th>
            <th>Zip Code</th>
            <th>City</th>
            <th>State</th>
            <th>Status</th>

            <th>Delete Organization</th>
            <th>Suspend Organization</th>
            <th>Activate Organization</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  );
};

export default ManageOrganizations;
