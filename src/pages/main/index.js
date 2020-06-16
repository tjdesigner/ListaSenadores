import React, { Component, useState, useEffect } from "react";
import api from "../../services/api";
//import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import NavbarComponent from './../../components/Navbar';
import "./styles.css";

const Main = () => {

  const [senadores, setSenadores] = useState([]);
  const [codParlamentar, setCodParlamentar] = useState([]);
  const [loading, setLoading] = useState(false);
  const getListData = async () => {
    try {
      const response = await api.get('/lista/atual.json')
      setSenadores(response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(ident =>
        ident=ident.IdentificacaoParlamentar));
      setCodParlamentar(response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(cod =>
        cod=cod.IdentificacaoParlamentar.CodigoParlamentar
      ));
    } catch (e) {
      console.log(e);
    }
  };
  console.log(senadores, codParlamentar);
  

  const columns = [
    {dataField: "NomeCompletoParlamentar", text: "Nome do Parlamentar"},
    {dataField: "CodigoParlamentar", text: "Código do Parlamentar"},
    {dataField: "SiglaPartidoParlamentar", text: "Partido"},
    {dataField: "UfParlamentar", text: "UF do Parlamentar"},
  ]
  
  useEffect(() => {
    getListData();
  }, [])

  return (
    <>
    <NavbarComponent/>
    <div className="container">

      {
      senadores !== [''] ? (
        <BootstrapTable
        keyField="NomeParlamentar"
        data={senadores}
        columns={columns}
        pagination={paginationFactory()}
        bootstrap4
      />
      ) : (
        <h1>Tiago</h1>
      )
    }
    </div>
    </>
  )
}

export default  Main