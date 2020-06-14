import React, { Component } from "react";
import api from "../../services/api";

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
        const response = api.get(`/${this.codParlamentar}/comissoes.json`);
        response.then((value) => {
          let cod = value.data.MembroComissaoParlamentar;
          console.log(cod, this.codParlamentar);
        })
    })})
  }

  render() {
    return (
      <>
        <article>
        <p>listaSenadores: {this.state.senadores.length} </p>
        <div className="senadores">
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
                  Membro da mesa: {senador.IdentificacaoParlamentar.MembroLideranca}
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
        </div>
        </article>
      </>
    )
  }
}