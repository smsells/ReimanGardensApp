import React from "react";
import {
  speciesRangeList,
  butterflyFamilies,
  butterflySubFamilies,
} from "./AddButterflyList";
import { useState, useEffect } from "react";
import { graphqlOperation, Storage } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  createButterfly as createButterflyMutation,
  createImage as createImageMutation,
} from "../../graphql/mutations";
import "./AddButterfly.css";
import { listButterflies } from "../../graphql/queries";
import AppHeader from "../Header/AppHeader";

import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AppMenu from "../Header/AppMenu";

const AddButterfly = () => {
  var butterflyObject;
  const orgID = localStorage.getItem("token");

  const initialButterflyObjectState = {
    scientificName: "",
    commonName: "",
    image: "",
    family: "",
    subfamily: "",
    lifespan: "",
    range: "",
    hosts: "",
    food: "",
    habitat: "",
    etymology: "",
    flights: "",
    history: "",
    funFact: "",
  };

  const navigate = useNavigate();
  const [scientificName, setScientificName] = useState("");
  const [commonName, setCommonName] = useState("");
  const [butterflyFamily, setButterflyFamily] = useState("");
  const [butterflySubFamily, setButterflySubFamily] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [hostPlant, setHostPlant] = useState("");
  const [etymology, setEtymology] = useState("");
  const [habitat, setHabitat] = useState("");
  const [lifeHistory, setLifeHistory] = useState("");
  const [food, setFood] = useState("");
  const [flightInfo, setFlightInfo] = useState("");
  const [funFacts, setFunFacts] = useState("");
  //used for displaying file names after upload
  const [displayImage, setDisplayImage] = useState([]);
  //for species range checklist
  const [checkedState, setCheckedState] = useState(
    new Array(speciesRangeList.length).fill(false)
  );

  const [organizationImages, setOrganizationImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setOrganizationImages(props.imagesProp);
    }
    fetchProps();
    fetchButterflies();
  }, []);

  //holds states of species range checkboxes
  const handleOnRangeChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  //uploading images
  async function handleFileEvent(e) {
    var temp = [];
    if (!e.target.files[0]) return;
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      await Storage.put(file.name, file);
      var tempObj = {
        butterflyName: scientificName,
        imageAddress: file.name,
      };
      temp.push(tempObj);
    }
    setDisplayImage(temp);
    console.log(displayImage);

    fetchButterflies();
  }

  const fetchButterflies = async () => {
    try {
      const apiData = await API.graphql(graphqlOperation(listButterflies));
      const butterfliesFromAPI = apiData.data.listButterflies.items;
      await Promise.all(
        butterfliesFromAPI.map(async (butterfly) => {
          if (butterfly.image) {
            const image = await Storage.get(butterfly.image);
            butterfly.image = image;
          }
          return butterfly;
        })
      );
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  //converts all data to json object and submits
  const toJson = function (event) {
    event.preventDefault();
    //convert check box values into array of locations
    var range = [];
    for (var i = 0; i < speciesRangeList.length; i++) {
      if (checkedState[i] === true) {
        range.push(speciesRangeList[i].location);
      }
    }
    //compile hooks into single object
    butterflyObject = {
      scientificName: scientificName,
      commonName: commonName,
      image: "",
      family: butterflyFamily,
      subfamily: butterflySubFamily,
      lifespan: lifespan,
      range: range,
      hosts: hostPlant,
      food: food,
      habitat: habitat,
      etymology: etymology,
      flights: flightInfo,
      history: lifeHistory,
      funFact: funFacts,
    };
    console.log(butterflyObject);

    createButterfly();
    navigate("/signin");
  };

  async function createButterfly() {
    try {
      if (!butterflyObject.scientificName) return;
      await API.graphql({
        query: createButterflyMutation,
        variables: { input: butterflyObject },
      });
      if (butterflyObject.image) {
        const image = await Storage.get(butterflyObject.image);
        butterflyObject.image = image;
      }
      console.log("creating butterfly...");
      butterflyObject = initialButterflyObjectState;
    } catch (error) {
      console.log("butterfly creation error", error);
    }

    if (!displayImage[0]) return;
    for (var i = 0; i < displayImage.length; i++) {
      await API.graphql({
        query: createImageMutation,
        variables: { input: displayImage[i] },
      });
      const image = await Storage.get(displayImage[i]);
      displayImage[i].imageAddress = image;
    }
    console.log("uploading images...");
    setDisplayImage([]);
  }

  return (
    <>
      <AppHeader
        menuProp={<AppMenu organizationProp={organization} admin={true} />}
        organizationProp={organization}
        imagesProp={organizationImages}
      ></AppHeader>
      <form
        style={{
          fontSize: "x-large",
          backgroundColor: "rgba(222, 184, 135, 0.5)",
          padding: "5px",
        }}
      >
        <h1 style={{ color: "#606C38", textAlign: "center" }}>
          Add New Butterfly
        </h1>{" "}
        <br />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={4}>
            <label> Scientific Name </label>
          </Grid>
          <Grid item xs={8}>
            <input
              required
              type="text"
              width={"100%"}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Common Name </label>
          </Grid>
          <Grid item xs={8}>
            <input
              type="text"
              onChange={(e) => setCommonName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Family </label>
          </Grid>
          <Grid item xs={8}>
            <select onChange={(e) => setButterflyFamily(e.target.value)}>
              {butterflyFamilies.map(({ name, value }, index) => {
                return (
                  <option key={index} name={name} value={value}>
                    {name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={4}>
            <label>Sub Family</label>
          </Grid>
          <Grid item xs={8}>
            <select
              name="subFamily"
              onChange={(e) => setButterflySubFamily(e.target.value)}
            >
              {butterflySubFamilies.map(({ name, value }, index) => {
                return (
                  <option key={index} name={name} value={value}>
                    {name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={4}>
            <label>Longevity</label>
          </Grid>
          <Grid item xs={8}>
            <input
              type="text"
              name="lifespan"
              onChange={(e) => setLifespan(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Host Plant</label>
          </Grid>
          <Grid item xs={8}>
            <input
              type="textarea"
              name="hostPlant"
              onChange={(e) => setHostPlant(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={4}>
            <label>Species Range</label>
          </Grid>
          <Grid item xs={2}>
            {/* spacer */}
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              {speciesRangeList.map(({ location, value }, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        size="lg"
                        value={value}
                        checked={checkedState[index]}
                        onChange={() => handleOnRangeChange(index)}
                        id={"checkbox-" + index}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FEFAE0",
                          },
                        }}
                      />
                    }
                    label={location}
                  />
                );
              })}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={4}>
            <label>Etymology</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              name="etymology"
              onChange={(e) => setEtymology(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Habitat</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              name="habitat"
              onChange={(e) => setHabitat(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Life History</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              name="lifeHistory"
              onChange={(e) => setLifeHistory(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Food</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              value={food}
              name="food"
              onChange={(e) => setFood(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Flight Info</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              value={flightInfo}
              name="flightInfo"
              onChange={(e) => setFlightInfo(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Fun Facts</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              name="funFacts"
              onChange={(e) => setFunFacts(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Add Images</label>
          </Grid>
          <Grid item xs={8}>
            <label className="custom-file-upload">
              Choose Files
              <input
                multiple
                type="file"
                name="imageUpload"
                onChange={handleFileEvent}
              ></input>
            </label>
          </Grid>
          {displayImage.map((image) => {
            return (
              <Grid item xs={12}>
                <label key={image.imageAddress}>{image.imageAddress}</label>
              </Grid>
            );
          })}
        </Grid>
        <br />
        <button
          className="add-form-button"
          type="submit"
          value="Submit"
          onClick={toJson}
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default AddButterfly;
