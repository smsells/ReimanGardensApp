import React  from 'react';
import './App.css';
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';
import {  Auth } from 'aws-amplify';
//import { listNotes } from './graphql/queries';
//import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { Switch, Route, BrowserRouter} from 'react-router-dom'
import NoteList from './components/NoteList';



function App() {
  

  const signOut = async () => {
    try {
      await Auth.signOut();

    } catch (error) {
      console.log('error signing out ', error);
    }

  }

  return (
    <Authenticator>
      {({ user }) => (
        <BrowserRouter>
          <div className="App">
            <h1>My Notes App</h1>

            <NoteList />

            <button variant="contained" color="primary" onClick={signOut}>Sign out</button>

          </div>
        </BrowserRouter>
      )}
    </Authenticator>



  );
}

export default App;
