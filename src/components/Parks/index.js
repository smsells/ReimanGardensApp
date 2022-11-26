import React, { useState, useEffect } from 'react'
import { API} from 'aws-amplify';
import { listOrganizations} from '../../graphql/queries';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import {

    useNavigate
 
  } from "react-router-dom";





const Parks = () =>{
    var latlonList =[];
    const [markers, setMarkers] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchOrganizations();
    })
    async function fetchOrganizations(){
        const apiData = await API.graphql({
            query: listOrganizations
        })
   
    const organizationFromAPI = apiData.data.listOrganizations.items;
   
    var organizationsLat= [];
    var organizationsLon = [];
    var organizationID = [];
    var i =0;
    //var organizationsCountry = []
   organizationFromAPI.forEach(element => {
        organizationsLat[i]= element.locationLatitude;
        organizationsLon[i]=element.locationLongitude;
        //maybe use username?
        organizationID[i]=element.id;
        //organizationsCountry[i]=element.locationCountry;
        i++;
        
   });
  
    for(var j=0 ; j<organizationsLat.length; j++){
    if(organizationsLat[j]!=null|| organizationsLon[j]!=null){
       
        var object = {};
        
        object['latitude']=organizationsLat[j];
         object['longitude'] = organizationsLon[j];
         object['ID']=organizationID[j];
         
         latlonList.push(object);

    }
    
    
    
   }

   
  
    var data  =latlonList.map(element=>(
                     <Marker
                    
                    position={[
                        element.latitude,
                        element.longitude
                    ]}
                    eventHandlers={{
                        click: (e) =>{
                            console.log(element);
                            localStorage.setItem("token", element.ID);
                            navigate("/");

                        },
                    }}
                    icon = {new Icon({iconUrl: markerIconPng, iconSize: [25,41], iconAnchor: [12,41]})}
                    ></Marker> 

)) 
    setMarkers(data);

    }
    function setActivePark(location){
        console.log(location);
    }

    return(
        <div className="Parks">
            <header > Parks Page </header>
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
    )
}
export default Parks;