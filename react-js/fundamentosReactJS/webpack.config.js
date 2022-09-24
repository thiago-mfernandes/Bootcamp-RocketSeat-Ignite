const path = require('path');
//o path resolve a questao do caminho relativo dependendo do sistema operacional
// __dirname procura o diretorio onde eu coloquei este arquivo webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
//- [x] - configurar dois ambientes: desenvolvimento e produção:

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !==  'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //configuracao para ver os erros do mesmo jeito que estou escrevendo o codigo - acesso ao codigo original
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',

    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    //arquivo de saida que vai ser gerado com o webpack(bundle.js) - output 
    output: {
      //caminho e pasta
      path: path.resolve(__dirname, 'dist'),
      //nome do arquivo
      filename: 'bundle.js'
    },
    resolve: {
      //le e entende as extensoes
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
      //essa diretriz informa a pasta onde esta o index.html para que o webpack faz reload automatico
      static: path.resolve(__dirname, './public'),
      hot: true,
    },
    plugins: [
      //este plugin coloca o nome automaticamente do arquivo javascript gerado pelo wepack dentro do index.html
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'), 
      }),
      //se eu estiver em ambiente de desenvolvimento, vou executar a funcao, caso nao esteja, retorno um false, e vai dar problema. O filter remove valores booleanos falsos, undefined null, 
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    module: {
      //como minha aplicacao vai lidar com cada tipo de arquivo
      rules: [
        {
          //verifica se o arquivo possui esta extensao - JSX
          test: /\.(j|t)sx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && 
                  require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
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