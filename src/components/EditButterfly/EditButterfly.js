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
import { listButterflies } from '../../graphql/queries';
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
    const [flightDurationStart, setFlightDurationStart] = useState("");
    const [flightDurationEnd, setFlightDurationEnd] = useState("");
    const [funFacts, setFunFacts] = useState("");
    const [images, setImages] = useState([]);
    const [butterflyList, setButterflyList] = useState([]);
    //for species range checklist
    const [checkedState, setCheckedState] = useState(
        new Array(speciesRangeList.length).fill(false)
    );
    const [popupVisibility, setPopupVisibility] = useState(false);

    //holds states of species range checkboxes
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    //uploading images
    const handleUploadFiles = files => {
        const uploaded = [...butterflyObject.image];
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
        })
        butterflyObject.image = uploaded;
    };

    //uploading images
    async function handleFileEvent(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        butterflyObject.image = file.name;
        await Storage.put(file.name, file);
        fetchButterflies();
    };

    const fetchButterflies = async () => {
        try {
            const apiData = await API.graphql(graphqlOperation(listButterflies));
            const butterfliesFromAPI = apiData.data.listButterflies.items;
            setButterflyList(butterfliesFromAPI);
            await Promise.all(butterfliesFromAPI.map(async butterfly => {
                if (butterfly.image) {
                    const image = await Storage.get(butterfly.image);
                    butterfly.image = image;
                }
                return butterfly;
            }))

        } catch (error) {
            console.log("error fetching", error);
        }

    }

    useEffect(() => {
        fetchButterflies();
        //butterflyObject = initialButterflyObjectState;
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
            image: images,
            family: butterflyFamily,
            subfamily: butterflySubFamily,
            lifespan: lifespan,
            range: range,
            hosts: hostPlant,
            food: "",
            habitat: habitat,
            etymology: etymology,
            flights: flightDurationStart + "-" + flightDurationEnd,
            history: lifeHistory,
            funFact: funFacts,
        }
        console.log(butterflyObject);
    };

    async function editButterfly(event) {
        try{
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
        } catch(error){
            console.log("edit error", error);
        }
        
    };

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
        var months = found.flights.split("-");
        setFlightDurationStart(months[0]);
        setFlightDurationEnd(months[1]);
        setFunFacts(found.funFact);
        setImages(found.image);
        //setRange(); 
    };

    async function confirmedDelete(event){

        try{
            event.preventDefault();
            toJson();
            if (!butterflyObject.scientificName) return;
            await API.graphql({ query: deleteButterflyMutation, variables: { input: butterflyObject } });
            if (butterflyObject.image) {
                const image = await Storage.get(butterflyObject.image);
                butterflyObject.image = image;
            }
            console.log("deleting...")
            butterflyObject = initialButterflyObjectState;

            //setPopupVisibility(false);
            //navigate("/signin");  
        } catch (error){
            console.log("delete error", error);
        }
    };

   function cancelEdit(){
        navigate('/signin');
    }

    return (
        <form style={{ fontSize: "x-large", backgroundColor: "rgba(222, 184, 135, 0.5)", padding: "5px" }}>
            <h1 style={{ color: "#606C38", textAlign: "center", fontFamily:"verdana" }}>Edit Butterfly</h1> <br />
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
                    <br/><br/>
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
                    <input value={hostPlant} type="text" name="hostPlant" onChange={(e) => setHostPlant(e.target.value)} />
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
                    <select value={flightDurationEnd} name="flightDurationEnd" onChange={(e) => setFlightDurationEnd(e.target.value)}>
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
                    <textarea value={funFacts} name="funFacts" onChange={(e) => setFunFacts(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Add Images</label>
                </Grid>
                <Grid item xs={8}>
                    <label for="fileUpload" class="custom-file-upload">
                        Choose Files
                    </label>
                    <input id="fileUpload" type="file" name="imageUpload" onChange={handleFileEvent}></input>
                </Grid> 
                <Grid item xs={12}/>
                <Grid item xs={2}>
                    <button type="button" value="delete" onClick={confirmedDelete}>Delete Butterfly</button>
                </Grid>
                <Grid item xs={1}></Grid> 
                <Grid item xs={2}>
                    <button type="submit" value="Submit" onClick={editButterfly}>Save Changes</button>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <button type="button" value="cancel" onClick={cancelEdit}>Cancel</button>
                </Grid>
            </Grid>
            <div>
                {popupVisibility ? <ConfirmPopup deleteButterfly={confirmedDelete} closePopup={() => setPopupVisibility(false)} /> : null} 
            </div>
        </form>
        
    )
}
export default EditButterfly;