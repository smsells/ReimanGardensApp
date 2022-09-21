import {React, useState}  from 'react';

import {  Auth } from 'aws-amplify';
import {useNavigate} from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import "../../css/Sign-In/sign-in.css";
const SignIn = () => {
    const navigate = useNavigate();


    function pullUserAndNavigate(){
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user=> console.log(user)).catch(err=> console.log(err));
        navigate('/');
        window.location.reload(false);

    }

   

   

    return (
    <Authenticator>
        
        <div className = 'signin'>
            

            <button onClick={pullUserAndNavigate}>Return Home</button>
          

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