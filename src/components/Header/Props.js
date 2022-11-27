import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import {
  listModules,
  listOrganizations,
  getOrganization,
  listOrders,
} from "../../graphql/queries";

export default async function getProps(orgURL) {
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

  const org = await API.graphql({
    query: getOrganization,
    variables: { id: organizationID },
  });

  let images = {};
  if (org.data.getOrganization.logo) {
    const image = await Storage.get(org.data.getOrganization.logo);
    images = { ...images, logo: image };
  }
  if (org.data.getOrganization.coverMedia) {
    const image = await Storage.get(org.data.getOrganization.coverMedia);
    images = { ...images, coverMedia: image };
  }

  const organization = {
    name: org.data.getOrganization.name,
    orgURL: org.data.getOrganization.orgURL,
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
  };

  return {
    organizationProp: organization,
    imagesProp: images,
  };
}

export async function getPropsID(orgID) {
  const org = await API.graphql({
    query: getOrganization,
    variables: { id: orgID },
  });

  let images = {};
  if (org.data.getOrganization.logo) {
    const image = await Storage.get(org.data.getOrganization.logo);
    images = { ...images, logo: image };
  }
  if (org.data.getOrganization.coverMedia) {
    const image = await Storage.get(org.data.getOrganization.coverMedia);
    images = { ...images, coverMedia: image };
  }

  const organization = {
    name: org.data.getOrganization.name,
    orgURL: org.data.getOrganization.orgURL,
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
  };

  return {
    organizationProp: organization,
    imagesProp: images,
  };
}
