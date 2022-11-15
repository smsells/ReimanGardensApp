import { React, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { listModules } from "../../graphql/queries";

const CustomizeModules = () => {
  const sha512Hash = localStorage.getItem("token");
  const [modules, setModules] = useState({});
  const [modulesList, setModulesList] = useState([]);

  const initialModule = {
    id: "",
    title: "",
    content: "",
    image: "",
    orgID: sha512Hash,
    active: 0,
  };

  useEffect(() => {
    getModules();
  }, []);

  async function getModules() {
    let filter = {
      and: [
        {
          orgID: { eq: sha512Hash },
        },
      ],
    };
    const apiData = await API.graphql({
      query: listModules,
      variables: { filter: filter },
    });
    console.log("Modules", apiData.data.listModules.items);
    const modulesFromAPI = apiData.data.listModules.items;
    const modulesData = {};
    await Promise.all(
      modulesFromAPI.map(async (module) => {
        const id = module.id;
        if (module.image) {
          const image = await Storage.get(module.image);
          module.image = image;
        }
        modulesData[module.id] = module;
        console.log("Module Data id", modulesData[id]);

        return module;
      })
    );
    console.log("Module Data", modulesData);
    console.log("Modules from API", modulesFromAPI);

    setModulesList(modulesFromAPI);
    setModules(modulesData);
  }
  return (
    <div className="Home">
      {modulesList.map((module) => (
        <div key={module.id}>
          <input
            onChange={(e) =>
              setModules({
                ...modules,
                key: { ...module, title: e.target.value },
              })
            }
            placeholder="Title"
            value={modules[module.id].title}
          />
          <input
            onChange={(e) =>
              setModules({
                ...modules,
                key: { ...module, content: e.target.value },
              })
            }
            placeholder="Title"
            value={modules[module.id].content}
          />
          <p>
            {module.image && <img src={module.image} style={{ width: 400 }} />}
          </p>
          <p></p>
        </div>
      ))}
    </div>
  );
};
export default CustomizeModules;
