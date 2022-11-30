import { React, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import { listModules } from "../../graphql/queries";
import Grid from "@material-ui/core/Grid";

import {
  updateModule as updateModuleMutation,
  deleteModule as deleteModuleMutation,
  createModule as createModuleMutation,
} from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import AppHeader from "../Header/AppHeader";

import { getPropsID } from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import AdminMenu from "../Header/AdminMenu";

const CustomizeModules = () => {
  const orgID = localStorage.getItem("token");

  const initialModule = {
    id: "",
    title: "",
    content: "",
    image: "",
    orgID: orgID,
    active: 0,
  };

  const [modulesList, setModulesList] = useState([]);
  const [module, setModule] = useState(initialModule);

  const [newModule, setNewModule] = useState(initialModule);

  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      const props = await getPropsID(orgID);
      console.log("props", props);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
    }
    fetchProps();
    getModules();
  }, []);

  /**
   * @description load all modules belonging to this organization
   */
  async function getModules() {
    let filter = {
      and: [
        {
          orgID: { eq: orgID },
        },
      ],
    };
    const apiData = await API.graphql({
      query: listModules,
      variables: { filter: filter },
    });
    // console.log("Modules", apiData.data.listModules.items);
    const modulesFromAPI = apiData.data.listModules.items;
    const moduleObjList = [];
    await Promise.all(
      modulesFromAPI.map(async (module) => {
        let moduleObj = {
          id: module.id,
          title: module.title,
          content: module.content,
          image: module.image,
          active: module.active,
          orgID: module.orgID,
        };

        moduleObjList.push(moduleObj);

        // console.log("Module Data id", modulesData[id]);

        return module;
      })
    );
    // console.log("Module Data", modulesData);
    // console.log("Modules from API", moduleObjList);

    setModulesList(moduleObjList);
  }

  //Populate the edit form with the selected butterfly object
  function populateModule(event) {
    const found = modulesList.find((obj) => {
      return obj.id === event.target.value;
    });
    setModule({
      ...module,
      id: found.id,
      title: found.title,
      content: found.content,
      image: found.image,
      active: found.active,
    });
  }

  //edit butterfly in database on button click
  async function editModule(event) {
    try {
      event.preventDefault();
      if (!module.title || !module.content) return;
      await API.graphql({
        query: updateModuleMutation,
        variables: {
          input: {
            id: module.id,
            ...module,
          },
        },
      });

      console.log("editing...");
      setModule(initialModule);
    } catch (error) {
      console.log("edit error module", module);
      console.log("edit error", error);
    }
    navigate(0);
  }

  async function getImage(name) {
    console.log("name", name);
    const image = await Storage.get(name);
    console.log("imag " + name + " imag" + image);

    return image;
  }

  async function onChangeModuleImage(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setModule({ ...module, image: file.name });
    await Storage.put(file.name, file);
    // getModules();
  }

  async function onChangeNewModuleImage(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setNewModule({ ...newModule, image: file.name });
    await Storage.put(file.name, file);
    // getModules();
  }

  function cancelEdit() {
    navigate(0);
  }

  async function handleDelete(e) {
    console.log("Submitting", module);
    const id = module.id;
    const newModulesArray = modulesList.filter((module) => module.id !== id);
    setModulesList(newModulesArray);
    await API.graphql({
      query: deleteModuleMutation,
      variables: {
        input: { id: module.id },
      },
    });
    navigate(0);
  }

  async function handleModuleCreate() {
    if (newModule.title && newModule.content) {
      // if (newModule.image) {
      //   const image = await Storage.get(newModule.image);
      //   newModule.image = image;
      // }
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
    if (newModule.active === 1) {
      setNewModule({ ...newModule, active: 0 });
    } else {
      setNewModule({ ...newModule, active: 1 });
    }
  }

  function moduleActiveCheckboxHandler(e) {
    if (module.active === 1) {
      setModule({
        ...module,
        active: 0,
      });
    } else {
      setModule({
        ...module,
        active: 1,
      });
    }
  }

  return (
    <>
      <AppHeader
        menuProp={<AdminMenu organizationProp={organization} />}
        organizationProp={organization}
        imagesProp={images}
      />
      <form
        style={{
          fontSize: "x-large",
          backgroundColor: "rgba(222, 184, 135, 0.5)",
          padding: "5px",
        }}
      >
        <h1>Edit Butterfly</h1> <br />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={5}
        >
          <Grid item xs={12}>
            <select placeholder="" onChange={(e) => populateModule(e)}>
              <option></option>
              {modulesList.map(({ title, id }, index) => {
                return (
                  <option key={"butterfly" + index} name={title} value={id}>
                    {title}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={4}>
            <label> Title </label>
          </Grid>
          <Grid item xs={8}>
            <input
              value={module.title}
              type="text"
              width={"100%"}
              onChange={(e) => setModule({ ...module, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Content </label>
          </Grid>
          <Grid item xs={8}>
            <input
              value={module.content}
              type="text"
              width={"100%"}
              onChange={(e) =>
                setModule({ ...module, content: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <label>Add Images</label>
          </Grid>
          <Grid item xs={8}>
            <label htmlFor="fileUpload" className="custom-file-upload">
              Choose Files
            </label>
            <input
              multiple
              id="fileUpload"
              type="file"
              name="imageUpload"
              onChange={onChangeModuleImage}
            ></input>
          </Grid>
          <Grid item xs={4}>
            <label>Set Module Visibility</label>
          </Grid>
          <Grid item xs={8}>
            <label htmlFor="checkboxModule">Active? </label>
            <input
              type="checkbox"
              id="checkboxModule"
              checked={module.active === 1 ? true : false}
              onChange={(e) => moduleActiveCheckboxHandler(e)}
            />
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={2}>
            <button
              className="form-button"
              type="submit"
              value="Submit"
              onClick={(e) => handleDelete(e)}
            >
              Delete Module
            </button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <button
              className="form-button"
              type="submit"
              value="Submit"
              onClick={(e) => editModule(e)}
            >
              Save Changes
            </button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <button
              className="form-button"
              type="button"
              value="cancel"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </Grid>
        </Grid>
      </form>
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
          <label for="newModuleImageUpload" class="custom-file-upload">
            Choose Module Image
          </label>
          <input
            id="newModuleImageUpload"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="newModuleImageUpload"
            onChange={onChangeNewModuleImage}
          ></input>
          {newModule.image && (
            <img src={getImage(newModule.image)} style={{ width: 400 }} />
          )}
        </p>
        <p>
          <input
            type="checkbox"
            id="newCheckboxModule"
            checked={newModule.active === 1 ? true : false}
            onChange={newModuleActiveCheckboxHandler}
          />
          <label htmlFor="newCheckboxModule">Active? </label>
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
