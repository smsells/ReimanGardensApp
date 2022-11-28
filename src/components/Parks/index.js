import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { listOrganizations } from "../../graphql/queries";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";
import AppHeader from "../Header/AppHeader";
import AppMenu from "../Header/AppMenu";
import getProps from "../Header/Props";
import { initialOrganizationState } from "../utils/initialStates";
import { useLocation } from "react-router-dom";

const Parks = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const orgURL = pathName[1];
  var latlonList = [];
  const [markers, setMarkers] = useState();
  const navigate = useNavigate();

  const [images, setImages] = useState({});
  const [organization, setOrganization] = useState(initialOrganizationState);

  useEffect(() => {
    async function fetchProps() {
      console.log("before props");

      // if you are going to use storage, keep your function here please
      await Auth.signIn("dummy1234", "dummy1234");
      const props = await getProps(orgURL);
      setOrganization(props.organizationProp);
      setImages(props.imagesProp);
      fetchOrganizations();

      // console.log("props", props);
      //   await Auth.signOut();
    }
    fetchProps();
  }, []);

  async function fetchOrganizations() {
    const apiData = await API.graphql({
      query: listOrganizations,
    });

    const organizationFromAPI = apiData.data.listOrganizations.items;

    var organizationsLat = [];
    var organizationsLon = [];
    var organizationID = [];
    var organizationURL = [];
    var i = 0;
    //var organizationsCountry = []
    organizationFromAPI.forEach((element) => {
      organizationsLat[i] = element.locationLatitude;
      organizationsLon[i] = element.locationLongitude;
      //maybe use username?
      organizationID[i] = element.id;
      organizationURL[i]=element.orgURL;
      //organizationsCountry[i]=element.locationCountry;
      i++;
    });

    for (var j = 0; j < organizationsLat.length; j++) {
      if (organizationsLat[j] != null || organizationsLon[j] != null) {
        var object = {};

        object["latitude"] = organizationsLat[j];
        object["longitude"] = organizationsLon[j];
        object["ID"] = organizationID[j];
        object["url"]=organizationURL[j]
        console.log("This is the URL that I got: "+organizationURL[j]);

        latlonList.push(object);
      }
    }
   

    var data = latlonList.map((element) => (
      <Marker
        position={[element.latitude, element.longitude]}
        eventHandlers={{
          click: (e) => {
            console.log(element);
            localStorage.setItem("token", element.ID);
            var toNavigate = "/"+element.url;
            navigate(toNavigate);
          },
        }}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      ></Marker>
    ));
    setMarkers(data);
  }
  function setActivePark(location) {
    console.log(location);
  }

  return (
    <div className="Parks">
      <AppHeader
        organizationProp={organization}
        imagesProp={images}
        menuProp={<AppMenu organizationProp={organization} admin={false} />}
      />
      <header> Parks Page </header>

      <MapContainer
        style={{ height: "450px", width: "100%" }}
        center={[42.0, -93.6]}
        zoom={4}
        maxZoom={18}
      >
        {markers}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
export default Parks;
