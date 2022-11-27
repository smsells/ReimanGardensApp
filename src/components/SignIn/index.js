import { React, useState } from "react";
import { Auth, API } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from "../AdminButton/AdminButton";
import { Storage } from "aws-amplify";
import { createOrganization as createOrganizationMutation } from "../../graphql/mutations";
import { getOrganization } from "../../graphql/queries";
import crypto from "crypto-js";

// import Grid from '@mui/material/Grid';

const SignIn = () => {
  const navigate = useNavigate();
  const orgId = localStorage.getItem("token");

  const initialOrganizationState = {
    name: "",
    url: "",
    locationAddress: "",
    locationZipCode: "",
    locationCity: "",
    locationState: "",
    locationCountry: "",
    headerColor: "",
    sectionHeaderColor: "",
    menuColor: "",
    linkFontColor: "",
    adminIconColor: "",
    homepageBackground: "",
    font: "",
    logo: "",
    coverMedia: "",
    deleted: false,
    suspended: false,
  };

  const [organization, setOrganization] = useState(initialOrganizationState);
  const [images, setImages] = useState({});

  function navigateHome() {
    navigate("/");
    //window.location.reload(false);
    // onSignIn();
  }
  // function pullUser() {
  //   Auth.currentAuthenticatedUser({
  //     bypassCache: false,
  //   })
  //     .then((user) => {
  //       console.log("User ", user);
  //       console.log("User Pool", user.pool);
  //       if (user.pool.userPoolId === "us-east-2_tyNlmQmJu") {
  //         console.log("success");
  //         API.graphql({
  //           query: createOrgMutation,
  //           variables: { input: user.username },
  //         });
  //         //can redirect in here
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  function load() {
    const orgID = localStorage.getItem("token");
    if (!orgID) {
      console.log("Sign in load check");
      navigate(0);
    }
  }

  const logIN = () => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        console.log("user email", user.username);
        let out = false;
        const userName = user.username;
        const sha512Hash = crypto.SHA512(userName).toString();
        console.log("result1: ", userName);

        const res = await API.graphql({
          query: getOrganization,
          variables: { id: sha512Hash },
        });
        console.log("try", res.data.getOrganization);
        if (res.data.getOrganization === null) {
          const cat = await API.graphql({
            query: createOrganizationMutation,
            variables: {
              input: {
                id: sha512Hash,
                username: userName,
                deleted: false,
                suspended: false,
              },
            },
          });
          // if (cat === null) {

          // }
          console.log("catch", cat);
        } else {
          if (
            res.data.getOrganization.deleted ||
            res.data.getOrganization.suspended
          ) {
            out = true;
            signOut();
          }
        }
        if (!out) {
          localStorage.setItem("token", sha512Hash);
          console.log("done");
          out = false;
          navigate("/adminPanel");
        }
      })
      .catch(() => {});
  };

  async function getOrg() {
    const org = await API.graphql({
      query: getOrganization,
      variables: { id: orgId },
    });

    if (org.data.getOrganization.logo) {
      const image = await Storage.get(org.data.getOrganization.logo);
      setImages({ ...images, logo: image });
    }
    if (org.data.getOrganization.coverMedia) {
      const image = await Storage.get(org.data.getOrganization.coverMedia);
      setImages({ ...images, coverMedia: image });
    }

    setOrganization({
      name: org.data.getOrganization.name,
      locationAddress: org.data.getOrganization.locationAddress,
      locationZipCode: org.data.getOrganization.locationZipCode,
      locationCity: org.data.getOrganization.locationCity,
      locationState: org.data.getOrganization.locationState,
      locationCountry: org.data.getOrganization.locationCountry,
      headerColor: org.data.getOrganization.headerColor,
      sectionHeaderColor: org.data.getOrganization.sectionHeaderColor,
      menuColor: org.data.getOrganization.menuColor,
      linkFontColor: org.data.getOrganization.linkFontColor,
      adminIconColor: org.data.getOrganization.adminIconColor,
      homepageBackground: org.data.getOrganization.homepageBackground,
      font: org.data.getOrganization.font,
      logo: org.data.getOrganization.logo,
      coverMedia: org.data.getOrganization.coverMedia,
      deleted: org.data.getOrganization.deleted,
      suspended: org.data.getOrganization.suspended,
    });
  }

  async function signOut() {
    console.log("in the signoutFunction");
    localStorage.removeItem("token");
    try {
      await Auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.log("error signing out " + error);
    }
    navigate(0);
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
          <div style={{ gridArea: "3 / 1 / span 1 / span 3" }}>
            <div className="grid-item">
              <button onClick={() => logIN()} className="admin-button">
                Admin Panel
              </button>
              <button onClick={() => signOut()} className="admin-button">
                Sign Out
              </button>
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
