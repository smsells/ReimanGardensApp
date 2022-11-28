import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listImages, listButterflies } from '../../graphql/queries';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';


const ButterflyDetail = () => {

    const [butterflyImages, setButterflyImages] = useState([]);
    const [butterflyObj, setButterflyObj] = useState({});
    const [haveQueriedButterfly, setHaveQueriedButterfly] = useState(false);
    const [haveQueriedImages, setHaveQueriedImages] = useState(false);

    const butterflyID = useParams().id;

    useEffect(() => {
        fetchButterfly();
    });

    async function fetchButterfly() {

        try {
            if (!haveQueriedButterfly) {
                const apiButterflyData = await API.graphql(graphqlOperation(listButterflies));
                const butterfliesFromAPI = apiButterflyData.data.listButterflies.items;
                var filteredButterflies = butterfliesFromAPI.filter(butterfly => {
                    return butterfly.id === butterflyID;
                });

                setButterflyObj(filteredButterflies[0]);

                if (Object.keys(butterflyObj).length != 0) {
                    setHaveQueriedButterfly(true);
                    console.log("filtered butterfly object", butterflyObj);
                    fetchImages();
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

    return (
        <div>

            scientific name: {butterflyObj.scientificName}
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" rowSpacing={2}>
                {butterflyImages.map((image, index) => {
                    return (
                        <Grid item xs={3} key={image.id}>
                            <div style={{ backgroundColor: "rgba(222, 184, 135, 0.5)", borderRadius: "50px" }}>
                                {image && <img src={image.imageAddress} className="gallery-item" key={"image" + index} />}
                            </div>

                        </Grid>
                    );
                })}
            </Grid>


        </div>
    )
}

export default ButterflyDetail;