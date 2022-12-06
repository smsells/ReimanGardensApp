import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import {
  listModules,
  listOrganizations,
  listImages,
  listButterflies,
} from "../../graphql/queries";
import { updateOrganization as updateOrgMutation } from "../../graphql/mutations";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import {
  initialButterflyObjectState,
  initialOrganizationState,
} from "../utils/initialStates";
import { Link } from "react-router-dom";
import { dateCompare } from "../utils/sort";

const Home = () => {
  // const [orgID, setOrgID] = useState("");
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  // console.log("orgURL", orgURL);
  const [activeModules, setActiveModules] = useState([]);
  const [queryImage, setQueryImage] = useState();
  const [filteredImage, setFilteredImage] = useState();
  const [haveQueried, setHaveQueried] = useState(false);
  const [haveFiltered, setHaveFiltered] = useState(false);
  const [featuredButterfly, setFeaturedButterfly] = useState(
    initialButterflyObjectState
  );
  const [featuredCommonName, setFeaturedCommonName] = useState("");
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      console.log("before props");

      await Auth.signIn("dummy1234", "dummy1234")
        .then(() => {
          console.log("user signed in");
        })
        .catch(() => {
          console.log("signin error");
        });
      const props = await getProps(orgURL);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
      console.log("org prop", props.organizationProp);
      getActiveModules();
      // const date = new Date(organization.featuredButterflyDay);
      // console.log("Date", date);
      // console.log("Org date", organization.featuredButterflyDay);
      await getFeaturedButterfly(props.organizationProp);

      // console.log("props", props);
      // await Auth.signOut();
    }
    fetchProps();
  }, []);

  async function getActiveModules() {
    // get organization id
    let filterOrg = {
      orgURL: { eq: orgURL },
    };
    const apiDataOrg = await API.graphql({
      query: listOrganizations,
      variables: { filter: filterOrg },
    });
    if (apiDataOrg == null) {
      console.log("its null");
    }

    const organizationFromAPI = apiDataOrg.data.listOrganizations.items;
    const organizationID = organizationFromAPI[0].id;

    let filter = {
      and: [
        {
          orgID: { eq: organizationID },
        },
        {
          active: { eq: 1 },
        },
      ],
    };
    const apiData = await API.graphql({
      query: listModules,
      variables: { filter: filter },
    });
    // await Auth.signIn("dummy1234", "dummy1234");

    const activeModulesFromAPI = apiData.data.listModules.items;
    await Promise.all(
      activeModulesFromAPI.map(async (activeModule) => {
        if (activeModule.image) {
          const image = await Storage.get(activeModule.image);
          activeModule.image = image;
        }
        return activeModule;
      })
    );
    setActiveModules(activeModulesFromAPI);
    // await Auth.signOut();
  }

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function fetchData(newButterfly, newDate, organizationProp) {
    try {
      if (!haveQueried) {
        const apiButterflyData = await API.graphql(
          graphqlOperation(listButterflies)
        );
        const butterfliesFromAPI = apiButterflyData.data.listButterflies.items;
        console.log("All butterflies", butterfliesFromAPI);
        const random = randomNumberInRange(0, butterfliesFromAPI.length - 1);
        console.log("random", random);
        console.log("new butterfly", newButterfly);
        console.log("date", newDate);
        var i = 0;
        var fButterfly = initialButterflyObjectState;
        await Promise.all(
          butterfliesFromAPI.map(async (butterfly) => {
            if (i === random) {
              if (newButterfly) {
                console.log("Random featured butterfly", butterfly);
                setFeaturedButterfly(butterfly);
                fButterfly = butterfly;
                setOrganization({
                  ...organizationProp,
                  featuredButterflyID: butterfly.id,
                  featuredButterflyDate: newDate,
                });
              }
            } else if (butterfly.id == organizationProp.featuredButterflyID) {
              setFeaturedButterfly(butterfly);
            }
            i++;
          })
        );
        // for (i = 0; i < butterfliesFromAPI.length; i++) {

        // }
        // setButterflyList(butterfliesFromAPI);

        console.log("scientific Name", featuredButterfly);
        const apiImagesData = await API.graphql(graphqlOperation(listImages));
        const imagesFromAPI = apiImagesData.data.listImages.items;
        await Promise.all(
          imagesFromAPI.map(async (image) => {
            const tempImage = await Storage.get(image.imageAddress);
            image.imageAddress = tempImage;
            if (fButterfly.scientificName === image.butterflyName) {
              console.log("Query image", image);
              setQueryImage(image);
            }
            return image;
          })
        );
        // setQueryImages(imagesFromAPI);

        if (queryImage) {
          setHaveQueried(true);
          console.log("queried images", queryImage);
          filterImage();
        }

        console.log("Org after get featured", organization);
        await API.graphql({
          query: updateOrgMutation,
          variables: {
            input: {
              id: organizationProp.id,
              ...organizationProp,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function filterImage() {
    if (!haveFiltered) {
      var filtered = [];
      if (
        !filtered.some((img) => img.butterflyName === queryImage.butterflyName)
      ) {
        setFilteredImage(queryImage);
        // filtered = img;
      }
      setHaveFiltered(true);
    }
  }

  async function getFeaturedButterfly(organization) {
    const curDate = new Date();
    const curDateObj =
      curDate.getMonth() +
      "/" +
      curDate.getDate() +
      "/" +
      curDate.getFullYear();
    if (organization.featuredButterflyDate) {
      const orgDate = new Date(organization.featuredButterflyDate);
      const orgDateObj =
        orgDate.getMonth() +
        "/" +
        orgDate.getDate() +
        "/" +
        orgDate.getFullYear();
      if (dateCompare(orgDate, curDate) !== 0) {
        await fetchData(true, curDate.toString(), organization);
      } else {
        await fetchData(false, orgDate.toString(), organization);
      }
    } else {
      await fetchData(true, curDate.toString(), organization);
    }
  }

  return (
    <>
      <AppHeader
        organizationProp={organization}
        imagesProp={images}
        menuProp={<AppMenu organizationProp={organization} admin={false} />}
      />
      <div
        className="Home"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            images.coverMedia ||
            "url(https://www.reimangardens.com/wp-content/uploads/2018/01/53-Reiman-Gardens-Entrance-summer.jpg)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            gap: "100%",
            backgroundColor: "rgba(222, 184, 135, 0.5)",
            padding: "10px",
            gridAutoColumns: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "left",
              margin: "0.5rem",
            }}
          >
            {queryImage && (
              <Link
                to={
                  "/" +
                  organization.orgURL +
                  `/butterfly/${featuredButterfly.id}`
                }
              >
                <img
                  src={queryImage.imageAddress}
                  style={{ borderRadius: "50px", width: 400 }}
                />
              </Link>
            )}
            <div
              style={{
                marginLeft: "5rem",
                justifyContent: "left",
                textAlign: "left",
                backgroundColor: "white",
                height: "50%",
                borderRadius: "20px",
              }}
            >
              <h1>Featured butterfly</h1>
              <hr />
              <p>Common Name: {featuredButterfly.commonName}</p>
              <p>Scientific Name: {featuredButterfly.scientificName}</p>
            </div>
          </div>
          {activeModules.map((module) => (
            <div
              key={module.id || module.title}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "left",
                margin: "0.5rem",
                marginTop: "5rem",
                backgroundImage:
                  images.coverMedia ||
                  "url(https://www.reimangardens.com/wp-content/uploads/2018/01/53-Reiman-Gardens-Entrance-summer.jpg)",
              }}
            >
              {module.image && (
                <img
                  src={module.image}
                  style={{ width: 400, borderRadius: "50px" }}
                />
              )}
              <div
                style={{
                  marginLeft: "5rem",
                  justifyContent: "left",
                  textAlign: "left",
                  backgroundColor: "white",
                  height: "50%",
                  borderRadius: "20px",
                }}
              >
                <h1>{module.title}</h1>
                <hr />
                <p>{module.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
//<Link to ="/notes"><button> Go to Notes</button> </Link>
