import React from "react";
import Papa from "papaparse";
import { Auth, API } from "aws-amplify";
import { createOrderItem as createOrderItemMutation } from "../../graphql/mutations";
import { createOrder as createOrderMutation } from "../../graphql/mutations";
import { updateOrder as updateOrderMutation } from "../../graphql/mutations";
import { appendOwnerState } from "@mui/base";

// const addDataToDynamoDB = async (data) => {
//   const userData = data;

//   await putData("test-shipment", userData);
// };

function exportUserInfo(file) {
  const fileData = JSON.stringify(file);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "shipment.json";
  link.href = url;
  link.click();
}

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
function csvToJson(files) {
  const token = localStorage.getItem("token");

  Papa.parse(files[0], {
    complete: async function (results) {
      // console.log("Finished:", results.data);
      let reqArray = [];
      let orderItemList = [];
      let i = 0;

      for (i = 1; i < 25; i++) {
        let orderItem = {};
        orderItem["species"] = results.data[i][0];
        orderItem["numReceived"] = results.data[i][2] || 0;
        orderItem["emergedInTransit"] = results.data[i][6] || 0;
        orderItem["damagedInTransit"] = results.data[i][7] || 0;
        orderItem["diseased"] = results.data[i][8] || 0;
        orderItem["parasites"] = results.data[i][9] || 0;
        orderItem["numEmerged"] = results.data[i][10] || 0;
        orderItem["poorEmerged"] = results.data[i][11] || 0;
        // let item = await API.graphql({
        //   query: createOrderItemMutation,
        //   variables: {
        //     input: orderItem,
        //   },
        // });
        console.log("item created", orderItem);
        // // addDataToDynamoDB(orderItem);
        // reqArray.push(item);
        orderItemList.push(orderItem);
      }

      let orders = await API.graphql({
        query: createOrderMutation,
        variables: {
          input: {
            shipmentDate: results.data[1][4],
            arrivalDate: results.data[1][5],
            supplier: results.data[1][3],
            // packingList: orderItemList[0],
          },
        },
      });

      // let updateOrders = await API.graphql({
      //   query: updateOrderMutation,
      //   variables: {
      //     input: {
      //       shipmentDate: results.data[1][4],
      //       arrivalDate: results.data[1][5],
      //       supplier: results.data[1][3],
      //       packingList: orders.data.packingList.next,
      //     },
      //   },
      // });
      console.log("orders created", orders);
      // console.log("orders update", updateOrders);
      // // exportUserInfo(testShipment);
      // console.log("test-shipment", testShipment);
      // return testShipment;
    },
  });
}

function ImportExportShipments() {
  return (
    <div className="App">
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          // console.log(files);
          if (files) {
            //testShipment = csvToJson(files);
            console.log("result", csvToJson(files));
          }
        }}
      />
    </div>
  );
}

export default ImportExportShipments;
