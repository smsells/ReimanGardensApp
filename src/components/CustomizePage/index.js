import { React, useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";
import { getOrganization } from "../../graphql/queries";
import { updateOrganization as updateOrgMutation } from "../../graphql/mutations";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const CustomizePage = () => {
  const initialCustomizeState = {
    name: "",
    locationCity: "",
    locationState: "",
    headerColor: "",
    sectionHeaderColor: "",
    menuColor: "",
    linkFontColor: "",
    adminIconColor: "",
    homepageBackground: "",
    font: "",
    logo: "",
    coverMedia: "",
  };
  const navigate = useNavigate();

  const sha512Hash = localStorage.getItem("token");

  const [organization, setOrganization] = useState({});
  const [formData, setFormData] = useState(initialCustomizeState);
  const [headerColor, setHeaderColor] = useColor("hex", formData.headerColor);

  useEffect(() => {
    getOrg();
  }, []);

  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: sha512Hash },
    });
    // console.log("org", org);
    setOrganization(org);
    setFormData({
      name: org.data.getOrganization.name,
      locationCity: org.data.getOrganization.locationCity,
      locationState: org.data.getOrganization.locationState,
      headerColor: org.data.getOrganization.headerColor,
      sectionHeaderColor: org.data.getOrganization.sectionHeaderColor,
      menuColor: org.data.getOrganization.menuColor,
      linkFontColor: org.data.getOrganization.linkFontColor,
      adminIconColor: org.data.getOrganization.adminIconColor,
      homepageBackground: org.data.getOrganization.homepageBackground,
      font: org.data.getOrganization.font,
      logo: org.data.getOrganization.logo,
      coverMedia: org.data.getOrganization.coverMedia,
    });
  }

  function setHColor(color) {
    setHeaderColor(color);
    setFormData({ ...formData, headerColor: headerColor.hex });
  }

  const refreshPage = () => {
    navigate(0);
  };

  async function handleSubmit() {
    await API.graphql({
      query: updateOrgMutation,
      variables: {
        input: {
          id: sha512Hash,
          ...formData,
        },
      },
    });
    // setFormData(initialCustomizeState);
    refreshPage();
    console.log("form data", formData);
    setOrganization(formData);
    // navigate("/signin");s
  }

  return (
    <>
      <div className="Home">
        <header> Customize Page </header>
      </div>
      <div>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={4}>
            <label> Name </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Butterfly house name"
              defaultValue={initialCustomizeState.name}
              value={formData.name}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Location City </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, locationCity: e.target.value })
              }
              placeholder="location City"
              defaultValue={initialCustomizeState.locationState}
              value={formData.locationCity}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Location State </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, locationState: e.target.value })
              }
              placeholder="Location state"
              defaultValue={initialCustomizeState.locationState}
              value={formData.locationState}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Header Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={128}
              color={headerColor}
              onChange={setHColor}
              hideHSV
              dark
            />
          </Grid>
          <Grid item xs={4}>
            <label> Font </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, font: e.target.value })
              }
              placeholder="Font"
              defaultValue={initialCustomizeState.font}
              value={formData.font}
            />
          </Grid>
        </Grid>
        <button onClick={handleSubmit}>Apply changes</button>
      </div>
    </>
  );
};
export default CustomizePage;
