import axios from 'axios';

//fazendo uma instancia para setar algumas informacoes comuns:
export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})