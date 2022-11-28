import * as  React from "react";
import {useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import { useLocation } from "react-router-dom";;
import { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listImages, listButterflies } from '../../graphql/queries';
import Grid from '@material-ui/core/Grid';
import './Gallery.css';
import { CustomHeaderLarge } from '../Fonts/CustomFonts';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link } from "react-router-dom";


const Gallery = () => {

    const [queryImages, setQueryImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [haveQueried, setHaveQueried] = useState(false);
    const [haveFiltered, setHaveFiltered] = useState(false);
    const [displayNameType, setDisplayNameType] = useState('scientificName');
    const [butterflyList, setButterflyList] = useState([]);


  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

    useEffect(() => {
        fetchData();
        async function fetchProps() {
            await Auth.signIn("dummy1234", "dummy1234");
            const props = await getProps(orgURL);
            setOrganization(props.organizationProp);
            setImages(props.imagesProp);
          }
          fetchProps();
    });

    async function fetchData() {
        try {
            if (!haveQueried) {
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

                if (queryImages.length > 0) {
                    setHaveQueried(true);
                    console.log("queried images", queryImages);
                    filterImages();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function filterImages() {

        if (!haveFiltered) {
            var filtered = [];
            for (var i = 0; i < queryImages.length; i++) {
                if (!filtered.some(img => (img.butterflyName === queryImages[i].butterflyName))) {
                    filtered.push(queryImages[i]);
                }
            }
            setFilteredImages(filtered);
            setHaveFiltered(true);
        }
    }

    function handleToggleChange (event){
        setDisplayNameType(event.target.value);
    };

    function findCommonName(sName){
        var cName = butterflyList.find(butterfly => (butterfly.scientificName === sName)).commonName;
        return cName;
    }

    function findID(sName){
        var id = butterflyList.find(butterfly => (butterfly.scientificName === sName)).id;
        return id;
    }

    return (
        <div className="Gallery">
            <AppHeader
        organizationProp={organization}
        imagesProp={images}
        menuProp={<AppMenu organizationProp={organization} admin={false} />}
      />
      <header> Gallery Page </header>
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                <Grid item xs={12}>
                    <ToggleButtonGroup exclusive onChange={handleToggleChange} value={displayNameType}>
                        <ToggleButton value="scientificName">Scientific Name</ToggleButton>
                        <ToggleButton value="commonName">Common Name</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {filteredImages.map((image, index) => {
                    return (
                        <Grid item xs={3} key={image.id}>
                            <div style={{ backgroundColor: "rgba(222, 184, 135, 0.5)", borderRadius: "50px" }}>
                                {image && <Link to={`/butterfly/${findID(image.butterflyName)}`}><img src={image.imageAddress} className="gallery-item" key={"image" + index} /></Link>}
                                <CustomHeaderLarge>
                                    {displayNameType === "scientificName" ? image.butterflyName : findCommonName(image.butterflyName) }
                                </CustomHeaderLarge>
                            </div>

                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}
export default Gallery;
