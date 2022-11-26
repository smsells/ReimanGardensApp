import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { stack as Menu } from "react-burger-menu";
import { Routes, Route, Link } from "react-router-dom";

export default function AppHeader({ menuProp, organizationProp, imagesProp }) {
  return (
    <>
      <div
        className="App"
        style={{ backgroundColor: "#BC6C25", height: "100%", width: "100%" }}
      >
        {menuProp}
        <Navbar
          style={{ backgroundColor: organizationProp.headerColor || "#2C678E" }}
          expand="lg"
        >
          <Container>
            <Navbar.Brand href="#home" style={{ color: "#FEFAE0" }}>
              {imagesProp.logo && <img src={imagesProp.logo} />}
            </Navbar.Brand>
          </Container>
        </Navbar>

        <header
          className="header"
          style={{
            backgroundColor: organizationProp.sectionHeaderColor || "#2C678E",
            fontSize: organizationProp.font + "px" || "50px",
          }}
        >
          <h1>Welcome to {organizationProp.name || "Reiman Garden"}</h1>
        </header>
      </div>
    </>
  );
}
