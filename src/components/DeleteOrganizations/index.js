import React, { useState, useEffect } from "react";
import "../../App.css";
import { API } from "aws-amplify";
import { listOrganizations } from "../../graphql/queries";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { deleteOrganization as deleteOrganizationMutation } from "../../graphql/mutations";

const DeleteOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [tableRows, setTableRows] = useState();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const initialFormState = { name: "", description: "" };

  //const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    const apiData = await API.graphql({ query: listOrganizations });
    const organizationsFromAPI = apiData.data.listOrganizations.items;
    console.log("organizations from API", organizationsFromAPI);
    setOrganizations(apiData.data.listOrganizations.items);
    var data = organizationsFromAPI.map((element) => {
      return (
        <tr>
          <td>{element.name}</td>
          <td>{element.locationCity}</td>
          <td>{element.locationState}</td>
          <button onClick={() => deleteOrganization(element)}>Delete</button>
        </tr>
      );
    });
    setTableRows(data);
  }

  async function deleteOrganization({ id }) {
    const newOrganizationsArray = organizations.filter(
      (organization) => organization.id !== id
    );
    setOrganizations(newOrganizationsArray);
    await API.graphql({
      query: deleteOrganizationMutation,
      variables: { input: { id } },
    });
    navigate(0);
  }

  return (
    <div className="DeleteOrganizations">
      <Table hover>
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>City</th>
            <th>State</th>

            <th>Delete Organization</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  );
};

export default DeleteOrganizations;
