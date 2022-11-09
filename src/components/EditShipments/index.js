import React, { useState, useEffect, useCallback } from 'react';
import {useSearchParams} from 'react-router-dom';
import { getOrder } from '../../graphql/queries';
import { API, Auth } from 'aws-amplify';



const EditShipments = () =>{
    const[searchparams]=useSearchParams();
    console.log(searchparams.get("id")+ " in EditShipments");
    const [showForm, setShowForm]=useState(false);

    const handleEdit = useCallback((species, numReceived, numEmerged, damagedInTransit, diseased, parasites, poorEmerged, numEmerged, ID)=>{


    })
    function handleSubmit(){
         /* async function editShipment(){
        //const editFormData; //Data entered once edit option is picked
        await API.graphql({ query: createShipmentMutation, variables: { input: formData } });
        setNotes([...shipments, formData]);
        setFormData(initialFormState);
        const newShipments = shipments.filter(shipment => shipment.id !== id);
        setNotes(newShipments);
        await API.graphql({ query: deleteShipmentMutation, variables: { input: { id } } });
        //Add new one then remove old one.
       

    */
    }

    const[tableRows, setTableRows]=useState();

    useEffect(() => {
        fetchShipments();
      }, []);

      async function fetchShipments(){
        const apiData = await API.graphql({ 
            query: getOrder,
            variables: {id: searchparams}
        });
        console.log("Here's what the query returned: "+JSON.stringify(apiData));
        const ordersFromAPI = apiData.data.items; //Not sure if this is the right format, need actual data to see
        //const packingListFromOrder = ordersFromAPI.packingList;
        var packingListFromOrder = {
            packingList:[
                {
                    species: "MONARCH",
                    numReceived: 20,
                    emergedInTransit: 0,
                    damagedInTransit: 0,
                    diseased: 1,
                    parasites: 2,
                    poorEmerged: 4,
                    numEmerged: 0,
                    ID: 14
                  },{
                    species: "NOT MONARCH",
                    numReceived: 20,
                    emergedInTransit: 20,
                    damagedInTransit: 12,
                    diseased: 1,
                    parasites: 2,
                    poorEmerged: 4,
                    numEmerged: 17,
                    ID: 15
                  }
            ]
        }

        var data = packingListFromOrder.packingList.map(element =>{
            return(
              <tr>
                <td>{element.species}</td>
                <td>{element.numReceived}</td>
                <td>{element.emergedInTransit}</td>
                <td>{element.damagedInTransit}</td>
                <td>{element.diseased}</td>
                <td>{element.parasites}</td>
                <td> <button onClick={handleEdit.bind(this, element.ID)}> Edit </button></td>
               
              </tr>
            )
          })
          setTableRows(data)

      }
    //TODO: 
   /*
   Three things to do:
   Load Shipment data similar to display shipment page with edit button
   Create Form for when edit button is pushed and autofill with necesary information.
   Use Edit mutation to push changes to the server(will need dummy data).  No delete functionality planned as of yet
    
    */
    



    return(
        <div className="Home">
            <header > Edit Shipments </header>
            

        </div>
    )
}
export default EditShipments;