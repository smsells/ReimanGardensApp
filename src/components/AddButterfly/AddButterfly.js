import React from 'react'
import { speciesRangeList, butterflyFamilies, butterflySubFamilies } from './AddButterflyList';
import { useState } from "react";
import { graphqlOperation, Storage } from 'aws-amplify';
import { API } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { createButterfly as createButterflyMutation } from '../../graphql/mutations';
import "./AddButterfly.css";
import { listButterflies } from '../../graphql/queries';


const AddButterfly = () => {

    var butterflyObject;

    //for species range checklist
    const [checkedState, setCheckedState] = useState(
        new Array(speciesRangeList.length).fill(false)
    );

    //holds states of species range checkboxes
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    //uploading images
    const handleUploadFiles = files => {
        const uploaded = [...images];
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
        })
        setImages(uploaded)
    };

    //uploading images
    async function handleFileEvent(e) {
        console.log("location 1");
        // const chosenFiles = Array.prototype.slice.call(e.target.files)
        // handleUploadFiles(chosenFiles);
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setImages(file.name);
        await Storage.put(file.name, file);
        console.log("location 2");
        fetchButterflies();
    };

    const fetchButterflies = async () => {
        try {
            const apiData = await API.graphql(graphqlOperation(listButterflies));
            const butterfliesFromAPI = apiData.data.listButterflies.items;
            await Promise.all(butterfliesFromAPI.map(async butterfly => {
            if (butterfly.image) {
                const image = await Storage.get(butterfly.image);
                butterfly.image = image;
            }
            return butterfly;
            }))
        } catch (error){
            console.log("error fetching", error);
        }
        
    }

    useEffect(() => {
        fetchButterflies();
      }, []);

    //converts all data to json object and submits
    const toJson = function (event) {
        event.preventDefault();
        var range = new Array();
        for (var i = 0; i < speciesRangeList.length; i++) {
            if (checkedState[i] == true) {
                range.push(speciesRangeList[i].location);
            }
        }

        butterflyObject = {
            scientificName: scientificName,
            commonName: commonName,
            image: images,
            family: butterflyFamily,
            subfamily: butterflySubFamily,
            lifespan: lifespan,
            range: range,
            hosts: hostPlant,
            food: "",
            habitat: habitat,
            //etymology: etymology,
            flights: flightDurationStart + "-" + flightDurationEnd,
            history: lifeHistory,
            funFact: funFacts,
        }
        console.log(butterflyObject);
        createButterfly();
    };

    async function createButterfly() {
        console.log("location 4");
        if (!butterflyObject.scientificName) return;
        await API.graphql({ query: createButterflyMutation, variables: { input: butterflyObject } });
        if (butterflyObject.image) {
            const image = await Storage.get(butterflyObject.image);
            butterflyObject.image = image;
          }
        console.log("creating...")
        //setFormData(initialFormState);
    }

    const [scientificName, setScientificName] = useState("");
    const [commonName, setCommonName] = useState("");
    const [butterflyFamily, setButterflyFamily] = useState("");
    const [butterflySubFamily, setButterflySubFamily] = useState("");
    const [lifespan, setLifespan] = useState("");
    const [hostPlant, setHostPlant] = useState("");
    const [etymology, setEtymology] = useState("");
    const [habitat, setHabitat] = useState("");
    const [lifeHistory, setLifeHistory] = useState("");
    const [flightDurationStart, setFlightDurationStart] = useState("");
    const [flightDurationEnd, setFlightDurationEnd] = useState("");
    const [funFacts, setFunFacts] = useState("");
    const [images, setImages] = useState([]);

    return (
        <form style={{ fontSize: "x-large", backgroundColor: "rgba(222, 184, 135, 0.5)", padding: "5px" }}>
            <h1 style={{ color: "#606C38", textAlign: "center" }}>Add New Butterfly</h1> <br />
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                <Grid item xs={4}>
                    <label> Scientific Name </label>
                </Grid>
                <Grid item xs={8}>
                    <input type="text" width={"100%"} onChange={(e) => setScientificName(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label> Common Name </label>
                </Grid>
                <Grid item xs={8}>
                    <input type="text" onChange={(e) => setCommonName(e.target.value)} />
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
                    <select name="subFamily" onChange={(e) => setButterflySubFamily(e.target.value)}>
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
                    <input type="text" name="lifespan" onChange={(e) => setLifespan(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Host Plant</label>
                </Grid>
                <Grid item xs={8}>
                    <input type="text" name="hostPlant" onChange={(e) => setHostPlant(e.target.value)} />
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
                            <FormControlLabel
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
                    <textarea name="etymology" onChange={(e) => setEtymology(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Habitat</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea name="habitat" onChange={(e) => setHabitat(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Life History</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea name="lifeHistory" onChange={(e) => setLifeHistory(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Flight Duration Start</label>
                </Grid>
                <Grid item xs={8}>
                    <select value={flightDurationStart} placeholder="Choose one" name="flightDurationStart" onChange={(e) => setFlightDurationStart(e.target.value)}>
                        <option value=""></option>
                        <option value="unknown">Unknown</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </Grid>
                <Grid item xs={4}>
                    <label>Flight Duration End</label>
                </Grid>
                <Grid item xs={8}>
                    <select name="flightDurationEnd" onChange={(e) => setFlightDurationEnd(e.target.value)}>
                        <option value=""></option>
                        <option value="unknown">Unknown</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </Grid>
                <Grid item xs={4}>
                    <label>Fun Facts</label>
                </Grid>
                <Grid item xs={8}>
                    <textarea name="funFacts" onChange={(e) => setFunFacts(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Add Images</label>
                </Grid>
                <Grid item xs={8}>
                    <label>
                        <input type="file" name="imageUpload" onChange={handleFileEvent}></input>
                    </label>
                </Grid>
            </Grid>
            <br/>
            <button type="submit" value="Submit" onClick={toJson}>Submit</button>
        </form>
    )
}
export default AddButterfly;