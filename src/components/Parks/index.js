import React, { useEffect } from 'react'
import { API} from 'aws-amplify';
import { listOrganizations} from '../../graphql/queries';
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import 'leaflet/dist/leaflet.css';





const Parks = () =>{
    var latlonList =[];

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
    var organizationName = [];
    var i =0;
    //var organizationsCountry = []
   organizationFromAPI.forEach(element => {
        organizationsLat[i]= element.locationLatitude;
        organizationsLon[i]=element.locationLongitude;
        //maybe use username?
        organizationName[i]=element.name;
        //organizationsCountry[i]=element.locationCountry;
        i++;
        
   });
  
    for(var j=0 ; j<organizationsLat.length; j++){
    if(organizationsLat[j]!=null|| organizationsLon[j]!=null){
       
        var object = {};
        
        object['latitude']=organizationsLat[j];
         object['longitude'] = organizationsLon[j];
         object['name']=organizationName[j];
         console.log(object);
         latlonList.push(object);

    }
    
    
    
   }

   
   console.log(latlonList);
        

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
               
                {latlonList.map(location=>(
                    <Marker
                    
                    key={location.name}
                    position={[
                        location.latitude,
                        location.longitude
                    ]}
                    onClick={() => {
                        setActivePark(location);
                      }}
                    />

                ))}
            <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />

      
    </MapContainer>
            

        </div>
    )
}
export default Parks;