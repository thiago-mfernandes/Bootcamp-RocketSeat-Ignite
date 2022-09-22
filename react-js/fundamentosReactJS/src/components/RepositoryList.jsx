import RepositoryItem from "./RespositoryItem";
import { useEffect, useState } from 'react';

const repository = {
  name: 'unform',
  description: 'Forms in React' ,
  link: 'https://github.com/unform/unform'
}

// https://api.github.com/orgs/rocketseat/repos

export default function RespositoryList() {

  //vou receber uma lista
  const [repositories, setRepositories] = useState([]);

  {/**
    A minha variavel repositories vai ser renderizada em tela sem o preenchimento dos dados pela primeira vez, e ateh que a chamada traga um retorno, estara vazia. Por isso, repositories sofrerá alteracao apos a primeira renderizacao, e por isso o uso do useEffect
  */}

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
     .then(response => response.json())
     .then(data => setRepositories(data))
  }, []);

  return (
    <section className='respository-list'>
      <h1>Lista de respositórios</h1>

      <ul>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
      </ul>
    </section>
  )
}