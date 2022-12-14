import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { API, graphqlOperation } from "aws-amplify";
import {
  createOrderItem as createOrderItemMutation,
  createOrder as createOrderMutation,
  createSpeciesInfo as createSpeciesInfoMutation,
  updateSpeciesInfo as updateSpeciesInfoMutation,
} from "../../graphql/mutations";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  listOrders,
  listOrderItems,
  listSpeciesInfos,
} from "../../graphql/queries";
import { DownloadPopUp } from "./DownloadPopUp";
import AppHeader from "../Header/AppHeader";
import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";
import { dateCompare } from "../utils/sort";

//npm install --save react-csv
function exportUserInfo(file) {
  const fileData = JSON.stringify(file);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "shipment.csv";
  link.href = url;
  link.click();
}

function ImportExportShipments() {
  const orgID = localStorage.getItem("token");
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState();
  const [exportData, setExportData] = useState({});
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [fileHeaders] = useState([
    // { label: "ID", key: "id" },
    { label: "Species", key: "species" },
    { label: "Common Name", key: "commonName" },
    { label: "No. Received", key: "numReceived" },
    { label: "Supplier", key: "supplier" },
    { label: "Ship Date", key: "shipmentDate" },
    { label: "Arrival Date", key: "arrivalDate" },
    { label: "Emerged in transit", key: "emergedInTransit" },
    { label: "Damaged in transit", key: "damagedInTransit" },
    { label: "No. diseased", key: "diseased" },
    { label: "No. parasite", key: "parasites" },
    { label: "No. emerged", key: "numEmerged" },
    { label: "Poor emerged", key: "poorEmerged" },
  ]);
  const [formData, setFormData] = useState({ from: "", to: "" });
  const [shipmentRange, setShipmentRange] = useState([]);
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    // Fetch images and props for page header
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
    fetchShipments();
  }, []);

  /**
   *
   * @param {*} files
   * @returns
   *
   * @decription
   * Fields
   *  0: Species
   *  1: common name
   *  2: num received
   *  3: supplier
   *  4: ship date
   *  5: arrival date
   *  6: emerged in transit
   *  7: damaged in transit
   *  8: diseased
   *  9: parasit
   *  10: num emerged
   *  11: poor emerged
   */
  async function csvToJson(files) {
    Papa.parse(files[0], {
      complete: async function (results) {
        let reqArray = [];
        let orderItemList = [];
        let i = 0;
        let shipmentDate = "";
        let arrivalDate = "";
        let supplier = "";
        if (results.data.length === 0) return;
        let order = await API.graphql({
          query: createOrderMutation,
          variables: {
            input: {
              orgID: orgID,
              shipmentDate: results.data[1][4],
              arrivalDate: results.data[1][5],
              supplier: results.data[1][3],
            },
          },
        });
        let orderID = order.data.createOrder.id;

        // for (i = 1; i < results.data.length; i++) {
        for (i = 1; i < 300; i++) {
          if (
            shipmentDate !== results.data[i][4] ||
            arrivalDate !== results.data[i][5] ||
            supplier !== results.data[i][3]
          ) {
            shipmentDate = results.data[i][4];
            arrivalDate = results.data[i][5];
            supplier = results.data[i][3];
            order = await API.graphql({
              query: createOrderMutation,
              variables: {
                input: {
                  orgID: orgID,
                  shipmentDate: results.data[i][4],
                  arrivalDate: results.data[i][5],
                  supplier: results.data[i][3],
                },
              },
            });
            // console.log("New shipment date", shipmentDate);
            // console.log("New arrival date", arrivalDate);
            // console.log("New supplier", supplier);
            orderID = order.data.createOrder.id;
          }

          // orderID = order.data.createOrder.id;
          console.log("orders created", orderID);

          let orderItem = {};
          orderItem["orgID"] = orgID;
          orderItem["orderID"] = orderID;
          orderItem["species"] = results.data[i][0] || "";
          orderItem["commonName"] = results.data[i][1] || "";
          orderItem["numReceived"] = parseInt(results.data[i][2], 10) || 0;
          orderItem["emergedInTransit"] = parseInt(results.data[i][6], 10) || 0;
          console.log("emergedInTransit", results.data[i][6]);
          orderItem["damagedInTransit"] = parseInt(results.data[i][7], 10) || 0;
          orderItem["diseased"] = parseInt(results.data[i][8], 10) || 0;
          orderItem["parasites"] = parseInt(results.data[i][9], 10) || 0;
          orderItem["numEmerged"] = parseInt(results.data[i][10], 10) || 0;
          orderItem["poorEmerged"] = parseInt(results.data[i][11], 10) || 0;
          orderItem["numReleased"] = 0;
          await API.graphql({
            query: createOrderItemMutation,
            variables: {
              input: orderItem,
            },
          });

          let filter = {
            and: [
              {
                orgID: { eq: orgID },
              },
              {
                name: { eq: orderItem.species },
              },
            ],
          };
          const speciesInfo = await API.graphql({
            query: listSpeciesInfos,
            variables: { filter: filter },
          });
          console.log("species info", speciesInfo);
          const speciesInfoData = speciesInfo.data.listSpeciesInfos.items;
          console.log("species info", speciesInfoData);

          if (speciesInfoData === null || speciesInfoData.length === 0) {
            const date = new Date();
            await API.graphql({
              query: createSpeciesInfoMutation,
              variables: {
                input: {
                  name: orderItem.species,
                  numInFlight: 0,
                  totalReceived: orderItem.numReceived,
                  firstFlown: orderItem.numReleased > 0 ? date.toString() : "",
                  lastFlown: "",
                  orgID: orgID,
                },
              },
            });
          } else {
            await API.graphql({
              query: updateSpeciesInfoMutation,
              variables: {
                input: {
                  id: speciesInfoData[0].id,
                  name: orderItem.species,
                  numInFlight:
                    parseInt(speciesInfoData[0].numInFlight, 10) +
                    orderItem.numReleased,
                  totalReceived:
                    parseInt(speciesInfoData[0].totalReceived, 10) +
                    orderItem.numReceived,
                  firstFlown: speciesInfoData[0].firstFlown,
                  orgID: speciesInfoData[0].orgID,
                  lastFlown: speciesInfoData[0].lastFlown,
                },
              },
            });
          }
          // console.log("item created", orderItem);
          orderItemList.push(orderItem);
        }
        navigate(0);
      },
    });
  }

  async function fetchShipments() {
    let filterShip = {
      orgID: { eq: orgID },
    };
    const shipmentsFromID = await API.graphql({
      query: listOrders,
      variables: { filter: filterShip },
    });

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
            <button onClick={(e) => exportShipment(element, e)}>
              {" "}
              Export Shipment{" "}
            </button>
          </td>
        </tr>
      );
    });

    setTableRows(data);
  }

  async function exportShipmentRange(e) {
    let filterShip = {
      orgID: { eq: orgID },
    };
    const shipmentsFromID = await API.graphql({
      query: listOrders,
      variables: { filter: filterShip },
    });
    var orders = shipmentsFromID.data.listOrders.items;
    var shipmentList = [];
    for (var i = 0; i < orders.length; i++) {
      if (
        dateCompare(formData.from, orders[i].arrivalDate) >= 0 &&
        dateCompare(formData.to, orders[i].arrivalDate) <= 0
      ) {
        // console.log("order", orders[i]);
        // console.log(
        //   "from to order",
        //   dateCompare(formData.from, orders[i].arrivalDate)
        // );
        setShipmentRange([...shipmentRange, orders[i]]);
        shipmentList = [...shipmentList, orders[i]];
      }
    }

    // console.log("from", formData.from);
    // console.log("to", formData.to);
    // console.log("here is the range of orders", shipmentRange);
    console.log("here is the range of list", shipmentList);
    let exportJSON = [];

    for (var j = 0; j < shipmentList.length; j++) {
      console.log("shipment j", shipmentList[j].id);
      const orderID = shipmentList[j].id;

      let filterShip = {
        and: [
          {
            orgID: { eq: orgID },
          },
          {
            orderID: { eq: orderID },
          },
        ],
      };
      let search = {
        limit: 100000,
        filter: filterShip,
      };

      let allData = [];
      const recursiveGetOrderItems = (currentResults) => {
        if (currentResults === null || currentResults.nextToken != null) {
          if (currentResults !== null && currentResults.nextToken != null) {
            search.nextToken = currentResults.nextToken;
          }
          API.graphql(graphqlOperation(listOrderItems, search))
            .then((result) => {
              console.log("result: " + JSON.stringify(result));
              currentResults = result.data.listOrderItems;
              console.log("current results: " + JSON.stringify(currentResults));
              allData = allData.concat(currentResults.items);
              recursiveGetOrderItems(currentResults);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // const shipmentItemsFromID = await API.graphql({
          //   query: listOrderItems,
          //   variables: { filter: filterShip },
          // });
          // console.log("api items data", shipmentItemsFromID);

          // var orderItems = shipmentItemsFromID.data.listOrderItems.items;
          console.log("id query data: " + JSON.stringify(allData));

          var orderItems = allData;
          console.log("order items", orderItems);

          let i = 0;
          for (i = 0; i < orderItems.length; i++) {
            let itemRow = {};
            itemRow["species"] = orderItems[i].species;
            itemRow["commonName"] = orderItems[i].commonName;
            itemRow["numReceived"] = orderItems[i].numReceived;
            itemRow["supplier"] = shipmentList[j].supplier;
            itemRow["shipmentDate"] = shipmentList[j].shipmentDate;
            itemRow["arrivalDate"] = shipmentList[j].arrivalDate;
            itemRow["emergedInTransit"] = orderItems[i].emergedInTransit;
            console.log(
              "Export emergedInTransit",
              orderItems[i].emergedInTransit
            );
            itemRow["damagedInTransit"] = orderItems[i].damagedInTransit;
            itemRow["diseased"] = orderItems[i].diseased;
            itemRow["parasites"] = orderItems[i].parasites;
            itemRow["numEmerged"] = orderItems[i].numEmerged;
            itemRow["poorEmerged"] = orderItems[i].poorEmerged;
            exportJSON.push(itemRow);
          }
          console.log("export json", exportJSON);
          setExportData(exportJSON);
          setPopupVisibility(true);
        }
      };
    }
  }

  async function exportShipment(order, e) {
    let filterShip = {
      orderID: { eq: order.id },
    };
    let search = {
      limit: 100000,
      filter: filterShip,
    };

    let allData = [];
    const recursiveGetOrderItems = (currentResults) => {
      if (currentResults === null || currentResults.nextToken != null) {
        if (currentResults !== null && currentResults.nextToken != null) {
          search.nextToken = currentResults.nextToken;
        }
        API.graphql(graphqlOperation(listOrderItems, search))
          .then((result) => {
            console.log("result: " + JSON.stringify(result));
            currentResults = result.data.listOrderItems;
            console.log("current results: " + JSON.stringify(currentResults));
            allData = allData.concat(currentResults.items);
            recursiveGetOrderItems(currentResults);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("id query data: " + JSON.stringify(allData));
        var orderItems = allData;
        // console.log("order items", orderItems);

        let exportJSON = [];
        let i = 0;
        for (i = 0; i < orderItems.length; i++) {
          let itemRow = {};
          itemRow["species"] = orderItems[i].species;
          itemRow["commonName"] = orderItems[i].commonName;
          itemRow["numReceived"] = orderItems[i].numReceived;
          itemRow["supplier"] = order.supplier;
          itemRow["shipmentDate"] = order.shipmentDate;
          itemRow["arrivalDate"] = order.arrivalDate;
          itemRow["emergedInTransit"] = orderItems[i].emergedInTransit;
          console.log(
            "Export emergedInTransit",
            orderItems[i].emergedInTransit
          );
          itemRow["damagedInTransit"] = orderItems[i].damagedInTransit;
          itemRow["diseased"] = orderItems[i].diseased;
          itemRow["parasites"] = orderItems[i].parasites;
          itemRow["numEmerged"] = orderItems[i].numEmerged;
          itemRow["poorEmerged"] = orderItems[i].poorEmerged;
          exportJSON.push(itemRow);
        }

        setExportData(exportJSON);
        setPopupVisibility(true);
      }
    };
    recursiveGetOrderItems(null);
  }

  return (
    <div className="ImportExportShipment">
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={images}
      />
      <p>
        From
        <input
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          placeholder="MM/DD/YY"
          value={formData.name}
        />{" "}
        To{" "}
        <input
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          placeholder="MM/DD/YY"
          value={formData.name}
        />{" "}
        <button
          onClick={(e) => {
            exportShipmentRange(e);
          }}
        >
          {" "}
          Export Shipment{" "}
        </button>
      </p>
      <Table hover>
        <thead>
          <tr>
            <th>Shipment Date</th>
            <th>Arrival Date</th>
            <th>Supplier</th>

            <th>Export Shipment</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>

      <label for="fileUpload" class="custom-file-upload">
        Import Shipments
      </label>
      <input
        id="fileUpload"
        type="file"
        accept=".csv,.xlsx,.xls"
        name="imageUpload"
        onChange={async (e) => {
          const files = e.target.files;
          // console.log(files);
          if (files) {
            //testShipment = csvToJson(files);
            console.log("result", await csvToJson(files));
          }
        }}
      />

      <div>
        {popupVisibility ? (
          <DownloadPopUp
            fileDataProp={exportData}
            fileHeadersProp={fileHeaders}
            closePopup={() => setPopupVisibility(false)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ImportExportShipments;
