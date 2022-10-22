import React, { useState, useEffect } from 'react';
import '../../App.css';
import { API, JS } from 'aws-amplify';
import { listOrganizations } from '../../graphql/queries';
//import { Storage} from 'aws-amplify';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate, createSearchParams, Link} from 'react-router-dom';
//import { createShipment as createShipmentMutation } from '../../graphql/mutations';

const DisplayShipments = () =>{

const navigate = useNavigate();
  function handleEdit(id, e){
    console.log(id);
    navigate({
      pathname: "/editShipment",
      search: createSearchParams({
        id: id
      }).toString()

    });
   

  }

   function handlePackingList(id, e){
    console.log(id);
    navigate({
      pathname: "/packingList",
      search: createSearchParams({
        id: id
      }).toString()

    });

   

  }

   
    //Idea is that it will be an array of objects to populate a 2d array
    //Will need Query Schema for all of this

    //const initialFormState = { /* Object to hold how much info we need for each form*/  }

    //const [formData, setFormData] = useState(initialFormState);
    const[tableRows, setTableRows]=useState();

    useEffect(() => {
        fetchShipments();
      }, []);


      
    async function fetchShipments() {
        
        const apiData = await API.graphql({ query: listOrganizations });
        //check what theyre called lol
        //console.log("Here's what the query returned: "+apiData);
        if(apiData==null){
          console.log("its null");
        }
        const organizationsFromAPI = apiData.data.listOrganizations.items;
        //console.log("To String?: "+JSON.stringify(organizationsFromAPI));
        //There should be only 1 organization so 
        //const shipmentsFromAPI = organizationsFromAPI.Shipments;
        const shipmentsFromAPI = {
          shipments: [
            { orderNumber: "1",
            shipmentDate: "1/1/2022",
            arrivalDate: "1/1/2022",
            supplier: "Butterfly Inc",
            ID: "12"
          }
          ]
         

        }
        //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;

         var data = shipmentsFromAPI.shipments.map(element =>{
          return(
            <tr>
              <td>{element.orderNumber}</td>
              <td>{element.shipmentDate}</td>
              <td>{element.arrivalDate}</td>
              <td>{element.supplier}</td>
              <td> <button onClick={handleEdit.bind(this, element.ID)}> Edit </button></td>
              <td> <button  onClick={handlePackingList.bind(this,element.ID)}> Packing List </button></td>
            </tr>
          )
        })
        
        setTableRows(data);
        
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
          


        </div>

      )





}
export default DisplayShipments;