import React, { useState, useEffect } from "react";
import "../../App.css";
import { API, Auth } from "aws-amplify";
import {
  listOrganizations,
  getOrganization,
  listOrders,
} from "../../graphql/queries";
//import { Storage} from 'aws-amplify';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navigate,
  useNavigate,
  createSearchParams,
  Link,
} from "react-router-dom";
import AppHeader from "../Header/AppHeader";

import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";
import { dateCompare } from "../utils/sort";
//import { createShipment as createShipmentMutation } from '../../graphql/mutations';

const DisplayShipments = () => {
  const navigate = useNavigate();
  const orgID = localStorage.getItem("token");

  function handlePackingList(id, e) {
    console.log(id);
    navigate({
      pathname: "/packingList",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  }

  //Idea is that it will be an array of objects to populate a 2d array
  //Will need Query Schema for all of this

  //const initialFormState = { /* Object to hold how much info we need for each form*/  }

  //const [formData, setFormData] = useState(initialFormState);
  const [tableRows, setTableRows] = useState();
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
    fetchShipments();
  }, []);

  async function fetchShipments() {
    Auth.currentAuthenticatedUser().then(async (user) => {
      var usernameToGet = user.username;
      console.log("Username: " + usernameToGet);
      let filter = {
        username: { eq: usernameToGet },
      };
      const apiData = await API.graphql({
        query: listOrganizations,
        variables: { filter: filter },
      });
      //check what theyre called lol
      console.log("Here's what the query returned: " + JSON.stringify(apiData));
      if (apiData == null) {
        console.log("its null");
      }

      const organizationFromAPI = apiData.data.listOrganizations.items;
      const organizationID = organizationFromAPI[0].id;
      console.log("Organization ID: " + organizationID);
      //console.log("To String?: "+JSON.stringify(organizationsFromAPI));
      //There should be only 1 organization so
      //const shipmentsFromAPI = organizationsFromAPI.Shipments;
      let filterShip = {
        orgID: { eq: orgID },
      };
      const shipmentsFromID = await API.graphql({
        query: listOrders,
        variables: { filter: filterShip },
      });
      console.log(
        "Here's what the query returned (shipment): " +
          JSON.stringify(shipmentsFromID)
      );

      //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;
      var orders = shipmentsFromID.data.listOrders.items;
      console.log("Here is what is in the array:  " + JSON.stringify(orders));
      var result = [];
      for (var i in orders) result.push([i, orders[i]]);
      const ordersAscending = [...orders].sort(
        (a, b) => -1 * dateCompare(a.arrivalDate, b.arrivalDate)
      );

      var data = ordersAscending.map((element) => {
        return (
          <tr>
            <td>{element.orderNumber}</td>
            <td>{element.shipmentDate}</td>
            <td>{element.arrivalDate}</td>
            <td>{element.supplier}</td>
            <td>
              {" "}
              <button onClick={handlePackingList.bind(this, element.id)}>
                {" "}
                Packing List{" "}
              </button>
            </td>
          </tr>
        );
      });

      setTableRows(data);
    });

    /*
        
        Not sure if this will work because the table is nested but
              Ideas:
              Button with the ID of the shipment on the inside to take you to another page where the order items are iterated in a similar way to this page
              For loop to iterate over all the 
        */
  }

  return (
    //Holder for the information
    <div className="DisplayShipments">
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={images}
      />
      <Table hover>
        <thead>
          <tr>
            <th> Order Number</th>
            <th>Shipment Date</th>
            <th>Arrival Date</th>
            <th>Supplier</th>

            <th>View More</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  );
};
export default DisplayShipments;
