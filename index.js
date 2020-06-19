import React, { useState } from 'react';
import axios from 'axios'
import * as S from './styled'
import { useHistory } from 'react-router-dom';


export default function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    
    .then(response => {
      console.log(response.data);
      const repositories = response.data;
      const repositoriesName = [];

      repositories.map((repositoriy) => {
        return repositoriesName.push(repositoriy.name); //tava faltando um return aqui
        history.push('/repositories'); //pega os dados do repositorio
      })
      
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false)
      history.push('./repositories');
    })

    .catch(err => {
      setErro(true);
    })
  }

  return (
    <S.HomeContainer>
      {/* Essa linha tem que estar fora do content para que ele consiga colocar a div em column */}
       <S.Title> Busca Github </S.Title> 

      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value = {usuario} onChange = {e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick = {handlePesquisa}>Pesquisar</S.Button>
      </S.Content>

      { erro ? <S.ErrorMsg>Erro!</S.ErrorMsg> : '' }
    </S.HomeContainer>
  );
}