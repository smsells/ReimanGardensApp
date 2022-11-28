import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import { Storage } from "aws-amplify";
import {
  listModules,
  listOrganizations,
  getOrganization,
  listOrders,
} from "../../graphql/queries";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";

const Home = () => {
  // const [orgID, setOrgID] = useState("");
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  // console.log("orgURL", orgURL);
  const [activeModules, setActiveModules] = useState([]);
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      console.log("before props");

      await Auth.signIn("dummy1234", "dummy1234");
      const props = await getProps(orgURL);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
      getActiveModules();

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
  return (
    <div className="Home">
      <AppHeader
        organizationProp={organization}
        imagesProp={images}
        menuProp={<AppMenu organizationProp={organization} admin={false} />}
      />
      {activeModules.map((module) => (
        <div key={module.id || module.title}>
          <h1>{module.title}</h1>
          <p>{module.content}</p>
          {module.image && <img src={module.image} style={{ width: 400 }} />}
        </div>
      ))}
    </div>
  );
};
export default Home;
//<Link to ="/notes"><button> Go to Notes</button> </Link>
