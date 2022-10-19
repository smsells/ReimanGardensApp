import React from 'react'
import { speciesRangeList, butterflyFamilies, butterflySubFamilies } from './AddButterflyList';
import { useState } from "react";
import Grid from '@material-ui/core/Grid';

import largeImage from "./AddButterflyImages/Large.png";
import mediumImage from "./AddButterflyImages/Medium.png";
import smallImage from "./AddButterflyImages/Small.png";

import iridescent from "./AddButterflyImages/Iridescent.jpg";
import spotted from "./AddButterflyImages/Spotted.jpg";
import striped from "./AddButterflyImages/Striped.jpg";
import veins from "./AddButterflyImages/Veins.jpg";

import heliconius from "./AddButterflyImages/Heliconius.jpg";
import nymphalidae from "./AddButterflyImages/Nymphalidae.jpg";
import papilionidae from "./AddButterflyImages/Papilionidae.jpg";
import pieridae from "./AddButterflyImages/Pieridae.jpg";
import saturniidae from "./AddButterflyImages/Saturniidae.jpg";

import tail from "./AddButterflyImages/tail.png";
import noTail from "./AddButterflyImages/No_tail.png";

import clubbed from "./AddButterflyImages/clubbed.png";
import feathered from "./AddButterflyImages/feathered.png";

import flowerNectar from "./AddButterflyImages/FlowerNectar.png";
import fruit from "./AddButterflyImages/Fruit.png";

import open from "./AddButterflyImages/open.png";
import closed from "./AddButterflyImages/closed.png";

import "./AddButterfly.css";




