import { React, useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";
import { getOrganization } from "../../graphql/queries";
import { updateOrganization as updateOrgMutation } from "../../graphql/mutations";

// const [org, setOrg] = useState({});
// useEffect(() => {
//   setOrg(getOrg());
// }, []);

async function changeName(newName) {
  const sha512Hash = localStorage.setItem("token", sha512Hash);

  const organization = await API.graphql({
    query: getOrganization,
    variables: { id: sha512Hash },
  });
  <div className="App">
    <input
      type="text"
      onChange={(e) => {
        const name = e.target;
        // console.log(files);
        if (name) {
          //testShipment = csvToJson(files);
          console.log("result", name);
        }
      }}
    />
  </div>;
}

const CustomizePage = () => {
  const sha512Hash = localStorage.getItem("token");

  const [organization, setOrganization] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getOrg();
  }, []);

  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: sha512Hash },
    });
    console.log("org", org);
    setOrganization(org);
    setFormData(org);
  }

  async function handleSubmit() {
    await API.graphql({
      query: updateOrgMutation,
      variables: {
        input: {
          id: sha512Hash,
          name: formData.name,
        },
      },
    });
    setOrganization(formData);
  }

  return (
    <>
      <div className="Home">
        <header> Customize Page </header>
      </div>
      <div>
        <p>
          Name:
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={formData.name}
            defaultValue={formData.name}
            value={formData.name}
          />
        </p>
        <button onClick={handleSubmit}>Apply changes</button>
      </div>
    </>
  );
};
export default CustomizePage;
