import React, { Component } from "react";
import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

export default class NavbarComponent extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand href="#home">SENADORES ATIVOS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchHandler}/>
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </div>
        </Navbar>
      </Container>
    )
  }
}

