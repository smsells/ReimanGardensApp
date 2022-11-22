import React, { useEffect } from 'react'
import { API} from 'aws-amplify';
import { listOrganizations} from '../../graphql/queries';




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
            

        </div>
    )
}
export default Parks;