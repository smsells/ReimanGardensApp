import React from 'react'
import { speciesRangeList, butterflyFamilies, butterflySubFamilies } from '../AddButterfly/AddButterflyList';
import { useState, useEffect } from "react";
import { graphqlOperation, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { updateButterfly as updateButterflyMutation, deleteButterfly as deleteButterflyMutation } from '../../graphql/mutations';
import { listButterflies, listImages } from '../../graphql/queries';
import { ConfirmPopup } from './ConfirmPopup';
import './EditButterfly.css'


const EditButterfly = () => {

    var butterflyObject;
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
    //for species range checklist
    const [checkedState, setCheckedState] = useState(
        new Array(speciesRangeList.length).fill(false)
    );
    const [popupVisibility, setPopupVisibility] = useState(false);

    const initialButterflyObjectState = {
        id: "",
        scientificName: "",
        commonName: "",
        image: "",
        family: "",
        subfamily: "",
        lifespan: "",
        range: [],
        hosts: "",
        food: "",
        habitat: "",
        etymology: "",
        flights: "",
        history: "",
        funFact: ""
    };

    //holds states of species range checkboxes
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    //uploading images
    async function handleFileEvent(e) {
        var temp = [];
        if (!e.target.files[0]) return
        for (var i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            await Storage.put(file.name, file);
            var tempObj = {
                butterflyName: scientificName,
                imageAddress: file.name
            }
            // displayImage.push(tempObj);
            temp.push(tempObj)
        }
        setImages(temp);
        fetchButterflies();
    };

    const fetchButterflies = async () => {
        try {
            const apiButterflyData = await API.graphql(graphqlOperation(listButterflies));
            const butterfliesFromAPI = apiButterflyData.data.listButterflies.items;
            setButterflyList(butterfliesFromAPI);

            const apiImagesData = await API.graphql(graphqlOperation(listImages));
            const imagesFromAPI = apiImagesData.data.listImages.items;
            await Promise.all(imagesFromAPI.map(async image => {
                const tempImage = await Storage.get(image.imageAddress);
                image.imageAddress = tempImage;
                return image;
            }))

            setQueryImages(imagesFromAPI);

            console.log("queried butterfly list", butterflyList);
            console.log("queried images", queryImages);

        } catch (error) {
            console.log("error fetching", error);
        }

    }

    useEffect(() => {
        fetchButterflies();
    }, []);

    //converts all data to json object and submits
    const toJson = function () {
        var range = new Array();
        for (var i = 0; i < speciesRangeList.length; i++) {
            if (checkedState[i] == true) {
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
        }
        console.log(butterflyObject);
    };

    async function editButterfly(event) {
        try {
            event.preventDefault();
            toJson();
            if (!butterflyObject.scientificName) return;
            await API.graphql({ query: updateButterflyMutation, variables: { input: butterflyObject } });
            if (butterflyObject.image) {
                const image = await Storage.get(butterflyObject.image);
                butterflyObject.image = image;
            }
            console.log("editing...")
            butterflyObject = initialButterflyObjectState;
        } catch (error) {
            console.log("edit error", error);
        }

        navigate('/signin')

    };

    function findButterfly(event) {
        const found = butterflyList.find(obj => {
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

        const foundImages = queryImages.filter(img => {
            return img.butterflyName === scientificName;
        });
        setImages(foundImages);
        console.log("found images state array", images);
    };

    async function confirmedDelete(event) {

        try {
            event.preventDefault();
            toJson();
            if (!butterflyObject.scientificName) return;
            var id = editID;
            await API.graphql({ query: deleteButterflyMutation, variables: { input: { id } } });
            if (butterflyObject.image) {
                const image = await Storage.get(butterflyObject.image);
                butterflyObject.image = image;
            }
            console.log("deleting...")
            butterflyObject = initialButterflyObjectState;

            setPopupVisibility(false);
            navigate("/signin");
        } catch (error) {
            console.log("delete error", error);
        }
    };

    function cancelEdit() {
        navigate('/signin');
    }

    return (
        <form style={{ fontSize: "x-large", backgroundColor: "rgba(222, 184, 135, 0.5)", padding: "5px" }}>
            <h1 style={{ color: "#606C38", textAlign: "center", fontFamily: "verdana" }}>Edit Butterfly</h1> <br />
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={5}>
                <Grid item xs={12}>
                    <select placeholder="" onChange={(e) => findButterfly(e)}>
                        <option></option>
                        {butterflyList.map(({ commonName, id }, index) => {
                            return (
                                <option key={index} name={commonName} value={id}>
                                    {commonName}
                                </option>
                            );
                        })}
                    </select>
                    <br /><br />
                </Grid>
            </Grid>

            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                <Grid item xs={4}>
                    <label> Scientific Name </label>
                </Grid>
                <Grid item xs={8}>
                    <input value={scientificName} type="text" width={"100%"} onChange={(e) => setScientificName(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label> Common Name </label>
                </Grid>
                <Grid item xs={8}>
                    <input value={commonName} type="text" onChange={(e) => setCommonName(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label> Family </label>
                </Grid>
                <Grid item xs={8}>
                    <select value={butterflyFamily} onChange={(e) => setButterflyFamily(e.target.value)}>
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
                    <select value={butterflySubFamily} name="subFamily" onChange={(e) => setButterflySubFamily(e.target.value)}>
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
                    <input value={lifespan} type="text" name="lifespan" onChange={(e) => setLifespan(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Host Plant</label>
                </Grid>
                <Grid item xs={8}>
                    <input value={hostPlant} type="textarea" name="hostPlant" onChange={(e) => setHostPlant(e.target.value)} />
                </Grid>
            </Grid>
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
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
                                <FormControlLabel key={index}
                                    control={
                                        <Checkbox
                                            size="lg"
                                            value={value}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                            id={"checkbox-" + index}
                                            sx={{
                                                '&.Mui-checked': {
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
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                <Grid item xs={4}>
                    <label>Etymology</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={etymology} name="etymology" onChange={(e) => setEtymology(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Habitat</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={habitat} name="habitat" onChange={(e) => setHabitat(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Life History</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={lifeHistory} name="lifeHistory" onChange={(e) => setLifeHistory(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Food</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={food} name="food" onChange={(e) => setFood(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Flight Info</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={flightInfo} name="flightInfo" onChange={(e) => setFlightInfo(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Fun Facts</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea value={funFacts} name="funFacts" onChange={(e) => setFunFacts(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Add Images</label>
                </Grid>
                <Grid item xs={8}>
                    <label for="fileUpload" className="custom-file-upload">
                        Choose Files
                    </label>
                    <input multiple id="fileUpload" type="file" name="imageUpload" onChange={handleFileEvent}></input>
                </Grid>
                {images.map((image) => {
                    return (
                        <Grid item xs={12}>
                            {image && <img src={image.imageAddress} style={{ width: 100, height: 100 }} />}
                        </Grid>
                    );
                })}
                <Grid item xs={12} />
                <Grid item xs={2}>
                    <button className="form-button" type="button" value="delete" onClick={() => setPopupVisibility(true)}>Delete Butterfly</button>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <button className="form-button" type="submit" value="Submit" onClick={editButterfly}>Save Changes</button>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <button className="form-button" type="button" value="cancel" onClick={cancelEdit}>Cancel</button>
                </Grid>
            </Grid>
            <div>
                {popupVisibility ? <ConfirmPopup deleteButterfly={confirmedDelete} closePopup={() => setPopupVisibility(false)} /> : null}
            </div>
        </form>

    )
}
export default EditButterfly;