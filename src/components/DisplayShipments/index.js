import React, { useState, useEffect } from 'react';
import '../../App.css';
import { API } from 'aws-amplify';
import { shipments } from '../../graphql/queries';
import { Storage} from 'aws-amplify';
import { createShipent as createShipmentMutation } from '../../graphql/mutations';

const DisplayShipments = () =>{

    const [shipments, setShipments] = useState([[]]); //not sure I need the typing thing
    //Idea is that it will be an array of objects to populate a 2d array
    //Will need Query Schema for all of this

    const initialFormState = { /* Object to hold how much info we need for each form*/  }

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchShipments();
      }, []);

    async function fetchShipments() {
        const apiData = await API.graphql({ query: shipmentData });
        const shipmentsFromAPI = apiData.data.shipments.items;
        /*
        {
            Map the objects to a 2D Array to be loaded into the DOM
        }
        */
        setShipments(apiData.data.listNotes.items);
      }

      async function createNote() {
        if (/** check to make sure that all the data is filled out */) return;
        await API.graphql({ query: createShipmentMutation, variables: { input: formData } });
        
        setNotes([...shipments, formData]);
        setFormData(initialFormState);
      }

      async function editShipment(){
        const editFormData; //Data entered once edit option is picked
        await API.graphql({ query: createShipmentMutation, variables: { input: formData } });
        setNotes([...shipments, formData]);
        setFormData(initialFormState);
        const newShipments = shipments.filter(shipment => shipment.id !== id);
        setNotes(newShipments);
        await API.graphql({ query: deleteShipmentMutation, variables: { input: { id } } });
        //Add new one then remove old one.
       




      }

      async function deleteShipments(){
        const newShipments = shipments.filter(shipment => shipment.id !== id);
        setNotes(newShipments);
        await API.graphql({ query: deleteShipmentMutation, variables: { input: { id } } });

      }

      return(
        //Holder for the information
        <div>

        </div>

      )





}
export default DisplayShipments;