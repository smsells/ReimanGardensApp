import { React, useState } from "react";
import { Auth, API } from "aws-amplify";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from "../AdminButton/AdminButton";
import AddButterfly from "../AddButterfly/AddButterfly";
import DisplayShipments from "../DisplayShipments";
import {
  createOrganization as createOrgMutation,
  deleteOrganization as deleteOrgMutation,
} from "../../graphql/mutations";

// import Grid from '@mui/material/Grid';

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/");
    //window.location.reload(false);
    onSignIn();
  }
  function pullUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then((user) => {
        console.log("User ", user);
        console.log("User Pool", user.pool);
        if (user.pool.userPoolId == "us-east-2_tyNlmQmJu") {
          console.log("success");
          API.graphql({
            query: createOrgMutation,
            variables: { input: user.username },
          });
          //can redirect in here
        }
      })
      .catch((err) => console.log(err));
  }

  // function testOnload(){
  //     console.log("Hey I loaded");
  // }

  return (
    <Authenticator>
      <div
        className="SignIn"
        slot="sign-in"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage:
            "url(https://www.reimangardens.com/wp-content/uploads/2018/01/53-Reiman-Gardens-Entrance-summer.jpg)",
          backgroundSize: "cover",
          maxHeight: "height",
          maxWidth: "width",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            gap: "5%",
            backgroundColor: "rgba(222, 184, 135, 0.5)",
            padding: "10px",
            gridAutoColumns: "30%",
          }}
        >
          <div style={{ gridArea: "2 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/displayShipments"}>
                <AdminButton>View Shipments</AdminButton>
              </Link>
              <Link to={"/"}>
                <AdminButton>Add Shipment</AdminButton>
              </Link>
              <Link to={"/importExportShipments"}>
                <AdminButton>Import/Export Shipments</AdminButton>
              </Link>
            </div>
          </div>
          <div style={{ gridArea: "3 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <Link to={"/addButterfly"}>
                <AdminButton>Add Butterfly</AdminButton>
              </Link>
              <Link to={"/editButterfly"}>
                <AdminButton>Edit Butterfly</AdminButton>
              </Link>
              <Link to={"/notes"}>
                <AdminButton>Add/Edit Notes</AdminButton>
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "-ms-inline-grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>
      </div>
    </Authenticator>
  );
};

export default SignIn;

/*
const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
     const navigate = useNavigate();

    const signIn = async () => {
        try{
            const awaitingUser = await Auth.signIn(user, pass);
            navigate('/');
            onSignIn();


        } catch(error){
            console.log(error);

        }
    }


<input
                onChange={e => setUser(e.target.value )}
                placeholder="Username"

              />
              <input
                onChange={e => setPass(e.target.value )}
                placeholder="Pass"

              />
            <button  onClick={signIn}>Sign in</button>
*/
//might be easiest to just have a navigation page kinda thing after sign in and the normal page just loads the reiman gardens thing
//Navigating from the navbar to home currently doesn't auto refresh the page so the signout button switch is broken.
