import '../styles/repositories.scss';

interface RespositoryItemProps {
  repository: {
    name: string,
    description: string,
    html_url: string
  }
}

export default function RepositoryItem( props:RespositoryItemProps ) {
  return (
    <li>
      {/* ?? caso esteja vazio/undefined/null retorno 'default' */}
      <strong>{props.repository?.name ?? 'default'}</strong>
      <p>{props.repository?.description}</p>

      <a href={props.repository?.html_url}>Acessar repositório</a>
    </li>
  );
}
