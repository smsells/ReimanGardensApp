import React, { useState, useEffect } from "react";
import { Form, Navigate, useSearchParams } from "react-router-dom";
import { a, API, graphqlOperation } from "aws-amplify";
import {
  createSpeciesInfo as createSpeciesInfoMutation,
  updateSpeciesInfo as updateSpeciesInfoMutation,
  updateButterflyInFlight as updateButterflyInFlightMutation,
  createButterflyInFlight as createButterflyInFlightMutation,
} from "../../graphql/mutations";
import {
  listOrderItems,
  getSpeciesInfo,
  listSpeciesInfos,
  listButterflyInFlights,
  listButterflies,
} from "../../graphql/queries";
//import { Storage} from 'aws-amplify';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateOrderItem } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import AppHeader from "../Header/AppHeader";
import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";
import { dateCompare } from "../utils/sort";

const Release = () => {
  //Doing something similar to before except with the PackingList Object
  const [searchparams] = useSearchParams();
  console.log(searchparams.get("id") + " in packingList");
  const [shipments, setShipments] = useState([[]]); //not sure I need the typing thing
  //Idea is that it will be an array of objects to populate a 2d array
  //Will need Query Schema for all of this

  //const initialFormState = { /* Object to hold how much info we need for each form*/  }

  //const [formData, setFormData] = useState(initialFormState);
  const orgID = localStorage.getItem("token");
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState();
  const [showForm, setShowForm] = useState(false);
  const [defaultSpecies, setDefaultSpecies] = useState();
  const [defaultCommonName, setDefaultCommonName] = useState();
  const [defaultNumReceived, setDefaultNumReceived] = useState();
  const [defaultNumReleased, setDefaultNumReleased] = useState();

  const [defaultEmTransit, setDefaultEmTransit] = useState();
  const [defaultPoorTransit, setDefaultPoorTransit] = useState();

  const [defaultDamTransit, setDefaultDamTransit] = useState();
  const [defaultDiseased, setDefaultDiseased] = useState();
  const [defaultParasites, setDefaultParasites] = useState();
  const [defaultID, setDefaultID] = useState();
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    fetchShipments();
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
  }, []);

  function handleUp(id) {
    var thisText = document.getElementById(id);
    thisText.value++;
  }
  function handleDown(id) {
    var thisText = document.getElementById(id);
    thisText.value--;
  }

  async function handleSubmit2(
    idFromTable,
    numReleasedCurrent,
    scientificName
  ) {
    console.log("in handle submit 2");
    console.log("ID in handle submit: " + idFromTable);
    console.log("NUM R: " + numReleasedCurrent);

    var numReleasedText = document.getElementById(idFromTable).value;
    console.log("num released in submit2: " + numReleasedText);

    const update = await API.graphql({
      query: updateOrderItem,
      variables: {
        input: {
          id: idFromTable,
          numReleased: +numReleasedCurrent + +numReleasedText,
        },
      },
    });
    console.log("Submit 2 update: " + JSON.stringify(update));
    const currentDate = new Date();
    const currentDateString =
      currentDate.getMonth() +
      "/" +
      currentDate.getDate() +
      "/" +
      currentDate.getFullYear();

    // update spcies info first flown
    let filter = {
      and: [
        {
          orgID: { eq: orgID },
        },
        {
          scientificName: { eq: scientificName },
        },
        {
          dateReleased: { eq: currentDateString },
        },
      ],
    };
    let filter3 = {
      and: [
        {
          orgID: { eq: orgID },
        },
        {
          name: { eq: scientificName },
        },
      ],
    };
    const speciesInfo = await API.graphql({
      query: listSpeciesInfos,
      variables: { filter: filter3 },
    });
    const speciesInfoData = speciesInfo.data.listSpeciesInfos.items;
    console.log("species info", speciesInfoData);
    let updateInFlight2;
    try {
      updateInFlight2 = await API.graphql({
        query: listButterflyInFlights,
        variables: { filter: filter },
      });
      const updateInFlightData =
        updateInFlight2.data.listButterflyInFlights.items;
      if (
        updateInFlightData.length === 0 ||
        speciesInfoData[0].firstFlown === "" ||
        speciesInfoData[0].firstFlown === null
      ) {
        const infoUpdated = await API.graphql({
          query: updateSpeciesInfoMutation,
          variables: {
            input: {
              id: speciesInfoData[0].id,
              firstFlown: currentDateString,
            },
          },
        });
        console.log("species info firstflown", infoUpdated);
      }
    } catch (error) {
      console.log(error);
    }

    // update/create release object
    console.log("call butterfly in flights api");
    let updateInFlight;
    try {
      updateInFlight = await API.graphql({
        query: listButterflyInFlights,
        variables: { filter: filter },
      });
    } catch (error) {
      console.log(error);
    }

    console.log("Butterfly in flight api", updateInFlight);
    const updateInFlightData = updateInFlight.data.listButterflyInFlights.items;
    if (updateInFlightData.length > 0) {
      // updateInFlightData[0].inFlight =
      //   +updateInFlightData[0].inFlight + +numReleasedCurrent;
      console.log("in update");

      const done = await API.graphql({
        query: updateButterflyInFlightMutation,
        variables: {
          input: {
            id: updateInFlightData[0].id,
            inFlight: +updateInFlightData[0].inFlight + +numReleasedText,
            dateReleased: updateInFlightData[0].dateReleased,
            scientificName: updateInFlightData[0].scientificName,
            lifeSpan: updateInFlightData[0].lifeSpan,
            orgID: orgID,
          },
        },
      });
      console.log("update", done);
    } else {
      console.log("in create in flight");

      let create;
      try {
        let filter = {
          and: [
            {
              scientificName: { eq: scientificName },
            },
          ],
        };
        console.log("in create: get butterlfies");
        const butterlfies = await API.graphql({
          query: listButterflies,
          variables: { filter: filter },
        });
        console.log("in create: butterfly data", butterlfies);

        const butterfliesData = butterlfies.data.listButterflies.items;
        if (butterfliesData.length < 1) return;

        console.log("in create: create");
        create = await API.graphql({
          query: createButterflyInFlightMutation,
          variables: {
            input: {
              inFlight: +numReleasedText,
              dateReleased: currentDateString,
              scientificName: scientificName,
              lifeSpan: butterfliesData[0].lifespan,
              orgID: orgID,
            },
          },
        });
      } catch (error) {
        console.log("in create error", error);
      }

      console.log("create", create);
    }

    //update species info
    let filter2 = {
      and: [
        {
          orgID: { eq: orgID },
        },
        {
          scientificName: { eq: scientificName },
        },
      ],
    };
  }
  async function handleSubmit(defaultNumReceivedProp, defaultNumReleasedProp) {
    console.log("In handle Submit");
    var diseasedInternal = document.getElementById("diseased").value;
    var speciesInternal = document.getElementById("species").value;
    var commonNameInternal = document.getElementById("commonName").value;
    var numEmergedInternal = document.getElementById("emTransit").value;
    var numDamagedInternal = document.getElementById("damTransit").value;
    var parasitesInternal = document.getElementById("parasites").value;
    var poorEmergedInternal = document.getElementById("poor").value;
    var numReceivedInternal = parseInt(
      document.getElementById("numReceived").value,
      10
    );
    var numReleasedInternal = parseInt(
      document.getElementById("numReleased").value,
      10
    );
    console.log("num received internal", numReceivedInternal);
    console.log("default received", defaultNumReceivedProp);
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
    await API.graphql({
      query: updateOrderItem,
      variables: {
        input: {
          id: defaultID,
          species: speciesInternal,
          commonName: commonNameInternal,
          numReceived: numReceivedInternal,
          emergedInTransit: numEmergedInternal,
          poorEmerged: poorEmergedInternal,
          damagedInTransit: numDamagedInternal,
          diseased: diseasedInternal,
          parasites: parasitesInternal,
          numReleased: numReleasedInternal,
        },
      },
    });

    let filter = {
      and: [
        {
          orgID: { eq: orgID },
        },
        {
          name: { eq: speciesInternal },
        },
      ],
    };
    const speciesInfo = await API.graphql({
      query: listSpeciesInfos,
      variables: { filter: filter },
    });
    const speciesInfoData = speciesInfo.data.listSpeciesInfos.items;
    console.log("species info before", speciesInfoData);
    if (speciesInfoData === null || speciesInfoData.length === 0) {
      const date = new Date();
      const dateString =
        date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear;
      const create = await API.graphql({
        query: createSpeciesInfoMutation,
        variables: {
          input: {
            name: speciesInternal,
            numInFlight: numReleasedInternal,
            totalReceived: numReceivedInternal,
            firstFlown: numReleasedInternal > 0 ? dateString : "",
            lastFlown: "",
            orgID: orgID,
          },
        },
      });
      console.log("create species info", create);
    } else {
      console.log("default num released", defaultNumReleasedProp);
      let date = new Date();
      const dateString =
        date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear;
      let lastFlownDate = dateString;
      const numInFlightInt =
        speciesInfoData[0].numInFlight -
        defaultNumReleasedProp +
        numReleasedInternal;
      if (numInFlightInt > 0) {
        lastFlownDate = "";
      }
      console.log("num in flight int", numInFlightInt);
      const update = await API.graphql({
        query: updateSpeciesInfoMutation,
        variables: {
          input: {
            id: speciesInfoData[0].id,
            name: speciesInternal,
            numInFlight: numInFlightInt,
            totalReceived:
              speciesInfoData[0].totalReceived -
              defaultNumReceivedProp +
              numReceivedInternal,
            lastFlown:
              numInFlightInt === 0 ? dateString : speciesInfoData[0].lastFlown,
            firstFlown:
              speciesInfoData[0].numInFlight > 0
                ? speciesInfoData[0].firstFlown
                : dateString,
            orgID: speciesInfoData[0].orgID,
          },
        },
      });
      console.log("update species info", update);
    }
    console.log("after query in handleSubmit");
    navigate(0);
  }
  function handleEdit(
    id,
    species,
    commonName,
    numReceived,
    emergedInTransit,
    poorReceived,
    damagedInTransit,
    diseased,
    parasites,
    numReleased
  ) {
    setShowForm((current) => !current);
    setDefaultSpecies(species);
    setDefaultCommonName(commonName);
    setDefaultDamTransit(damagedInTransit);
    setDefaultEmTransit(emergedInTransit);
    setDefaultParasites(parasites);
    setDefaultDiseased(diseased);
    setDefaultNumReceived(numReceived);
    setDefaultNumReleased(numReleased || 0);
    setDefaultID(id);
    setDefaultPoorTransit(poorReceived);
    console.log("ID from handle Edit: " + id);
  }
  async function fetchShipments() {
    var param = searchparams.get("id");

    let filter = {
      orderID: { eq: param },
    };
    let search = {
      limit: 100000,
      filter: filter,
    };

    /*
    const apiData = await API.graphql({
      query: listOrderItems,
      variables: { filter: filterOrders},
    });
    */
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

        //There should be only 1 organization so

        //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;
        var data = allData.map((element) => {
          var allTogether =
            element.emergedInTransit +
            element.poorEmerged +
            element.damagedInTransit +
            element.diseased +
            element.parasites +
            element.numReleased;

          return (
            <tr>
              <td>{element.species}</td>
              <td>{element.commonName}</td>
              <td>{element.numReceived}</td>
              <td>{allTogether}</td>
              <td>{element.numReceived - allTogether}</td>
              <td>
                <input type="text" id={element.id} value="0"></input>
                <button onClick={handleUp.bind(this, element.id)}>Up</button>
                <button onClick={handleDown.bind(this, element.id)}>
                  Down
                </button>
              </td>
              <td>
                {" "}
                {console.log(
                  "This is the ID currently for " +
                    element.species +
                    " ID: " +
                    element.id
                )}
                <button
                  onClick={handleSubmit2.bind(
                    this,
                    element.id,
                    element.numReleased,
                    element.species
                  )}
                >
                  {" "}
                  Submit{" "}
                </button>
              </td>
            </tr>
          );
        });
        setTableRows(data);
      }
    };
    recursiveGetOrderItems(null);
    //check what theyre called lol

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
      <h1>Releases</h1>
      <Table hover>
        <thead>
          <tr>
            <th> Species</th>
            <th> Common Name</th>
            <th>Number Received</th>
            <th>Accounted For</th>
            <th>Remaining</th>
            <th>Enter Released</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
      {showForm && (
        <>
          <div>
            <form>
              Edit
              <div>
                <label htmlFor="species">Species</label>
                <input
                  type="text"
                  name="species"
                  id="species"
                  defaultValue={defaultSpecies}
                ></input>
                <br></br>
                <label htmlFor="commonName">Common Name</label>
                <input
                  type="text"
                  name="commonName"
                  id="commonName"
                  defaultValue={defaultCommonName}
                ></input>
                <br></br>
                <label htmlFor="numReceived">Number Received</label>
                <input
                  type="text"
                  name="numReceived"
                  id="numReceived"
                  defaultValue={defaultNumReceived}
                ></input>
                <br></br>
                <label htmlFor="emTransit">Emerged In Transit</label>
                <input
                  type="text"
                  name="emTransit"
                  id="emTransit"
                  defaultValue={defaultEmTransit}
                ></input>
                <br></br>
                <label htmlFor="poor">Poorly Emerged</label>
                <input
                  type="text"
                  name="poor"
                  id="poor"
                  defaultValue={defaultPoorTransit}
                ></input>
                <br></br>
                <label htmlFor="damTransit">Damaged In Transit</label>
                <input
                  type="text"
                  name="damTransit"
                  id="damTransit"
                  defaultValue={defaultDamTransit}
                ></input>
                <br></br>
                <label htmlFor="diseased">Diseased</label>
                <input
                  type="text"
                  name="diseased"
                  id="diseased"
                  defaultValue={defaultDiseased}
                ></input>
                <br></br>
                <label htmlFor="parasites">Parasites</label>
                <input
                  type="text"
                  name="parasites"
                  id="parasites"
                  defaultValue={defaultParasites}
                ></input>
                <br></br>
                <label htmlFor="numReleased">Number Released</label>
                <input
                  type="text"
                  name="numReleased"
                  id="numReleased"
                  defaultValue={defaultNumReleased}
                ></input>
              </div>
            </form>

            <button
              onClick={(e) =>
                handleSubmit(defaultNumReceived, defaultNumReleased)
              }
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};
//TODO edit orderItem with submit
export default Release;
