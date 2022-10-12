import { React, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import "../../css/Sign-In/sign-in.css";
import { AdminButton } from '../AdminButton/AdminButton';

const SignIn = ({ onSignIn }) => {
    const navigate = useNavigate();


    function navigateHome() {

        navigate('/');
        //window.location.reload(false);
        onSignIn();

    }
    function pullUser() {

        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            console.log(user);
            console.log(user.pool);
            if (user.pool.userPoolId == "us-east-2_tyNlmQmJu") {
                console.log("success");
                //can redirect in here
            }
        }).catch(err => console.log(err));

    }

    // function testOnload(){
    //     console.log("Hey I loaded");
    // }





    return (
        <Authenticator>

            <div className='SignIn' slot="sign-in" style={{

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url(https://www.reimangardens.com/wp-content/uploads/2018/01/53-Reiman-Gardens-Entrance-summer.jpg)',
                backgroundSize: 'cover',
                maxHeight: 'height',
                maxWidth: 'width'}}>

                <div style={{
                    backgroundColor: 'rgba(222, 184, 135, 0.75)', 
                    height: '100%', 
                    width: '100%'
                    }}>
                        
                    <AdminButton onClick={navigateHome}>Home</AdminButton>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdminButton>View Shipments</AdminButton>
                        <AdminButton>Add Shipment</AdminButton>
                        <AdminButton>Import/Export Shipments</AdminButton>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdminButton>Add Butterfly</AdminButton>
                        <AdminButton>Edit Butterfly</AdminButton>
                        <AdminButton>Add/Edit Notes</AdminButton>
                    </div>
                </div>
            </div>

        </Authenticator>

    );
}

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