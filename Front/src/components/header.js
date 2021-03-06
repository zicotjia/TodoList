import axios from "axios";
import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Header(props) {
  var url = "https://murmuring-earth-95812.herokuapp.com/";

  const [addcat, setAddCat] = useState(false);
  const [del, setDel] = useState(false);

  //for in app clock
  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    props.setTime(newTime);
  }

  //for in app date
  function updateDate() {
    const newDate = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    props.setDate(newDate);
  }
  setInterval(updateTime, 1000);
  setInterval(updateDate, 1000);

  function updateCat(event) {
    props.setCategory(event);
  }

  //initiate add mode but for category
  function initadd(event) {
    setAddCat(!addcat);
    event.stopPropagation();
  }

  async function addCat(event) {
    var newcat = {
      category: event.target[0].value.toUpperCase(),
    };

    await axios
      .post(url + "categories/entry", newcat, {
        header: { "content-type/json": "application/json" },
      })
      .then(props.setCategory(props.categorylist.push(newcat)));
    //immediately update category list
  }

  function initdel(event) {
    setDel(!del);
    event.stopPropagation();
  }

  async function handleDel(event) {
    await axios.delete(url + "categories/delete/" + event, {
      mode: "cors",
    });

    props.setCategoryList(
      props.categorylist.filter((obj) => obj.Category !== event)
    );

    props.setDel(false);
  }

  return (
    <div>
      <Navbar className="nav" expand="lg">
        <Container>
          <Navbar.Brand href="#home">To-Do List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={() => updateCat("ALL")}>
                ALL
              </Nav.Link>
              <Nav.Link href="#home" onClick={() => updateCat("COMPLETED")}>
                COMPLETED
              </Nav.Link>
              <Nav.Link href="#home" onClick={() => updateCat("IMPORTANT")}>
                IMPORTANT
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {props.categorylist.map((obj, index) => {
                  return (
                    <NavDropdown.Item
                      id="drop"
                      key={index}
                      onClick={
                        del
                          ? () => handleDel(obj.Category)
                          : () => updateCat(obj.Category)
                      }
                      className={del && "dropdown-item2"}
                    >
                      {obj.Category}
                    </NavDropdown.Item>
                  );
                })}
                <NavDropdown.Divider />
                {!del && (
                  <NavDropdown.Item onClick={initadd} id="addcat">
                    Add Category
                  </NavDropdown.Item>
                )}
                {!addcat && (
                  <NavDropdown.Item onClick={initdel} id="delcat">
                    Delete Category
                  </NavDropdown.Item>
                )}
                {addcat && (
                  <div>
                    <NavDropdown.Divider />
                    <NavDropdown.Item id="drop">
                      <form onSubmit={addCat} className="addcat">
                        <input
                          type="text"
                          onClick="stopPropagation()"
                          placeholder="New Category"
                        />
                        <input
                          className="input2"
                          type="submit"
                          value="Submit"
                          onClick="stopPropagation()"
                        />
                      </form>
                    </NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <div>
            <h5>{props.date}</h5>
            <h5>{props.time}</h5>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
