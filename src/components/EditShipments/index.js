import React from 'react'
import {useSearchParams} from 'react-router-dom';



const EditShipments = () =>{
    const[searchparams]=useSearchParams();
    console.log(searchparams.get("id")+ " in EditShipments");
    //TODO: 
    /*
    Create form to edit the shipment 
    use below functions to update data 
    Delete option
    
    */
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

/*async function deleteShipments(){
        const newShipments = shipments.filter(shipment => shipment.id !== id);
        setNotes(newShipments);
        await API.graphql({ query: deleteShipmentMutation, variables: { input: { id } } });

      }*/

    return(
        <div className="Home">
            <header > Edit Shipments </header>
            

        </div>
    )
}
export default EditShipments;