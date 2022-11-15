import React, { useState, useEffect } from "react";
import { Form, Navigate, useSearchParams } from "react-router-dom";
import { a, API } from "aws-amplify";
import { getOrder, listOrderItems } from "../../graphql/queries";
//import { Storage} from 'aws-amplify';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateOrderItem } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const PackingList = () => {
  //Doing something similar to before except with the PackingList Object
  const [searchparams] = useSearchParams();
  console.log(searchparams.get("id") + " in packingList");
  const [shipments, setShipments] = useState([[]]); //not sure I need the typing thing
  //Idea is that it will be an array of objects to populate a 2d array
  //Will need Query Schema for all of this

  //const initialFormState = { /* Object to hold how much info we need for each form*/  }

  //const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState();
  const [showForm, setShowForm]= useState(false);
  const[defaultSpecies, setDefaultSpecies] = useState();
  const[defaultNumReceived, setDefaultNumReceived] = useState();

  const[defaultEmTransit, setDefaultEmTransit] = useState();
  const[defaultDamTransit, setDefaultDamTransit] = useState();
  const[defaultDiseased, setDefaultDiseased] = useState();
  const[defaultParasites, setDefaultParasites] = useState();
  const [defaultID, setDefaultID] = useState();



  useEffect(() => {
    fetchShipments();
  }, []);

  async function handleSubmit(){
    console.log("In handle Submit");
    var diseasedInternal = document.getElementById("diseased").value;
    var speciesInternal = document.getElementById("species").value;
    var numEmergedInternal = document.getElementById("emTransit").value; 
    var numDamagedInternal= document.getElementById("damTransit").value;
    var parasitesInternal= document.getElementById("parasites").value;
    var numReceivedInternal= document.getElementById("numReceived").value;
    /*
    species: String
    numReceived: Int
    emergedInTransit: Int
    damagedInTransit: Int
    diseased: Int
    parasites: Int
    poorEmerged: Int
    numEmerged: Int
    orgID: String
    orderID: String
    */
    await API.graphql({
      query: updateOrderItem,
      variables: {
        input: {
          id: defaultID,
          species: speciesInternal,
          numReceived: numReceivedInternal,
          emergedInTransit: numEmergedInternal,
          damagedInTransit: numDamagedInternal,
          diseased: diseasedInternal,
          parasites: parasitesInternal,

        },
      },
    });
    console.log("after query in handleSubmit");
    navigate(0);

    

  }
  function handleEdit( id, species, numReceived, emergedInTransit, damagedInTransit, diseased, parasites){


 
    setShowForm(current=>!current);
    setDefaultSpecies(species);
    setDefaultDamTransit(damagedInTransit);
    setDefaultEmTransit(emergedInTransit);
    setDefaultParasites(parasites);
    setDefaultDiseased(diseased);
    setDefaultNumReceived(numReceived);
    setDefaultID(id);
    console.log("ID from handle Edit: "+id);
    
   

  }
  async function fetchShipments() {
   
    let filter = {
      orderID: {eq: searchparams.get("id")},
    }
    const apiData = await API.graphql({
      query: listOrderItems,
      variables: { filter: filter},
    });
    //check what theyre called lol
    console.log("id query data: " + JSON.stringify(apiData));

    const packingListFromAPI = apiData.data.listOrderItems.items;
    
    console.log("packing list query: " + JSON.stringify(packingListFromAPI));
    //There should be only 1 organization so

    //or shipmentsFromAPI = organizationsFromAPI[0].Shipments;
    var data = packingListFromAPI.map((element) => {
      return (
        <tr>
          <td>{element.species}</td>
          <td>{element.numReceived}</td>
          <td>{element.emergedInTransit}</td>
          <td>{element.damagedInTransit}</td>
          <td>{element.diseased}</td>
          <td>{element.parasites}</td>
          <td> <button  onClick={handleEdit.bind(this,element.id,element.species, element.numReceived, element.emergedInTransit, element.damagedInTransit, element.diseased, element.parasites)}> Edit </button></td>
        </tr>
      );
    });
    setTableRows(data);
    /*
        Not sure if this will work because the table is nested but
              Ideas:
              Button with the ID of the shipment on the inside to take you to another page where the order items are iterated in a similar way to this page
              For loop to iterate over all the 
        */
  }

  return (
    //Holder for the information
    <div className="DisplayShipments">
      <Table hover>
        <thead>
          <tr>
            <th> Species</th>
            <th>Number Received</th>
            <th>Emerged in Transit</th>
            <th>Damaged in Transit</th>
            <th>Diseased </th>

            <th>Parasites</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
      {showForm &&<><div>
        <form>
          Edit
          <div>
            <label htmlFor="species">Species</label>
          <input type="text" name="species" id="species" defaultValue={defaultSpecies}></input>
          <br></br>
          <label htmlFor="numReceived">Number Received</label>
          <input type="text" name="numReceived" id="numReceived" defaultValue={defaultNumReceived}></input>
          <br></br>
          <label htmlFor="emTransit">Emerged In Transit</label>
          <input type="text" name="emTransit" id="emTransit" defaultValue={defaultEmTransit}></input>
          <br></br>
          <label htmlFor="damTransit">Damaged In Transit</label>
          <input type="text" name="damTransit" id="damTransit" defaultValue={defaultDamTransit}></input>
          <br></br>
          <label htmlFor="diseased">Diseased</label>
          <input type="text" name="diseased" id="diseased" defaultValue={defaultDiseased}></input>
          <br></br>
          <label htmlFor="parasites">Parasites</label>
          <input type="text" name="parasites" id="parasites" defaultValue={defaultParasites}></input>

          </div>
        </form>
        
        <button onClick={handleSubmit} >Submit</button>
        </div>
        </>}
    </div>
  );
};
//TODO edit orderItem with submit
export default PackingList;
