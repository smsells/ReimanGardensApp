import { React, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getOrganization } from "../../graphql/queries";
import { updateOrganization as updateOrgMutation } from "../../graphql/mutations";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import { Storage } from "aws-amplify";

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

  useEffect(() => {
    getOrg();
  }, []);

  const [headerColor, setHeaderColor] = useColor("hex", formData.headerColor);
  const [sectionHeaderColor, setSectionHeaderColor] = useColor(
    "hex",
    formData.sectionHeaderColor
  );
  const [menuColor, setMenuColor] = useColor("hex", formData.menuColor);
  const [linkFontColor, setLinkFontColor] = useColor(
    "hex",
    formData.linkFontColor
  );
  const [adminIconColor, setAdminIconColor] = useColor(
    "hex",
    formData.adminIconColor
  );

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

  async function onChangeLogo(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file.name });
    await Storage.put(file.name, file);
    getOrg();
  }

  function setHColor(color) {
    setHeaderColor(color);
    setFormData({ ...formData, headerColor: headerColor.hex });
  }
  function setSHColor(color) {
    setSectionHeaderColor(color);
    setFormData({ ...formData, sectionHeaderColor: sectionHeaderColor.hex });
  }
  function setMcolor(color) {
    setMenuColor(color);
    setFormData({ ...formData, menuColor: menuColor.hex });
  }
  function setLFColor(color) {
    setLinkFontColor(color);
    setFormData({ ...formData, linkFontColor: linkFontColor.hex });
  }
  function setAIColor(color) {
    setAdminIconColor(color);
    setFormData({ ...formData, adminIconColor: adminIconColor.hex });
  }

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
    if (formData.logo) {
      const image = await Storage.get(formData.logo);
      formData.logo = image;
    }
    // setFormData(initialCustomizeState);
    console.log("form data", formData);
    setOrganization(formData);
    navigate(0);
    // navigate("/signin");s
  }

  return (
    <>
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
              value={formData.locationState}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Header Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={100}
              color={headerColor}
              onChange={setHColor}
              hideHSV
              hideRGB
              dark
            />
          </Grid>
          <Grid item xs={4}>
            <label> Section Header Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={100}
              color={sectionHeaderColor}
              onChange={setSHColor}
              hideHSV
              hideRGB
              dark
            />
          </Grid>
          <Grid item xs={4}>
            <label> Menu Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={100}
              color={menuColor}
              onChange={setMcolor}
              hideHSV
              hideRGB
              dark
            />
          </Grid>
          <Grid item xs={4}>
            <label> Link Font Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={100}
              color={linkFontColor}
              onChange={setLFColor}
              hideHSV
              hideRGB
              dark
            />
          </Grid>
          <Grid item xs={4}>
            <label> Admin Icon Color </label>
          </Grid>
          <Grid item xs={8}>
            <ColorPicker
              width={256}
              height={100}
              color={adminIconColor}
              onChange={setAIColor}
              hideHSV
              hideRGB
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
              value={formData.font}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Logo </label>
          </Grid>
          <Grid item xs={8}>
            <label for="fileUpload" class="custom-file-upload">
              Choose Files
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".png, .jpeg, .jpg"
              name="imageUpload"
              onChange={onChangeLogo}
            ></input>
            {formData.logo && (
              <img src={formData.logo} style={{ width: 200 }} />
            )}
          </Grid>
        </Grid>
        <button
          className="form-button"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};
export default CustomizePage;