const AddButterfly = () => {

    const [checkedState, setCheckedState] = useState(
        new Array(speciesRangeList.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const handleUploadFiles = files => {
        const uploaded = [...images];
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
        })
        setImages(uploaded)

    };

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    };

    const toJson = function (event) {
        event.preventDefault();

        var range = new Array();
        for (var i = 0; i < speciesRangeList.length; i++) {
            if (checkedState[i] == true) {
                range.push(speciesRangeList[i].location);
            }
        }

        var butterfly = {
            scientificName: scientificName,
            commonName: commonName,
            butterlfyFamily: butterflyFamily,
            butterflySubFamily: butterflySubFamily,
            longevity: longevity,
            hostPlant: hostPlant,
            speciesRange: range,
            etymology: etymology,
            habitat: habitat,
            lifeHistory: lifeHistory,
            flightDurationStart: flightDurationStart,
            flightDurationEnd: flightDurationEnd,
            funFacts: funFacts,
            size: size,
            numLegs: numLegs,
            topWingFeatures: topWingFeatures,
            bottomWingFeatures: bottomWingFeatures,
            wingShape: wingShape,
            tailType: tailType,
            antenna: antenna,
            food: food,
            wingPosition: wingPosition,
            images: images
        }

        console.log(butterfly);
    };

    const [scientificName, setScientificName] = useState("");
    const [commonName, setCommonName] = useState("");
    const [butterflyFamily, setButterflyFamily] = useState("");
    const [butterflySubFamily, setButterflySubFamily] = useState("");
    const [longevity, setLongevity] = useState(0);
    const [hostPlant, setHostPlant] = useState("");
    const [etymology, setEtymology] = useState("");
    const [habitat, setHabitat] = useState("");
    const [lifeHistory, setLifeHistory] = useState("");
    const [flightDurationStart, setFlightDurationStart] = useState("");
    const [flightDurationEnd, setFlightDurationEnd] = useState("");
    const [funFacts, setFunFacts] = useState("");
    const [size, setSize] = useState("");
    const [numLegs, setNumLegs] = useState(0);
    const [topWingFeatures, setTopWingFeatures] = useState("");
    const [bottomWingFeatures, setBottomWingFeatures] = useState("");
    const [wingShape, setWingShape] = useState("");
    const [tailType, setTailType] = useState("");
    const [antenna, setAntenna] = useState("");
    const [food, setFood] = useState("");
    const [wingPosition, setWingPosition] = useState("");
    const [images, setImages] = useState([]);

    return (
        <form style={{ fontSize: "x-large", backgroundColor: "rgba(222, 184, 135, 0.5)", padding: "5px" }}>
            <h1 style={{ color: "#606C38", textAlign: "center" }}>Add New Butterfly</h1> <br />
            <hr />
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
                    <input type="number" name="longevity" onChange={(e) => setLongevity(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <label>Host Plant</label>
                </Grid>
                <Grid item xs={8}>
                    <input type="text" name="hostPlant" onChange={(e) => setHostPlant(e.target.value)} />
                </Grid>
            </Grid>
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="flex-end" rowSpacing={2}>
                <Grid item xs={2}>
                    <label>Species Range</label>
                </Grid>
                <Grid item xs={10}>
                        {speciesRangeList.map(({ location, value }, index) => {
                            return (
                            
                                <label>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={location}
                                        value={value}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    {"  " + location}
                                </label>
                                
                            );
                        })}
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
                    <select name="flightDurationStart" onChange={(e) => setFlightDurationStart(e.target.value)}>
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
            </Grid>
            <hr/>
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" rowSpacing={5}>
                <Grid item xs={1}>
                    <label>Size</label>
                </Grid>
                <Grid item xs={3}>
                    <label>
                        <input type="radio" name="butterlySize" value="large" onChange={(e) => setSize(e.target.value)} />
                        <img className="customImage" src={largeImage} alt="Option 1"></img>
                    </label>
                </Grid>
                <Grid item xs={3}>
                    <label>
                        <input type="radio" name="butterlySize" value="medium" onChange={(e) => setSize(e.target.value)} />
                        <img className="customImage" src={mediumImage} alt="Option 2"></img>
                    </label>
                </Grid>
                <Grid item xs={3}>
                    <label>
                        <input type="radio" name="butterlySize" value="small" onChange={(e) => setSize(e.target.value)} />
                        <img  className="customImage" src={smallImage} alt="Option 3"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>Number of Walking Legs</label>
                </Grid>
                <Grid item xs={8}>
                    <select name="walkingLegs" onChange={(e) => setNumLegs(e.target.value)}>
                        <option value=""></option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                </Grid>
                <Grid item xs={3}>
                    <label>Top Wing Features</label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="topWingFeatures" value="spotted" onChange={(e) => setTopWingFeatures(e.target.value)} />
                        <img className="customImage" src={spotted} alt="spotted"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="topWingFeatures" value="iridescent" onChange={(e) => setTopWingFeatures(e.target.value)} />
                        <img className="customImage" src={iridescent} alt="iridescent"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="topWingFeatures" value="striped" onChange={(e) => setTopWingFeatures(e.target.value)} />
                        <img className="customImage" src={striped} alt="striped"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="topWingFeatures" value="veins" onChange={(e) => setTopWingFeatures(e.target.value)} />
                        <img className="customImage" src={veins} alt="veins"></img>
                    </label>
                </Grid>
                <Grid item xs={1}>
                    {/* spacer */}
                </Grid>
                <Grid item xs={3}>
                    <label>Bottom Wing Features</label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="bottomWingFeatures" value="spotted" onChange={(e) => setBottomWingFeatures(e.target.value)} />
                        <img className="customImage" src={spotted} alt="spotted"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="bottomWingFeatures" value="iridescent" onChange={(e) => setBottomWingFeatures(e.target.value)} />
                        <img className="customImage" src={iridescent} alt="iridescent"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="bottomWingFeatures" value="striped" onChange={(e) => setBottomWingFeatures(e.target.value)} />
                        <img className="customImage" src={striped} alt="striped"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="bottomWingFeatures" value="veins" onChange={(e) => setBottomWingFeatures(e.target.value)} />
                        <img className="customImage" src={veins} alt="veins"></img>
                    </label>
                </Grid>
                <Grid item xs={1}>
                    {/* spacer */}
                </Grid>
                <Grid item xs={2}>
                    <label>Wing Shape</label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="wingSize" value="heliconius" onChange={(e) => setWingShape(e.target.value)} />
                        <img className="customImage" src={heliconius} alt="heliconius"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="wingSize" value="nymphalidae" onChange={(e) => setWingShape(e.target.value)} />
                        <img className="customImage" src={nymphalidae} alt="nymphalidae"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="wingSize" value="papilionidae" onChange={(e) => setWingShape(e.target.value)} />
                        <img className="customImage" src={papilionidae} alt="papilionidae"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <label>
                        <input type="radio" name="wingSize" value="pieridae" onChange={(e) => setWingShape(e.target.value)} />
                        <img className="customImage" src={pieridae} alt="pieridae"></img>
                    </label>
                </Grid>
                <Grid item xs={2}>
                    <input type="radio" name="wingSize" value="saturniidae" onChange={(e) => setWingShape(e.target.value)} />
                    <img className="customImage" src={saturniidae} alt="saturniidae"></img>
                </Grid>
                <Grid item xs={4}>
                    <label>Tails</label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="tail" value="tail" onChange={(e) => setTailType(e.target.value)} />
                        <img className="customImage" style={{height:"250px", width:"auto"}} src={tail} alt="tail"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="tail" value="no_tail" onChange={(e) => setTailType(e.target.value)} />
                        <img className="customImage" style={{height:"250px", width:"auto"}} src={noTail} alt="no_tail"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>Antenna</label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="antenna" value="feathered" onChange={(e) => setAntenna(e.target.value)} />
                        <img className="customImage" style={{height:"100px", width:"auto"}} src={feathered} alt="feathered"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="antenna" value="clubbed" onChange={(e) => setAntenna(e.target.value)} />
                        <img className="customImage" style={{height:"100px", width:"auto"}} src={clubbed} alt="clubbed"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>Food</label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="food" value="flowerNectar" onChange={(e) => setFood(e.target.value)} />
                        <img className="customImage" style={{height:"250px", width:"auto"}} src={flowerNectar} alt="flowerNectar"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="food" value="fruit" onChange={(e) => setFood(e.target.value)} />
                        <img className="customImage" style={{height:"250px", width:"auto"}} src={fruit} alt="fruit"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>Resting Wing Position</label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="wingPosition" value="open" onChange={(e) => setWingPosition(e.target.value)} />
                        <img className="customImage" style={{height:"200px", width:"auto"}} src={open} alt="open"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <input type="radio" name="wingPosition" value="closed" onChange={(e) => setWingPosition(e.target.value)} />
                        <img className="customImage" style={{height:"200px", width:"auto"}} src={closed} alt="closed"></img>
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>Add Images</label>
                </Grid>
                <Grid item xs={8}>
                    <label>
                        <input type="file" multiple name="imageUpload" onChange={handleFileEvent}></input>
                            {images.map((file, index) => {
                                return (
                                    <div key={index}>
                                        {file.name}
                                    </div>
                                );
                            })}
                    </label>
                </Grid>
            </Grid>
            <hr />
            <button type="submit" value="Submit" onClick={toJson}>Submit</button>
        </form>
    )
}
export default AddButterfly;