import {React, useState}  from 'react';

import {  Auth } from 'aws-amplify';
import {useNavigate} from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import "../../css/Sign-In/sign-in.css";
const SignIn = ({onSignIn}) => {
    const navigate = useNavigate();


    function navigateHome(){
       
        navigate('/');
        //window.location.reload(false);
        onSignIn();

    }
    function pullUser(){

        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user=> {
            console.log(user);
            console.log(user.pool);
            if(user.pool.userPoolId=="us-east-2_tyNlmQmJu"){
                 console.log("success");
                 //can redirect in here
            }
        }).catch(err=> console.log(err));
        
    }

   // function testOnload(){
   //     console.log("Hey I loaded");
   // }

   

   

    return (
    <Authenticator>
        
        <div className = 'signin'>

        <div>
             <button className='homeButton' onClick={navigateHome}>Home</button>
        </div>

            
            

            
            <button onClick={pullUser}>Who am I?</button>
          

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
//might be easiest t ojust have a navigation page kinda thing after sign in and the normal page just loads the reiman gardens thing