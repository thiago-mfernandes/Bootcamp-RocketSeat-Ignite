import RepositoryItem from "./RespositoryItem";
import { useEffect, useState } from 'react';

interface Repository {
  name: string,
  description: string,
  html_url: string,
}

// https://api.github.com/orgs/rocketseat/repos

export default function RespositoryList() {

  //vou receber uma lista
  const [repositories, setRepositories] = useState<Repository[]>([]);

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
        {
          repositories.map(repository => {
            return <RepositoryItem key={repository.name} repository={repository} />
          })
        }
      </ul>
    </section>
  )
}