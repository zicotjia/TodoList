import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Header(props) {
  const now = new Date().toLocaleTimeString();

  const [time, setTime] = useState(now);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }
  setInterval(updateTime, 1000);

  function updateCat(event) {
    props.setCategory(event);
  }

  return (
    <div>
      <Navbar className="nav" expand="lg">
        <Container>
          <Navbar.Brand href="#home">To-Do List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={() => updateCat("All")}>
                All
              </Nav.Link>
              {props.categorylist.map((obj, index) => {
                if (index <= 1) {
                  return (
                    <Nav.Link
                      key={index}
                      onClick={() => updateCat(obj.Category)}
                    >
                      {obj.Category}
                    </Nav.Link>
                  );
                }
                return null;
              })}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {props.categorylist.map((obj, index) => {
                  if (index > 1) {
                    return (
                      <NavDropdown.Item key={index}>
                        {obj.Category}
                      </NavDropdown.Item>
                    );
                  }
                  return null;
                })}
                <NavDropdown.Divider />
                <NavDropdown.Item>Add Category</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <div className="time">{time}</div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
