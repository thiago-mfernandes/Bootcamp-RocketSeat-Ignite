## Conceitos Iniciais

- get - eitura
- post - criação
- put - atualização
- delete - deleção
- patch - atualização parcial (atualizar um avatar)

http codes

1xx: informativo - a solicitacao foi aceita ou continua em andamento

2xx: confirmacao
  200: requisicao bem sucedida
  201: created - usado no post apos insercao

3xx: redirecionamento
  301: moed permanently
  302: moved

4xx: erro do cliente
  400: bad request
  401: unauthorized
  403: forbidde
  404: nt found
  422: unprocessable entity

5xx: erro de servidor
  500 - internal server error
  502 - bad gateway


--header params

authority: app.rocketseat.com.br
method: get
path: /api/journey-nodes
scheme: https
referer: https://app.rocketseat.com.br/node/

--query params

parametros inseridos no final da url com uma chave=valor e &-separador de chaves

http://enderecoservidor.com.br/v1/users?page=2&limit=50

--route params
hhtp://enderecoservidor.com.br/v1/users/{id}


--body params
{
  "name": "Daniele",
  "username": "dani"
}

## CONFIGURAÇÃO INICIAL

rodar: `yarn init -y`
rodar: `yarn add express`