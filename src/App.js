import {React, useEffect, useState}  from 'react';
import './App.css';
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
//import { Authenticator, Link } from '@aws-amplify/ui-react';
import {  Auth } from 'aws-amplify';
//import { listNotes } from './graphql/queries';
//import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { Routes, Route, BrowserRouter, Link} from 'react-router-dom'
import NoteList from './components/NoteList';
import SignIn from './components/SignIn';
import Home from './components/Home';
import {useNavigate} from 'react-router-dom';





function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

    useEffect(()=>{
      isLoggedIn();

    }, []);

  const isLoggedIn = () => {
      Auth.currentAuthenticatedUser().then(()=> {
        setLoggedIn(true);

      }).catch( ()=>{
        setLoggedIn(false);

      });
  }
  

  const onSignIn = () => {
    setLoggedIn(true);
  }

  const signOut = async () => {
    console.log("in the signoutFunction");
    try {
      await Auth.signOut();
      setLoggedIn(false);
      //right now has to be refreshed to update 
      
      navigate('/');
      


    } catch (error) {
      console.log( "error signing out " + error);
    }

    

  }

  return (
    
      
        
          <div className="App">
            <header className= "header">
              <h1>Welcome to Reiman Gardens</h1>
             
            </header>

            <Routes>
              <Route exact path = "/" element = { <Home/ >}/>
              <Route exact path = "/signin" element = { <SignIn onSignIn={isLoggedIn} />}/>
              <Route exact path = '/notes' element = { <NoteList/ >}/>


            </Routes>
           

            

            { loggedIn ? (<button  onClick={signOut}>Sign out</button> ) : 
            ( <Link to ="/signin"><button> Sign in</button> </Link>
            )}
          

          </div>
        
      
    



  );
}

export default App;

//TODO problems
//two sign in buttons 
//Beautify the sing in page 
//Text not updating correctly with buttons I think
//Make a separate component for the home screen 
// So I think we are gunna lose out on a lot of functionality when it comes to like email verifications and the likes or at least it will be hard to reimplement.  We can either do the sign in from scratch and have more control like having a picture background and such or we can cut out a lot of work that it would take to reimplement the normal amazon sign in functionality
// I think that I can find a way to implement the dynamic rendering of that I was after with the user levels whichever we decide
//Do we even want 2step authentication?
//Also Not currently sure how to have multiple levels of users using the aws services.  Might need assistance in research.  
