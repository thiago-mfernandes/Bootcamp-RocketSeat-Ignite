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
- [x] - instalar: `yarn node-sass -D`
- [x] - instalar: `yarn add sass-loader -D`

--------------------------------------------------------------------------------------------
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//o path resolve a questao do caminho relativo dependendo do sistema operacional
// __dirname procura a instrucao de acordo com o nome da pasta que estiver - no caso - src

//- [x] - configurar dois ambientes: desenvolvimento e produção:

const isDevelopment = process.env.NODE_ENV !==  'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //configuracao para ver os erros do mesmo jeito que estou escrevendo o codigo - acesso ao codigo original
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    //arquivo de saida - output 
    output: {
        //caminho e pasta
        path: path.resolve(__dirname, 'dist'),
        //nome do arquivo
        filename: 'bundle.js'
    },
    resolve: {
        //le e entende as extensoes
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        //essa diretriz informa a pasta onde esta o index.html para que o webpack faz reload automatico
        contentBase: path.resolve(__dirname, 'public')
    },
    plugins: [
        //este plugin coloca o nome automaticamente do arquivo javascript gerado pelo wepack dentro do index.html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.hmtml'), 
        })
    ],
    module: {
        //como minha aplicacao vai lidar com cada tipo de arquivo
        rules: [
            {
                //verifica se o arquivo possui esta extensao
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                //verifica se o arquivo possui esta extensao
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                //verifica se o arquivo possui esta extensao
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
}

## Conceitos Fndamentais

- Um componente é uma funcao que devolve um HTML. Geralmente, o componente sempre comeca com letra maiuscula e um componente por arquivo, por convenção