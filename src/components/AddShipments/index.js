import React, { useState, useEffect } from "react";
import "../../App.css";
import { API, Auth } from "aws-amplify";
import {
  createOrderItem as createOrderItemMutation,
  createOrder as createOrderMutation,
  deleteOrder as deleteOrderMutation,
  deleteOrderItem as deleteOrderItemMutation,
} from "../../graphql/mutations";
import {
  listOrganizations,
  getOrganization,
  listOrders,
  getOrder,
  listOrderItems,
} from "../../graphql/queries";
//import { Storage} from 'aws-amplify';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../Header/AppHeader";
import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";
import { dateCompare } from "../utils/sort";

//import { createShipment as createShipmentMutation } from '../../graphql/mutations';

const AddShipments = () => {
  /*
    species: String
    numReceived: Int
    emergedInTransit: Int
    damagedInTransit: Int
    diseased: Int
    parasites: Int
    poorEmerged: Int
    numEmerged: Int
    orgID: String
    orderID: String
    */
  const navigate = useNavigate();
  const orgID = localStorage.getItem("token");
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [suuplier, setSupplier] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [species, setSpecies] = useState("");
  const [numReceived, setNumReceived] = useState("");
  const [emTransit, setEmTransit] = useState("");
  const [damTransit, setDamTransit] = useState("");
  const [diseased, setDiseased] = useState("");
  const [parasites, setParasites] = useState("");
  const [orderID, setOrderID] = useState("");
  const [commonName, setCommonName] = useState("");
  const [numEmerged, setNumEmerged] = useState("");
  const [poorEmerged, setPoorEmerged] = useState("");

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
      // console.log(
      //   "Here's what the query returned (shipment): " +
      //     JSON.stringify(shipmentsFromID)
      // );

      //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;
      var orders = shipmentsFromID.data.listOrders.items;
      // console.log("Here is what is in the array:  " + JSON.stringify(orders));
      var result = [];
      for (var i in orders) result.push([i, orders[i]]);

      const ordersAscending = [...orders].sort(
        (a, b) => -1 * dateCompare(a.arrivalDate, b.arrivalDate)
      );

      var data = ordersAscending.map((element) => {
        return (
          <tr>
            
            <td>{element.shipmentDate}</td>
            <td>{element.arrivalDate}</td>
            <td>{element.supplier}</td>
            <td>
              {" "}
              <button onClick={(e) => addOrderItem(element, e)}>
                {" "}
                New Item{" "}
              </button>
            </td>
            <td>
              {" "}
              <button onClick={(e) => deleteOrder(element, e)}>
                {" "}
                Delete Order{" "}
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

  async function deleteAll() {
    let filterShip = {
      orgID: { eq: orgID },
    };
    const shipmentsFromID = await API.graphql({
      query: listOrders,
      variables: { filter: filterShip },
    });
    var order = shipmentsFromID.data.listOrders.items;
    for (var i = 0; i < order.length; i++) {
      const item = order[i];
      await deleteOrder(item);
    }

    navigate(0);
  }

  async function deleteOrder(element, e) {
    let filterShip = {
      orderID: { eq: element.id },
    };
    const shipmentItemsFromID = await API.graphql({
      query: listOrderItems,
      variables: { filter: filterShip },
    });

    console.log("shipment items", shipmentItemsFromID);
    try {
      var orderItems = shipmentItemsFromID.data.listOrderItems.items;
      for (var i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        console.log("deleted item", item);

        await API.graphql({
          query: deleteOrderItemMutation,
          variables: { input: { id: item.id } },
        });
      }
    } catch (error) {}

    await API.graphql({
      query: deleteOrderMutation,
      variables: { input: { id: element.id } },
    });
    // navigate(0);
  }

  function addOrder() {
    setShowNewOrderForm((current) => !current);
    setSupplier("");
    setShipmentDate("");
    setArrivalDate("");
  }

  async function handleNewOrderSubmit() {
    console.log("In handle new order Submit");
    await API.graphql({
      query: createOrderMutation,
      variables: {
        input: {
          supplier: suuplier,
          shipmentDate: shipmentDate,
          arrivalDate: arrivalDate,
          orgID: orgID,
        },
      },
    });
    console.log("after query in handleSubmit");
    navigate(0);
  }

  function addOrderItem(element, e) {
    /*
    species: String
    numReceived: Int
    emergedInTransit: Int
    damagedInTransit: Int
    diseased: Int
    parasites: Int
    poorEmerged: Int
    numEmerged: Int
    orgID: String
    orderID: String
    */
    setShowNewItemForm((current) => !current);
    setSpecies("");
    setDamTransit("");
    setEmTransit("");
    setParasites("");
    setDiseased("");
    setNumReceived("");
    setPoorEmerged("");
    setCommonName("");
    setNumEmerged("");
    setOrderID(element.id);
  }

  async function handleNewOrderItemSubmit() {
    console.log("In handle new Item Submit");
    await API.graphql({
      query: createOrderItemMutation,
      variables: {
        input: {
          orgID: orgID,
          orderID: orderID,
          species: species,
          commonName: commonName,
          numReceived: numReceived,
          emergedInTransit: emTransit,
          damagedInTransit: damTransit,
          diseased: diseased,
          parasites: parasites,
          numEmerged: numEmerged,
          poorEmerged: poorEmerged,
        },
      },
    });
    console.log("after query in handleSubmit");
    navigate(0);
  }

  return (
    //Holder for the information
    <div className="DisplayShipments">
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={images}
      />
      <button onClick={addOrder}>Add Order</button>
      <button onClick={deleteAll}>Delete All</button>
      {showNewOrderForm && (
        <>
          <div>
            <form>
              New Order
              <div>
                <label htmlFor="supplier">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  id="supplier"
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Supplier"
                ></input>
                <br></br>
                <label htmlFor="shipmentDate">Shipment Date</label>
                <input
                  type="text"
                  name="shipmentDate"
                  id="shipmentDate"
                  onChange={(e) => setShipmentDate(e.target.value)}
                  placeholder="shipmentDate"
                ></input>
                <br></br>
                <label htmlFor="arrivalDate">Arrival Date</label>
                <input
                  type="text"
                  name="arrivalDate"
                  id="arrivalDate"
                  onChange={(e) => setArrivalDate(e.target.value)}
                  placeholder="arrivalDate"
                ></input>
                {/* <br></br> */}
              </div>
            </form>

            <button
              onClick={(e) => {
                handleNewOrderSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </>
      )}
      <Table hover>
        <thead>
          <tr>
            
            <th>Shipment Date</th>
            <th>Arrival Date</th>
            <th>Supplier</th>

            <th>Add Item</th>
            <th>Delete Order</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
      {showNewItemForm && (
        <>
          <div>
            <form>
              New Item
              <div>
                {/* <p>Order ID: {orderID}</p> */}
                <label htmlFor="species">Species</label>
                <input
                  type="text"
                  name="species"
                  id="species"
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="Species"
                ></input>
                <br></br>
                <label htmlFor="commonName">Common Name</label>
                <input
                  type="text"
                  name="commonName"
                  id="commonName"
                  onChange={(e) => setCommonName(e.target.value)}
                  placeholder="commonName"
                ></input>
                <br></br>
                <label htmlFor="numReceived">Number Received</label>
                <input
                  type="text"
                  name="numReceived"
                  id="numReceived"
                  onChange={(e) => setNumReceived(e.target.value)}
                  placeholder="Number Received"
                ></input>
                <br></br>
                <label htmlFor="emTransit">Emerged In Transit</label>
                <input
                  type="text"
                  name="emTransit"
                  id="emTransit"
                  onChange={(e) => setEmTransit(e.target.value)}
                  placeholder="Emerged In Transit"
                ></input>
                <br></br>
                <label htmlFor="damTransit">Damaged In Transit</label>
                <input
                  type="text"
                  name="damTransit"
                  id="damTransit"
                  onChange={(e) => setDamTransit(e.target.value)}
                  placeholder="Damaged in Transit"
                ></input>
                <br></br>
                <label htmlFor="diseased">Diseased</label>
                <input
                  type="text"
                  name="diseased"
                  id="diseased"
                  onChange={(e) => setDiseased(e.target.value)}
                  placeholder="Diseased"
                ></input>
                <br></br>
                <label htmlFor="numEmerged">Number Emerged</label>
                <input
                  type="text"
                  name="numEmerged"
                  id="numEmerged"
                  onChange={(e) => setNumEmerged(e.target.value)}
                  placeholder="Number Emerged"
                ></input>
                <br></br>
                <label htmlFor="poorEmerged">Poor emerged</label>
                <input
                  type="text"
                  name="poorEmerged"
                  id="poorEmerged"
                  onChange={(e) => setPoorEmerged(e.target.value)}
                  placeholder="Poor Emerged"
                ></input>
                <br></br>
                <label htmlFor="parasites">Parasites</label>
                <input
                  type="text"
                  name="parasites"
                  id="parasites"
                  onChange={(e) => setParasites(e.target.value)}
                  placeholder="Parasites"
                ></input>
              </div>
            </form>

            <button onClick={handleNewOrderItemSubmit}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
};
export default AddShipments;
