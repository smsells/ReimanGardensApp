import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { listImages, getButterfly, getSpeciesInfo, listOrganizations } from '../../graphql/queries';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { useLocation } from "react-router-dom";
import { initialOrganizationState } from "../utils/initialStates";
import Carousel from 'react-bootstrap/Carousel';
import './Gallery.css'



const ButterflyDetail = () => {

    const [butterflyImages, setButterflyImages] = useState([]);
    const [butterflyObj, setButterflyObj] = useState({});
    const [haveQueriedButterfly, setHaveQueriedButterfly] = useState(false);
    const [haveQueriedImages, setHaveQueriedImages] = useState(false);
    const [haveCollectedAddresses, setHaveCollectedAddress] = useState(false);
    const [haveRangeValues, setHaveRangeValues] = useState(false);
    const [haveSpeciesInfo, setHaveSpeciesInfo] = useState(false);
    const [imageAddresses, setImageAddresses] = useState([]);
    const [rangeValues, setRangeValues] = useState([]);
    const [speciesInfo, setSpeciesInfo] = useState({});

    const location = useLocation();
    const pathName = location.pathname.split("/");
    const orgURL = pathName[1];
    const [images, setImages] = useState({});
    const [organization, setOrganization] = useState(initialOrganizationState);

    const butterflyID = useParams().id;



    useEffect(() => {
        fetchButterfly();
        fetchImages();
        getImageAddresses();
        getRangeArray();
        querySpeciesInfo();
        async function fetchProps() {
            await Auth.signIn("dummy1234", "dummy1234");
            const props = await getProps(orgURL);
            setOrganization(props.organizationProp);
            setImages(props.imagesProp);
        }
        fetchProps();
    });

    async function fetchButterfly() {

        try {
            if (!haveQueriedButterfly) {
                const apiButterflyData = await API.graphql({
                    query: getButterfly,
                    variables: {
                        id: butterflyID
                    }
                });
                const butterfliesFromAPI = apiButterflyData.data.getButterfly;

                setButterflyObj(butterfliesFromAPI);

                if (Object.keys(butterflyObj).length !== 0) {
                    setHaveQueriedButterfly(true);
                    console.log("butterfly obj", butterflyObj)
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    async function fetchImages() {
        try {
            if (!haveQueriedImages) {
                const apiImagesData = await API.graphql(graphqlOperation(listImages));
                const imagesFromAPI = apiImagesData.data.listImages.items;
                await Promise.all(imagesFromAPI.map(async image => {
                    const tempImage = await Storage.get(image.imageAddress);
                    image.imageAddress = tempImage;
                    return image;
                }))
                console.log("images from api", imagesFromAPI);

                var filteredImages = imagesFromAPI.filter(image => {
                    return image.butterflyName === butterflyObj.scientificName;
                });

                setButterflyImages(filteredImages);

                if (butterflyImages.length > 0) {
                    setHaveQueriedImages(true);
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    function getImageAddresses() {
        if (haveQueriedImages && !haveCollectedAddresses) {
            var addresses = []
            for (var i = 0; i < butterflyImages.length; i++) {
                var tempImg = {
                    url: butterflyImages[i].imageAddress
                }
                addresses.push(tempImg);
            }
            setHaveCollectedAddress(true);
            setImageAddresses(addresses);
        }

    }

    function getRangeArray() {
        if (haveQueriedButterfly && !haveRangeValues) {
            var tempRange = butterflyObj.range.substring(1, butterflyObj.range.length - 1);
            var tempArr = tempRange.split(", ");
            for (var i = 0; i < tempArr.length; i++) {
                tempArr[i] = tempArr[i].slice(1, -1)
            }
            setRangeValues(tempArr)
            setHaveRangeValues(true);
        }
    };

    async function querySpeciesInfo() {
        if (!haveSpeciesInfo) {
            //get current organization from url
            let filterOrg = { orgURL: { eq: orgURL } };
            const apiDataOrg = await API.graphql({
                query: listOrganizations,
                variables: { filter: filterOrg },
            });

            const organizationFromAPI = apiDataOrg.data.listOrganizations.items;
            const organizationID = organizationFromAPI[0].id;

            let filter = {
                and: [
                    {
                        orgID: { eq: organizationID },
                    },
                    {
                        name: { eq: butterflyObj.scientificName },
                    },
                ],
            };

            if (organizationID !== null) {
                const apiDataInfo = await API.graphql({
                    query: getSpeciesInfo,
                    variables: { filter: filter },
                });

                const infoFromAPI = apiDataInfo.data.getSpeciesInfo;
                setSpeciesInfo(infoFromAPI);

                if (Object.keys(speciesInfo).length !== 0) {
                    setHaveSpeciesInfo(true);
                }
            }
        }
    };

    const temp = [{
        url: "dummy"
    }];

    return (
        <div>
            <AppHeader
                organizationProp={organization}
                imagesProp={imageAddresses}
                menuProp={<AppMenu organizationProp={organization} admin={false} />}
            />

            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                <Grid item xs={12}>
                    <h3>{butterflyObj.commonName}</h3>
                </Grid>
                <Grid item xs={12}>
                    <h3><i>{butterflyObj.scientificName}</i></h3>
                    <hr />
                </Grid>

                <Grid item xs={12}>
                    <Carousel interval={null}>
                        {butterflyImages.map((image, index) => {
                            return (
                                <Carousel.Item>
                                    {image && <img src={image.imageAddress} className="gallery-item" key={"image" + index} style={{ borderRadius: "50px" }} />}
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </Grid>
                <Grid item xs={12}>
                    <div className="panel" style={{ background: "white", borderRadius: "50px" }}>
                        <div className="panel-header"><h4>Basic Information</h4></div>
                        <hr />
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 col-sm-4 col-xs-6 infoColumn">
                                    <h4>General information</h4>
                                    <strong>Family:</strong> {butterflyObj.family} <br></br>
                                    <strong>Sub Family:</strong> {butterflyObj.subfamily} <br></br>
                                    <strong>Estimated Lifespan: </strong> {butterflyObj.lifespan} days
                                    <h4 style={{ marginTop: "30px" }}>Garden Specific Information</h4>
                                    <strong>Estimated Number In Flight: </strong> {speciesInfo.numInFlight}<br></br>
                                    <strong>Total Number of Pupae Received: </strong> {speciesInfo.totalReceived}<br></br>
                                    <strong>First Flown On: </strong> {speciesInfo.firstFlown}<br></br>
                                    <strong>Last Flown On: </strong> {speciesInfo.lastFlown}
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-6 infoColumn">
                                    <h4>Species Range:</h4>
                                    <ul>
                                        {rangeValues.map((value, index) => {
                                            return (
                                                <div key={index}>{value}</div>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-6 infoColumn">
                                    <h4>Host plants:</h4>
                                    {butterflyObj.hosts}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className="col-md-6 fact-area">
                                <h3>Food Source</h3>
                                <p>{butterflyObj.food}</p>
                            </div>
                            <div className="col-md-6 fact-area">
                                <h3>Habitat</h3>
                                <p>{butterflyObj.habitat}</p>
                            </div>
                            <div className="col-md-6 fact-area">
                                <h3>Life History</h3>
                                <p>{butterflyObj.history}</p>
                            </div>
                            <div className="col-md-6 fact-area">
                                <h3>Flights</h3>
                                <p>{butterflyObj.flights}</p>
                            </div>
                            <div className="col-md-6 fact-area">
                                <h3>Fun Facts</h3>
                                <p>{butterflyObj.funFact}</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>

    )
}

export default ButterflyDetail;