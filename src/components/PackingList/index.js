import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import { API } from 'aws-amplify';
import { getOrder } from '../../graphql/queries';
//import { Storage} from 'aws-amplify';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate, createSearchParams, Link} from 'react-router-dom';


const PackingList = () =>{
    //Doing something similar to before except with the PackingList Object
    const[searchparams]=useSearchParams();
    console.log(searchparams.get("id")+" in packingList");
    const [shipments, setShipments] = useState([[]]); //not sure I need the typing thing
    //Idea is that it will be an array of objects to populate a 2d array
    //Will need Query Schema for all of this

    //const initialFormState = { /* Object to hold how much info we need for each form*/  }

    //const [formData, setFormData] = useState(initialFormState);
    const tableRows=null;

    useEffect(() => {
        fetchShipments();
      }, []);

    async function fetchShipments() {
        const apiData = await API.graphql({
             query: getOrder,
             variables: {id: searchparams.get("id") }
            });
        //check what theyre called lol
        const packingListFromAPI = apiData.PackingList;
        //There should be only 1 organization so 
        
        //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;

         tableRows = packingListFromAPI.map(element =>{
          return(
            <tr>
              <td>{element.species}</td>
              <td>{element.numReceived}</td>
              <td>{element.emergedInTransit}</td>
              <td>{element.damagedInTransit}</td>
              <td>{element.diseased}</td>
              <td>{element.parasites}</td>
             
            </tr>
          )
        })
        /*
        Not sure if this will work because the table is nested but
              Ideas:
              Button with the ID of the shipment on the inside to take you to another page where the order items are iterated in a similar way to this page
              For loop to iterate over all the 
        */
        
      }
      

     

    



      

      return(
        //Holder for the information
        <div className='DisplayShipments'>
         <Table hover>
            <thead>
              <tr>    
                <th> Species</th>
                <th>Number Received</th>
                <th>Emerged in Transit</th>
                <th>Damaged in Transit</th>
                <th>Diseased </th>
                 
                <th>Parasites</th>
                
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>  
          


        </div>

      )
    
}
export default PackingList;