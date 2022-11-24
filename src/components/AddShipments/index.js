// import React from "react";
// import { useState, useEffect } from "react";
// import { graphqlOperation, Storage } from "aws-amplify";
// import { useNavigate } from "react-router-dom";
// import { API } from "aws-amplify";
// import Grid from "@material-ui/core/Grid";
// import { getOrder } from "../../graphql/queries";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";

// const AddShipments = () => {
//   const navigate = useNavigate();

//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item
//     );
//     setCheckedState(updatedCheckedState);
//   };

//   useEffect(() => {}, []);

//   const [orderNumber, setOrderNumber] = useState("");
//   const [shipmentDate, setShipmentDate] = useState("");
//   const [arrivalDate, setArrivalDate] = useState("");
//   const [supplier, setSupplier] = useState("");
//   const [species, setSpecies] = useState("");
//   const [numReceived, setNumReceived] = useState("");
//   const [emergedInTransit, setEmergedInTransit] = useState("");
//   const [damagedInTransit, setDamagedInTransit] = useState("");
//   const [diseased, setDiseased] = useState("");
//   const [parasites, setParasites] = useState("");
//   const [poorEmerged, setPoorEmerged] = useState("");
//   const [numEmerged, setNumEmerged] = useState("");

//   return (
//     <>
//       <div>
//         <Grid
//           container
//           spacing={2}
//           direction="row"
//           alignItems="center"
//           justifyContent="center"
//           rowSpacing={2}
//         >
//           <Grid item xs={4}>
//             <label> Order Number </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setOrderNumber(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Shipment Date </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setShipmentDate(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Arrival Date </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setArrivalDate(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Supplier </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setSupplier(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Species </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setSpecies(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Number Recieved </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setNumReceived(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Emerged in Transit </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setEmergedInTransit(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Damaged in Transit </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setDamagedInTransit(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Diseased </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setDiseased(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Parasites </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setParasites(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Poor Emerged </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setPoorEmerged(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <label> Number Emerged </label>
//           </Grid>
//           <Grid item xs={8}>
//             <input
//               type="text"
//               width={"100%"}
//               onChange={(e) => setNumEmerged(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//         <button
//           className="form-button"
//           type="submit"
//           value="Submit"
//           onClick={handleSubmit}
//         >
//           Save
//         </button>
//       </div>
//     </>
//   );
// };
// export default AddShipments;
