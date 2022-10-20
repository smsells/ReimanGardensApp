import React, { useState, useEffect } from 'react';
import '../../App.css';
import { API } from 'aws-amplify';
import { listOrganizations } from '../../graphql/queries';
//import { Storage} from 'aws-amplify';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate, createSearchParams, Link} from 'react-router-dom';
//import { createShipment as createShipmentMutation } from '../../graphql/mutations';

const DisplayShipments = () =>{

const navigate = useNavigate();
  var handleEdit = (id) =>{
    console.log(id);
    navigate({
      pathname: "/editShipment",
      search: createSearchParams({
        id: id
      }).toString()

    });
   

  }

   var handlePackingList = (id) =>{
    console.log(id);
    navigate({
      pathname: "/packingList",
      search: createSearchParams({
        id: id
      }).toString()

    });

   

  }

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
        const apiData = await API.graphql({ query: listOrganizations });
        //check what theyre called lol
        const organizationsFromAPI = apiData.data.listOrganizations.items;
        //There should be only 1 organization so 
        const shipmentsFromAPI = organizationsFromAPI.Shipments;
        //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;

         tableRows = shipmentsFromAPI.map(element =>{
          return(
            <tr>
              <td>{element.orderNumber}</td>
              <td>{element.shipmentDate}</td>
              <td>{element.arrivalDate}</td>
              <td>{element.supplier}</td>
              <td> <button  onClick={ handleEdit(element.ID)}> Edit </button></td>
              <td> <button  onClick={ handlePackingList(element.ID)}> Packing List </button></td>
            </tr>
          )
        })
        /*
        Not sure if this will work because the table is nested but
              Ideas:
              Button with the ID of the shipment on the inside to take you to another page where the order items are iterated in a similar way to this page
              For loop to iterate over all the 
        */
        
        console.log(organizationsFromAPI);
      }
      

     

    



      

      return(
        //Holder for the information
        <div className='DisplayShipments'>
         <Table hover>
            <thead>
              <tr>    
                <th> Order Number</th>
                <th>Shipment Date</th>
                <th>Arrival Date</th>
                <th>Supplier</th>
                <th>Edit</th>
                 
                <th>View More</th>
                
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>  
          <button  onClick={() => handleEdit(12)}>Go To Edit </button>
          <button  onClick={() => handlePackingList(13)}> Packing List </button>


        </div>

      )





}
export default DisplayShipments;