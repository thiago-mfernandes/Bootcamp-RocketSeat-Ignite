import RepositoryItem from "./RespositoryItem";

const repository = {
  name: 'unform',
  description: 'Forms in React' ,
  link: 'https://github.com/unform/unform'
}


export default function RespositoryList() {
  return (
    <section className='respository-list'>
      <h1>Lista de respositórios</h1>

      <ul>
        <RepositoryItem repository={repository}/>
        <RepositoryItem/>
        <RepositoryItem/>
        <RepositoryItem/>
      </ul>
    </section>
  )
}