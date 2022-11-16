import React, { useState, useEffect } from "react";
import "../../App.css";
import { API } from "aws-amplify";
import { listOrganizations } from "../../graphql/queries";
import { Storage } from "aws-amplify";
import Table from 'react-bootstrap/Table'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  deleteOrganization as deleteOrganizationMutation,
} from "../../graphql/mutations";

const DeleteOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const initialFormState = { name: "", description: "" };

  //const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchOrganizations() {
    const apiData = await API.graphql({ query: listOrganizations });
    const organizationsFromAPI = apiData.data.listOrganizations.items;
    setOrginizations(apiData.data.listOrganizations.items);
    var data = organizationsFromAPI.organizations.map(element =>{
      return(
        <tr>
          <td>{element.name}</td>
          <td>{element.locationCity}</td>
          <td>{element.locationState}</td>
          <button onClick={() => deleteOrganization(organizations)}>Delete</button>
        </tr>
      )
    })
  }


  async function deleteOrganization({ id }) {
    const newOrganizationsArray = organizations.filter((organization) => organization.id !== id);
    setOrganizations(newOrganizationsArray);
    await API.graphql({
      query: deleteOrganizationMutation,
      variables: { input: { id } },
    });
  }

 

  return(
    <div className='DeleteOrganizations'>
     <Table hover>
        <thead>
          <tr>    
            <th> Order Number</th>
            <th>Shipment Date</th>
            <th>Arrival Date</th>
            <th>Supplier</th>
            <th>Delete </th>
             
            <th>View More</th>
            
          </tr>
        </thead>
        <tbody>
         
          {tableRows}
        </tbody>
      </Table>  
      


    </div>

  )



};

export default DeleteOrganizations;