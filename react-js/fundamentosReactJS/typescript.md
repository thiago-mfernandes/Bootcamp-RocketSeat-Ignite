- permite adicionar tipos para as informacoes esperadas

- [x] instalar: `yarn add typescript -D`
- [] `yarn tsc --init`

no arquivo tsconfig.json:

{
  "compilerOptions": {  

    "lib": ["DOM", "DOM.Iterable", "ESNext"],                                        
    "allowJs": true,           
    "jsx": "react-jsx",                                
    "noEmit": true,                                   
    "strict": true,                                      
    "moduleResolution": "node",                       
    "resolveJsonModule": true,                        
    "isolatedModules": true,                          
    "allowSyntheticDefaultImports": true,             
    "esModuleInterop": true,                             
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,            
  },
  "include": ["src"]
}

adicionar no babel uma configuracao que permite que ele entenda o ts
- [x] - `yarn add @babel/preset-typescript -D`

adicionar no arquivo babel.config.js: '@babel/preset-typescript'

instalar a tipagem das bibliotecas:
`npm i --save-dev @types/react-dom`
`yarn add @types/react -D`