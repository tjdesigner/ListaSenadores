import React, { Component } from "react";
import api from "../../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

export default class Main extends Component {
state = { 
  senadores: [],
  codParlamentar:[],
}

  componentDidMount() {
    this.loadSenadores();
  }

  loadSenadores = async () => {
    const response = await api.get('/lista/atual.json')
    this.setState({senadores: response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar})
    console.log(response.data.ListaParlamentarEmExercicio.Parlamentares);
    this.setState({codParlamentar: response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(res =>{
      this.codParlamentar = res.IdentificacaoParlamentar.CodigoParlamentar;
      console.log(this.codParlamentar);
        const response = api.get(`/${this.codParlamentar}/comissoes.json`);
        response.then((value) => {
          let cod = value.data.MembroComissaoParlamentar;
          console.log(cod);
        })
    })})
  }

  render() {
    return (
      <>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
      </Navbar>
      <Container>
        <p>listaSenadores: {this.state.senadores.length} </p>
        <Row className="justify-content-md-center">
          {this.state.senadores.map(senador =>(
            <article key={senador.IdentificacaoParlamentar.CodigoParlamentar}>
              <ul>
                <li>
                  <strong>
                    Nome: {senador.IdentificacaoParlamentar.NomeCompletoParlamentar}
                  </strong>
                </li>
                <li>
                    UF: {senador.IdentificacaoParlamentar.UfParlamentar}
                </li>
                <li>
                    Partido: {senador.IdentificacaoParlamentar.SiglaPartidoParlamentar}
                </li>
                <li>
                  <img src={senador.IdentificacaoParlamentar.UrlFotoParlamentar}/>
                </li>
                <li>
                  Membro da mesa: {senador.IdentificacaoParlamentar.MembroMesa}
                </li>
                <li>
                  Membro da Liderança: {senador.IdentificacaoParlamentar.MembroLideranca}
                </li>
                <li>
                  Página Parlamentar:
                    <a href={senador.IdentificacaoParlamentar.UrlPaginaParlamentar}>
                      {senador.IdentificacaoParlamentar.UrlPaginaParlamentar}
                    </a>
                </li>
                <li>
                  
                </li>
              </ul>

            </article>
          ))}
        </Row>
      </Container>
      </>
    )
  }
}