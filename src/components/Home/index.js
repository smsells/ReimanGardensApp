import { React, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { Link } from "react-router-dom";
import { listModules } from "../../graphql/queries";

const Home = () => {
  const sha512Hash = localStorage.getItem("token");
  const [activeModules, setActiveModules] = useState([]);

  useEffect(() => {
    getActiveModules();
  }, []);

  async function getActiveModules() {
    let filter = {
      and: [
        {
          orgID: { eq: sha512Hash },
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
    console.log("active Modules", apiData.data.listModules.items);
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
    setActiveModules(apiData.data.listModules.items);
  }
  return (
    <div className="Home">
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
