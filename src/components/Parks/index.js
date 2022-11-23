import React, { useEffect } from 'react'
import { API} from 'aws-amplify';
import { listOrganizations} from '../../graphql/queries';
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import 'leaflet/dist/leaflet.css';





const Parks = () =>{

    useEffect(()=>{
        fetchOrganizations();
    })
    async function fetchOrganizations(){
        const apiData = await API.graphql({
            query: listOrganizations
        })
   
    const organizationFromAPI = apiData.data.listOrganizations.items;
   
    var organizationsState= [];
    var organizationsCity = [];
    var i =0;
    //var organizationsCountry = []
   organizationFromAPI.forEach(element => {
        organizationsState[i]= element.locationState;
        organizationsCity[i]=element.locationCity;
        //organizationsCountry[i]=element.locationCountry;
        i++;
        
   });
   console.log(organizationsCity);
        

    }
    return(
        <div className="Parks">
            <header > Parks Page </header>
            <MapContainer
                 style={{ height: "450px", width: "100%" }}
                 center={[51.0, 19.0]}
                 zoom={4}
                 maxZoom={18}
             >
            <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />

      
    </MapContainer>
            

        </div>
    )
}
export default Parks;