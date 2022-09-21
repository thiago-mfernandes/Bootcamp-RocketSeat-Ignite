export default function RepositoryItem(props) {
  return (
    <li>
      {/* ?? caso esteja vazio/undefined/null retorno 'default' */}
      <strong>{props.repository?.name ?? 'default'}</strong>
      <p>{props.repository?.description}</p>

      <a href={props.repository?.link}>Acessar repositório</a>
    </li>
  );
}
