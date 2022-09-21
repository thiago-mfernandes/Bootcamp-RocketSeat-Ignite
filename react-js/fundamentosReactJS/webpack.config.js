const path = require('path');
//o path resolve a questao do caminho relativo dependendo do sistema operacional
// __dirname procura o diretorio onde eu coloquei este arquivo webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
//- [x] - configurar dois ambientes: desenvolvimento e produção:

const isDevelopment = process.env.NODE_ENV !==  'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //configuracao para ver os erros do mesmo jeito que estou escrevendo o codigo - acesso ao codigo original
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',

    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    //arquivo de saida que vai ser gerado com o webpack(bundle.js) - output 
    output: {
      //caminho e pasta
      path: path.resolve(__dirname, 'dist'),
      //nome do arquivo
      filename: 'bundle.js'
    },
    resolve: {
      //le e entende as extensoes
      extensions: ['.js', '.jsx', 'ts', 'tsx'],
    },
    devServer: {
      //essa diretriz informa a pasta onde esta o index.html para que o webpack faz reload automatico
      static: path.resolve(__dirname, 'public'),
    },
    plugins: [
      //este plugin coloca o nome automaticamente do arquivo javascript gerado pelo wepack dentro do index.html
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'), 
      })
    ],
    module: {
      //como minha aplicacao vai lidar com cada tipo de arquivo
      rules: [
        {
          //verifica se o arquivo possui esta extensao - JSX
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          //verifica se o arquivo possui esta extensao - CSS
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          //verifica se o arquivo possui esta extensao - SCSS
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        }
      ]
    }
}