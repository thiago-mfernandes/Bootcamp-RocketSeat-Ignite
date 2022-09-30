## Estrutura Inicial
 
- [x] Inicializar o projeto com o package.json com o comando `npm init -y`
- [x] Aqui ficam as dependencias do projeto, as bibliotecas necessárias
- [x] instalar o react com `npm install react`
- [x] instalar o react com `npm install react-dom`
- [x] criar uma pasta /src onde fica todo codigo da aplicacao
- [x] criar uma pasta public onde ficam oas assets e arquivos publicos

## Babel

- Serve para converter o codigo para que todos os browsers entendam nosso codigo

- [x] - instalar `yarn add @babel/core @babel/cli @babel/preset-env -D`
babel/core é o Babel em si, Babel cli é p/ executar o babel via linha de comando e Babel/preset-env que identifica o ambiente que minha aplicacao esta sendo executada - Browser - Node -
- [x] - instalar `yarn add babel-loader -D`
- [x] - criar um arquivo babel.config.js
- []x - incluir: 
`module.exports = { presets: [ '@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }] ] }`
- [x] - depois que os arquivo forem criados (react, html) possoexecutar o babel pra que ele converta o arquivo usando o comando `yarn babel src/index.js --out-file dist/bundle.js` A flag out-file eh pra onde sera gerada a saida com o arquivo, no caso, a pasta dist


## WebPack

- [x] - instalar `yarn add webpack webpack-cli webpack-dev-server -D`
- [x] - criar um arquivo webpack.config.js
para nao ter que modificar o nome do arquivo no index.html, na tag script, usar esse plugin:
- [x] - `yarn add html-webpack-plugin -D`
- [x] - executar: `yarn webpack serve`
- [x] - instalar: `yarn add cross-env -D` serve para criar variaveis de ambiente independente do Sistema Operacional
- [x] - inserir no package.json: 

"scripts": {
    "dev": "webpack serve",
    "build": "cros-env NODE_ENV=production webpack"
},

- [x] - instalar: `yarn add style-loader css-loader -D`
- [x] - instalar: `yarn add node-sass -D`
- [x] - instalar: `yarn add sass-loader -D`


## Conceitos Fndamentais

- Um componente é uma função que devolve um HTML. Geralmente, o componente sempre começa com letra maiuscula e um componente por arquivo, por convenção.

- As propriedades funcionam como atributos das tags html, variaveis que eu posso passar para um componente funcionar de forma diferente.

- Imutabilidade - nao alterar uma informacao ja feita e sim, criar uma nova variavel
// usuarios = ['diego', 'thiago', 'rafael']

// novosUsuarios = [ ...usuarios, 'joao']

- [] `yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh`

## useEffect

- serve para disparar uma funcao quando algo mudar na minha aplicacao, uma variavel mudar por exemplo