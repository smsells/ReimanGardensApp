import { React, useEffect, useState } from 'react';
import './App.css';
//import { API } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
//import { Authenticator, Link } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
//import { listNotes } from './graphql/queries';
//import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import NoteList from './components/NoteList';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Parks from './components/Parks';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();

  }, []);

  const isLoggedIn = () => {
    Auth.currentAuthenticatedUser().then(() => {
      setLoggedIn(true);

    }).catch(() => {
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
      console.log("error signing out " + error);
    }



  }

  return (



    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Reiman Gardens</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as ={Link} to = {"/"}>Home</Nav.Link>
              <Nav.Link as ={Link} to = {"/notes"}>NoteList</Nav.Link>
              <Nav.Link as ={Link} to = {"/stats"}>Stats</Nav.Link>
              <Nav.Link as ={Link} to = {"/gallery"}>Gallery</Nav.Link>
              <Nav.Link as ={Link} to = {"/parks"}>Parks Around the World</Nav.Link>
              
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <header className="header">
        <h1>Welcome to Reiman Gardens</h1>

      </header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn onSignIn={isLoggedIn} />} />
        <Route exact path='/notes' element={<NoteList />} />
        <Route exact path='/stats' element={<Stats />} />
        <Route exact path='/gallery' element={<Gallery />} />
        <Route exact path='/parks' element={<Parks />} />


      </Routes>




      {loggedIn ? (<button onClick={signOut}>Sign out</button>) :
        (<Link to="/signin"><button> Sign in</button> </Link>
        )}


    </div>






  );
}

export default App;

//TODO problems
//Probs will need to send function that keeps track of current park to dynamically load all the park info 
