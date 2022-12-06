import React from "react";
import {
  speciesRangeList,
  butterflyFamilies,
  butterflySubFamilies,
} from "../AddButterfly/AddButterflyList";
import { useState, useEffect } from "react";
import { graphqlOperation, Storage } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import Grid from '@mui/material/Grid';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  updateButterfly as updateButterflyMutation,
  deleteButterfly as deleteButterflyMutation,
  deleteImage as deleteImageMutation,
  createImage as createImageMutation,
} from "../../graphql/mutations";
import { listButterflies, listImages } from "../../graphql/queries";
import { ConfirmPopup } from "./ConfirmPopup";
import "./EditButterfly.css";
import AppHeader from "../Header/AppHeader";

import { getPropsID } from "../Header/Props";
import {
  initialOrganizationState,
  initialButterflyObjectState,
} from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";

const EditButterfly = () => {
  var butterflyObject;
  const orgID = localStorage.getItem("token");
  const masterID =
    "9478d3c2d6d4f0b3d58ed8c2c1c6b4625520a4522c8246d94a52b6d6532ea706261529c5be5913e829c70205da0c6dace51ac2d677778671b05cd66bc8ed7d12";

  const navigate = useNavigate();

  const [editID, setEditID] = useState("");
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
  const [images, setImages] = useState([]);
  const [queryImages, setQueryImages] = useState([]);
  const [butterflyList, setButterflyList] = useState([]);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)
  const [checkedState, setCheckedState] = useState(  //for species range checklist
    new Array(speciesRangeList.length).fill(false)
  );
  const [organizationImages, setOrganizationImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  const [haveQueriedButterflies, setHaveQueriedButterflies] = useState(false);
  const [haveFetchedProps, setHaveFetchedProps] = useState(false);

  if (orgID === masterID) {
    setIsDisabled(false);
  }

  async function fetchProps() {
    if (!haveFetchedProps) {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setOrganizationImages(props.imagesProp);
      if (Object.keys(organization).length !== 0 && Object.keys(organizationImages).length !== 0) {
        setHaveFetchedProps(true);
      }
    }
  }
  useEffect(() => {

    fetchProps();
    fetchButterflies();
    populateImages();
  });

  //Fetch butterfly objects and images from API
  const fetchButterflies = async () => {
    try {
      if (!haveQueriedButterflies) {
        const apiButterflyData = await API.graphql(
          graphqlOperation(listButterflies)
        );
        const butterfliesFromAPI = apiButterflyData.data.listButterflies.items;
        setButterflyList(butterfliesFromAPI);

        if (Object.keys(butterflyList).length !== 0) {
          setHaveQueriedButterflies(true);
        }

        const apiImagesData = await API.graphql(graphqlOperation(listImages));
        const imagesFromAPI = apiImagesData.data.listImages.items;
        await Promise.all(
          imagesFromAPI.map(async (image) => {
            const tempImage = await Storage.get(image.imageAddress);
            image.imageAddress = tempImage;
            return image;
          })
        );

        setQueryImages(imagesFromAPI);
        console.log("queried butterfly list", butterflyList);
        console.log("queried images", queryImages);
      }

    } catch (error) {
      console.log("error fetching", error);
    }
  };

  //Populate the edit form with the selected butterfly object
  function populateButterfly(event) {
    const found = butterflyList.find((obj) => {
      return obj.id === event.target.value;
    });
    setEditID(found.id);
    setScientificName(found.scientificName);
    setCommonName(found.commonName);
    setButterflyFamily(found.family);
    setButterflySubFamily(found.subfamily);
    setLifespan(found.lifespan);
    setHostPlant(found.hosts);
    setEtymology(found.etymology);
    setHabitat(found.habitat);
    setLifeHistory(found.history);
    setFood(found.food);
    setFlightInfo(found.flights);
    setFunFacts(found.funFact);

    //format found range string
    //range stored as stringified array, need to convert back to array to check range boxes
    var tempRange = found.range.substring(1, found.range.length - 1);
    var tempArr = tempRange.split(", ");
    var setRangeValues = new Array(speciesRangeList.length).fill(false);
    for (var i = 0; i < tempArr.length; i++) {
      for (var j = 0; j < setRangeValues.length; j++) {
        if (tempArr[i] === speciesRangeList[j].location) {
          setRangeValues[j] = true;
        }
      }
    }
    setCheckedState(setRangeValues);
  }

  //populate images corresponding to selected butterfly
  function populateImages() {
    const foundImages = queryImages.filter((img) => {
      return img.butterflyName === scientificName;
    });
    setImages(foundImages);
    console.log("found images state array", images);
  }

  //holds states of species range checkboxes
  const handleOnRangeChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  //gathers images to be uploaded
  async function handleFileEvent(e) {
    if (!e.target.files[0]) return;
    //delete current images
    for (var j = 0; j < images.length; j++) {
      if (!images[j].imageAddress) return;
      var id = images[j].id;
      await API.graphql({
        query: deleteImageMutation,
        variables: { input: { id } },
      });
    }

    var temp = [];
    //add new images
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      await Storage.put(file.name, file);
      var tempObj = {
        butterflyName: scientificName,
        imageAddress: file.name,
      };
      temp.push(tempObj);
    }

    for (var z = 0; z < temp.length; z++) {
      await API.graphql({
        query: createImageMutation,
        variables: { input: temp[z] },
      });
      const image = await Storage.get(temp[z]);
      temp[i].imageAddress = image;
    }
    // console.log("temp file array", temp);
    // filesHaveChanged = true;
    // console.log("handleFileEvent function, files have changed should be true", filesHaveChanged);
    // setImages(temp);
    // console.log("handle file event, images array value", images);
    fetchButterflies();
  }

  //edit butterfly in database on button click
  async function editButterfly(event) {
    try {
      event.preventDefault();
      toJson();
      if (!butterflyObject.scientificName) return;
      await API.graphql({
        query: updateButterflyMutation,
        variables: { input: butterflyObject },
      });
      if (butterflyObject.image) {
        const image = await Storage.get(butterflyObject.image);
        butterflyObject.image = image;
      }

      // if (filesHaveChanged) {
      //     console.log("editButterfly function, files have changed should be true", filesHaveChanged)
      //     for (var i = 0; i < images.length; i++) {
      //         await API.graphql({ query: createImageMutation, variables: { input: images[i] } });
      //         const image = await Storage.get(images[i]);
      //         images[i].imageAddress = image;
      //     }
      // }

      console.log("editing...");
      butterflyObject = initialButterflyObjectState;
    } catch (error) {
      console.log("edit error", error);
    }
    navigate("/signin");
  }

  //converts all data to single json object and submits
  const toJson = function () {
    var range = [];
    for (var i = 0; i < speciesRangeList.length; i++) {
      if (checkedState[i] === true) {
        range.push(speciesRangeList[i].location);
      }
    }

    butterflyObject = {
      id: editID,
      scientificName: scientificName,
      commonName: commonName,
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
  };

  //deletes butterfly object after user confirms delete
  async function confirmedDelete(event) {
    try {
      event.preventDefault();
      toJson();
      if (!butterflyObject.scientificName) return;
      var id = editID;
      await API.graphql({
        query: deleteButterflyMutation,
        variables: { input: { id } },
      });
      if (butterflyObject.image) {
        const image = await Storage.get(butterflyObject.image);
        butterflyObject.image = image;
      }
      console.log("deleting...");
      butterflyObject = initialButterflyObjectState;

      setPopupVisibility(false);
      navigate("/signin");
    } catch (error) {
      console.log("delete error", error);
    }
  }

  function cancelEdit() {
    navigate("/adminPanel");
  }

  async function deleteImage(index) {
    console.log("image index", index);
    if (!images[index].imageAddress) return;
    var id = images[index].id;
    await API.graphql({
      query: deleteImageMutation,
      variables: { input: { id } },
    });
    console.log("deleting image...");
    fetchButterflies();
    populateImages();
  }

  return (
    <>
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={organizationImages}
      />
      <form
        style={{
          fontSize: "x-large",
          backgroundColor: "rgba(222, 184, 135, 0.5)",
          padding: "5px",
        }}
      >
        <h1
          style={{
            color: "#606C38",
            textAlign: "center",
            fontFamily: "verdana",
          }}
        >
          Edit Butterfly
        </h1>{" "}
        <br />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={5}
        >
          <Grid item xs={12}>
            <select placeholder="" onChange={(e) => populateButterfly(e)}>
              <option></option>
              {butterflyList.map(({ commonName, id }, index) => {
                return (
                  <option
                    key={"butterfly" + index}
                    name={commonName}
                    value={id}
                  >
                    {commonName}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
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
            <label> Scientific Name </label>
          </Grid>
          <Grid item xs={8}>
            <input
              value={scientificName}
              type="text"
              width={"100%"}
              onChange={(e) => setScientificName(e.target.value)}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Common Name </label>
          </Grid>
          <Grid item xs={8}>
            <input
              value={commonName}
              type="text"
              onChange={(e) => setCommonName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Family </label>
          </Grid>
          <Grid item xs={8}>
            <select
              value={butterflyFamily}
              onChange={(e) => setButterflyFamily(e.target.value)}
              disabled={isDisabled}
            >
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
              value={butterflySubFamily}
              name="subFamily"
              onChange={(e) => setButterflySubFamily(e.target.value)}
              disabled={isDisabled}
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
              value={lifespan}
              type="text"
              name="lifespan"
              onChange={(e) => setLifespan(e.target.value)}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Host Plant</label>
          </Grid>
          <Grid item xs={8}>
            <input
              value={hostPlant}
              type="textarea"
              name="hostPlant"
              onChange={(e) => setHostPlant(e.target.value)}
              disabled={isDisabled}
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
                        disabled={isDisabled}
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
              value={etymology}
              name="etymology"
              onChange={(e) => setEtymology(e.target.value)}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Habitat</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              value={habitat}
              name="habitat"
              onChange={(e) => setHabitat(e.target.value)}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Life History</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              value={lifeHistory}
              name="lifeHistory"
              onChange={(e) => setLifeHistory(e.target.value)}
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Fun Facts</label>
          </Grid>
          <Grid item xs={8}>
            <textarea
              value={funFacts}
              name="funFacts"
              onChange={(e) => setFunFacts(e.target.value)}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={4}>
            <label>Add Images</label>
          </Grid>
          <Grid item xs={8}>
            <label htmlFor="fileUpload" className="custom-file-upload">
              Choose Files
            </label>
            <input
              multiple
              id="fileUpload"
              type="file"
              name="imageUpload"
              onChange={handleFileEvent}
              disabled={isDisabled}
            ></input>
          </Grid>
          {images.map((image, index) => {
            return (
              <Grid item xs={2}>
                {image && (
                  <img
                    src={image.imageAddress}
                    style={{ width: 100, height: 100 }}
                    key={"image" + index}
                  />
                )}
                <button
                  className="form-button"
                  type="button"
                  value="delete"
                  style={{ margin: "5px" }}
                  onClick={() => deleteImage(index)}
                  disabled={isDisabled}
                >
                  X
                </button>
              </Grid>
            );
          })}
          <Grid item xs={12} />
          <Grid item xs={2}>
            <button
              className="form-button"
              type="button"
              value="delete"
              onClick={() => setPopupVisibility(true)}
              disabled={isDisabled}
            >
              Delete Butterfly
            </button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <button
              className="form-button"
              type="submit"
              value="Submit"
              onClick={editButterfly}
            >
              Save Changes
            </button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <button
              className="form-button"
              type="button"
              value="cancel"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </Grid>
        </Grid>
        <div>
          {popupVisibility ? (
            <ConfirmPopup
              deleteButterfly={confirmedDelete}
              closePopup={() => setPopupVisibility(false)}
            />
          ) : null}
        </div>
      </form>
    </>
  );
};
export default EditButterfly;
