import { React, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { listModules } from "../../graphql/queries";
import {
  updateModule as updateModuleMutation,
  deleteModule as deleteModuleMutation,
  createModule as createModuleMutation,
} from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const CustomizeModules = () => {
  const sha512Hash = localStorage.getItem("token");

  const initialModule = {
    title: "",
    content: "",
    image: "",
    orgID: sha512Hash,
    active: 0,
  };

  const [modules, setModules] = useState({});
  const [modulesList, setModulesList] = useState([]);
  const [newModule, setNewModule] = useState(initialModule);

  const navigate = useNavigate();

  useEffect(() => {
    getModules();
  }, []);

  /**
   * @description load all modules belonging to this organization
   */
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
    const moduleObjList = [];
    await Promise.all(
      modulesFromAPI.map(async (module) => {
        const id = module.id;
        if (module.image) {
          const image = await Storage.get(module.image);
          module.image = image;
        }
        const moduleObj = {};
        moduleObj["id"] = module.id;
        moduleObj["title"] = module.title;
        moduleObj["content"] = module.content;
        moduleObj["image"] = module.image;
        moduleObj["active"] = module.active;
        moduleObj["orgID"] = module.orgID;

        modulesData[module.id] = moduleObj;
        moduleObjList.push(moduleObj);
        // console.log("Module Data id", modulesData[id]);

        return module;
      })
    );
    console.log("Module Data", modulesData);
    console.log("Modules from API", moduleObjList);

    setModulesList(moduleObjList);
    setModules(modulesData);
  }

  async function onChangeModuleImage(module, e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const key = module.id;
    setModules({
      ...modules,
      key: { ...module, image: e.target.value },
    });
    await Storage.put(file.name, file);
  }

  async function onChangeNewModuleImage(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setNewModule({ ...newModule, image: file.name });
    await Storage.put(file.name, file);
  }

  async function handleSave(module, e) {
    console.log("Submitting", module);
    await API.graphql({
      query: updateModuleMutation,
      variables: {
        input: {
          id: module.id,
          ...module,
        },
      },
    });
    navigate(0);
  }

  async function handleDelete(module, e) {
    console.log("Submitting", module);
    await API.graphql({
      query: deleteModuleMutation,
      variables: {
        input: {
          id: module.id,
          ...module,
        },
      },
    });
    navigate(0);
  }

  async function handleModuleCreate() {
    if (newModule.title && newModule.content) {
      if (newModule.image) {
        const image = await Storage.get(newModule.image);
        newModule.image = image;
      }
      await API.graphql({
        query: createModuleMutation,
        variables: { input: newModule },
      });
      setNewModule(initialModule);
    }
    navigate(0);
  }

  /**
   * @description checkbox handler for active field in newly created module
   */
  function newModuleActiveCheckboxHandler() {
    if (newModule.active == 1) {
      setNewModule({ ...newModule, active: 0 });
    } else {
      setNewModule({ ...newModule, active: 1 });
    }
  }

  function moduleActiveCheckboxHandler(module, e) {
    if (module.active == 1) {
      setModules({
        ...modules,
        [module.id]: { ...module, active: 0 },
      });
    } else {
      setModules({
        ...modules,
        [module.id]: { ...module, active: 1 },
      });
    }
  }

  return (
    <>
      <div className="Home">
        {modulesList.map((module) => (
          <div key={module.id}>
            <input
              onChange={(e) => {
                setModules({
                  ...modules,
                  [module.id]: { ...module, title: e.target.value },
                });
              }}
              placeholder="Title"
              value={modules[module.id].title}
            />
            <input
              onChange={(e) =>
                setModules({
                  ...modules,
                  [module.id]: { ...module, content: e.target.value },
                })
              }
              placeholder="Title"
              value={modules[module.id].content}
            />
            <p>
              <label for="moduleImageUpload" class="custom-file-upload">
                Choose Module Image
              </label>
              <input
                id="moduleImageUpload"
                type="file"
                accept=".png, .jpeg, .jpg"
                name="moduleImageUpload"
                onChange={(e) => onChangeModuleImage(modules[module.id], e)}
              ></input>
              {module.image && (
                <img src={module.image} style={{ width: 400 }} />
              )}
            </p>
            <p>
              <input
                type="checkbox"
                id="checkboxModule"
                checked={modules[module.id].active == 1 ? true : false}
                onChange={(e) =>
                  moduleActiveCheckboxHandler(modules[module.id], e)
                }
              />
              <label htmlFor="checkboxModule">Active? </label>
            </p>
            <p>
              <button
                className="form-button"
                type="submit"
                value="Submit"
                onClick={(e) => handleSave(modules[module.id], e)}
              >
                Save Changes
              </button>
              <button
                className="form-button"
                type="submit"
                value="Submit"
                onClick={(e) => handleDelete(modules[module.id], e)}
              >
                Delete Module
              </button>
            </p>
          </div>
        ))}
      </div>
      <div>
        <h1>Add New Modules</h1>
        <p>
          <input
            onChange={(e) =>
              setNewModule({ ...newModule, title: e.target.value })
            }
            placeholder="Module Title"
            value={newModule.title}
          />
        </p>
        <p>
          <input
            onChange={(e) =>
              setNewModule({ ...newModule, content: e.target.value })
            }
            placeholder="Module Content"
            value={newModule.content}
          />
        </p>
        <p>
          <label for="moduleImageUpload" class="custom-file-upload">
            Choose Module Image
          </label>
          <input
            id="moduleImageUpload"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="moduleImageUpload"
            onChange={onChangeNewModuleImage}
          ></input>
        </p>
        <p>
          <input
            type="checkbox"
            id="checkboxModule"
            onChange={newModuleActiveCheckboxHandler}
          />
          <label htmlFor="checkboxModule">Active? </label>
        </p>
        <p>
          <button
            className="form-button"
            type="submit"
            value="Submit"
            onClick={handleModuleCreate}
          >
            Create Module
          </button>
          <button
            className="form-button"
            type="submit"
            value="Submit"
            onClick={(e) => setNewModule(initialModule)}
          >
            Clear Form
          </button>
        </p>
      </div>
    </>
  );
};
export default CustomizeModules;
