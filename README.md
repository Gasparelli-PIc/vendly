# Vendly 🛍️

**Vendly** é um aplicativo mobile moderno e intuitivo desenvolvido em **React Native / Expo** para gestão simples de vendas e produtos. Perfeito para pequenos comércios e vendedores independentes que precisam registrar movimentações de forma ágil direto pelo celular (iOS & Android).

## Principais Funcionalidades 🚀

- **Dashboard Principal:**
  - Visão panorâmica dos rendimentos (Total Bruto, Líquido, Lucro, Ticket Médio).
  - Filtros por Hoje, Semana, Mês ou período Customizado.
  - Histórico das últimas vendas.
- **Gestão de Produtos:**
  - Cadastro de produtos.
  - Definição de Preço de Custo e Preço Base de Venda.
  - Controle de status (Ativo/Inativo).
- **Caixa de Vendas:**
  - Adição flexível de quantidades e descontos percentuais ou fixos.
  - Acréscimos de venda.
  - Resumo do total a pagar na finalização de pedido.

## Tecnologias Utilizadas 🛠️

- **Framework principal:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- **Linguagem Principal:** Typescript / TSX
- **Roteamento:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Gerenciador de Estado:** [Zustand](https://github.com/pmndrs/zustand)
- **Estilização:** NativeWind (TailwindCSS para React Native) em conjunto com componentes reutilizáveis próprios.
- **Iconografia:** `lucide-react-native`

## Estrutura de Pastas 📂

- `/app`: Roteamento principal do app.
  - `(tabs)`: Configuração da Bottom Navigation e sub-telas. 
    - `dashboard`: Visão de Entrada
    - `products`: Catálogo, Edição, Inserção 
    - `sales`: Resumos, Caixa de Nova Venda
- `/components`: Botões e Cards de UI estáticos e reutilizáveis ao longo da aplicação.
- `/lib`: Utilitários e configurações.
  - `types.ts`: Tipagens do TypeScript.
  - `store.ts`: Definição de estados e ações unificadas do Zustand.

## Como Executar o Projeto Localmente 👾

1. Certifique-se de ter o **Node.js** e o gerenciador de pacotes **npm** instalados.
2. Clone este repositório para a sua máquina e acesse o diretório principal.

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

## Mais Informações

Para visualizar as páginas localmente, você pode baixar o **Expo Go** em seu dispositivo móvel e fotografar o QR Code gerado pelo terminal. Como alternativa, ao rodar a CLI, pressione "a" ou "i" para utilizar emuladores Android ou simuladores iOS no seu próprio computador.

Para aprofundamento na plataforma, confira a [Documentação Oficial do Expo](https://docs.expo.dev/).
