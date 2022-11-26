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
  const sha512Hash = localStorage.getItem("token");

  const initialCustomizeState = {
    id: sha512Hash,
    name: "",
    locationAddress: "",
    locationZipCode: "",
    locationCity: "",
    locationState: "",
    locationCountry: "",
    headerColor: "",
    sectionHeaderColor: "",
    menuColor: "",
    linkFontColor: "",
    adminIconColor: "",
    homepageBackground: "",
    font: "",
    logo: "",
    coverMedia: "",
    deleted: false,
    suspended: false,
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialCustomizeState);
  const [images, setImages] = useState({});

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

  /**
   * @description Load organization using organization id
   */
  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: sha512Hash },
    });

    if (org.data.getOrganization.logo) {
      const image = await Storage.get(org.data.getOrganization.logo);
      setImages({ ...images, logo: image });
    }
    if (org.data.getOrganization.coverMedia) {
      const image = await Storage.get(org.data.getOrganization.coverMedia);
      setImages({ ...images, coverMedia: image });
    }

    // console.log("org", org);
    setFormData({
      name: org.data.getOrganization.name,
      locationAddress: org.data.getOrganization.locationAddress,
      locationZipCode: org.data.getOrganization.locationZipCode,
      locationCity: org.data.getOrganization.locationCity,
      locationState: org.data.getOrganization.locationState,
      locationCountry: org.data.getOrganization.locationCountry,
      headerColor: org.data.getOrganization.headerColor,
      sectionHeaderColor: org.data.getOrganization.sectionHeaderColor,
      menuColor: org.data.getOrganization.menuColor,
      linkFontColor: org.data.getOrganization.linkFontColor,
      adminIconColor: org.data.getOrganization.adminIconColor,
      homepageBackground: org.data.getOrganization.homepageBackground,
      font: org.data.getOrganization.font,
      logo: org.data.getOrganization.logo,
      coverMedia: org.data.getOrganization.coverMedia,
      deleted: org.data.getOrganization.deleted,
      suspended: org.data.getOrganization.suspended,
    });
  }

  /**
   *
   * @param {*} e
   * @description load selected logo into aws storage and update logo field.
   * Reload organization to get new logo loaded
   */
  async function onChangeLogo(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file.name });
    setImages({ ...images, logo: file });
    await Storage.put(file.name, file);
    // getOrg();
  }

  /**
   *
   * @param {*} e
   * @description load selected cover media into aws storage and update logo field.
   * Reload organization to get new logo loaded
   */
  async function onChangeCoverMedia(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, coverMedia: file.name });
    setImages({ ...images, coverMedia: file });
    await Storage.put(file.name, file);
    // getOrg();
  }

  /**
   *
   * @param {*} color new header color to be added in formData
   */
  function setHeaderColorFunction(color) {
    setHeaderColor(color);
    setFormData({ ...formData, headerColor: headerColor.hex });
  }

  /**
   *
   * @param {*} color: new section header color to be added in formData
   */
  function setSectionHeaderColorFunction(color) {
    setSectionHeaderColor(color);
    setFormData({ ...formData, sectionHeaderColor: sectionHeaderColor.hex });
  }

  /**
   *
   * @param {*} color new menu color to be added in formData
   */
  function setMcolor(color) {
    setMenuColor(color);
    setFormData({ ...formData, menuColor: menuColor.hex });
  }

  /**
   *
   * @param {*} color new link font color to be added in formData
   */
  function setLinkFontColorFunction(color) {
    setLinkFontColor(color);
    setFormData({ ...formData, linkFontColor: linkFontColor.hex });
  }

  /**
   *
   * @param {*} color new admin icon to be added in formData
   */
  function setAdminIconColorFunction(color) {
    setAdminIconColor(color);
    setFormData({ ...formData, adminIconColor: adminIconColor.hex });
  }

  /**
   * @description handle form submit
   * - update orgnization info from form data
   * - create new module if new module title and content has been added
   * - refresh page to show changes
   */
  async function handleSubmit() {

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()
var city = ""
if(formData.locationCity){
  city = formData.locationCity;
}
var country = "";
if(formData.locationCountry){
  country = formData.locationCountry;
}
var address = "";
if(formData.locationAddress){
  var address = formData.locationAddress
}

var query = address + " "+city+", "+country;
var latitude;
var longitude;
if(!city&&!address&&!country){
  console.log("No Query");
  await API.graphql({
    query: updateOrgMutation,
    variables: {
      input: {
        id: sha512Hash,
        ...formData,
      },
    },
  });
  navigate(0);
}
else{
  console.log("query");
  console.log(query);
  await geocoder.search( { q: query } )
    .then((response) => {
        latitude = response[0].lat;
        longitude = response[0].lon;
        console.log(latitude + " "+ longitude)

    })
    .catch((error) => {
        console.log(error)
    })
    console.log("I am outside of the query now");

  await API.graphql({
        query: updateOrgMutation,
        variables: {
          input: {
            id: sha512Hash,
            locationLatitude: latitude,
            locationLongitude: longitude,
            ...formData,
          },
        },
      });
      //navigate(0);

}

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
            <label> Address </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, locationAddress: e.target.value })
              }
              placeholder="Address"
              value={formData.locationAddress}
            />
          </Grid>
          <Grid item xs={4}>
            <label> Zip Code/P.O. Box </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, locationZipCode: e.target.value })
              }
              placeholder="Zip code or P.O. Box"
              value={formData.locationZipCode}
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
            <label> Country </label>
          </Grid>
          <Grid item xs={8}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, locationCountry: e.target.value })
              }
              placeholder="Country"
              value={formData.locationCountry}
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
              onChange={setHeaderColorFunction}
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
              onChange={setSectionHeaderColorFunction}
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
              onChange={setLinkFontColorFunction}
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
              onChange={setAdminIconColorFunction}
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
            <label for="logoUpload" class="custom-file-upload">
              Choose Files
            </label>
            <input
              id="logoUpload"
              type="file"
              accept=".png, .jpeg, .jpg"
              name="logoUpload"
              onChange={onChangeLogo}
            ></input>
            {images.logo && <img src={images.logo} style={{ width: 100 }} />}
          </Grid>
          <Grid item xs={4}>
            <label> Cover Media </label>
          </Grid>
          <Grid item xs={8}>
            <label for="coverMediaUpload" class="custom-file-upload">
              Choose Files
            </label>
            <input
              id="coverMediaUpload"
              type="file"
              accept=".png, .jpeg, .jpg"
              name="coverMediaUpload"
              onChange={onChangeCoverMedia}
            ></input>
            {images.coverMedia && (
              <img src={images.coverMedia} style={{ width: 100 }} />
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
