# Vendly 🛍️

**Vendly** é um aplicativo mobile moderno e intuitivo desenvolvido em **React Native / Expo** para gestão simples de vendas e produtos. Perfeito para pequenos comércios e vendedores independentes que precisam registrar rapidamente suas movimentações direto pelo celular (iOS & Android).

## Principais Funcionalidades 🚀

- **Dashboard Principal:**
  - Visão panorâmica dos rendimentos (Total Bruto, Líquido, Lucro, Ticket Médio).
  - Filtros rápidos por Hoje, Semana, Mês ou data Customizada usando calendário.
  - Histórico rápido das últimas vendas realizadas.
- **Gestão de Produtos:**
  - Cadastro interativo de produtos.
  - Definição customizada do Preço de Custo e Preço Base de Venda.
  - Controle de visualização (Ativo/Inativo na lojinha).
- **Caixa de Vendas Inteligente:**
  - Carrinho inteligente que detecta produtos ativos.
  - Adição flexível de quantidades e descontos percentuais ou fixos.
  - Acréscimos de venda sob demanda.
  - Resumo em tempo real do Total a pagar na finalização de pedido.

## Tecnologias Utilizadas 🛠️

- **Framework principal:** [React Native](https://reactnative.dev/) através da plataforma [Expo (SDK +50)](https://expo.dev/)
- **Linguagem Principal:** Typescript / TSX / Javascript
- **Roteamento:** [Expo Router](https://docs.expo.dev/router/introduction/) (Rotas baseadas em diretório global /app)
- **Gerenciador de Estado:** [Zustand](https://github.com/pmndrs/zustand) (Simulação atual de persistência via hook dinâmico - Banco In-memory)
- **Estilização e Componentes:** NativeWind (TailwindCSS para React Native) em conjunto de Componentes de Design System próprios (`VendlyCard`, `VendlyInput`, `VendlyButton`).
- **Iconografia:** `lucide-react-native`

## Estrutura de Pastas e Componentes Base 📂

- `/app`: Roteamento principal do app.
  - `(tabs)`: Configuração global da Bottom Navigation e sub-telas. 
    - `dashboard`: Visão de Entrada
    - `products`: Catálogo, Edição, Inserção 
    - `sales`: Resumos, Caixa de Nova Venda
- `/components`: Botões e Cards de UI com design premium e reutilizáveis (Hero Sections, FloatingActions, StatusBadge).
- `/lib`: Estruturas puras.
  - `types.ts`: Tipagens principais (Product, SaleItem, Sale).
  - `store.ts`: Motor do estado atual (Zustand) que engatilha o refresh de listas simultaneamente.

## Como Executar o Projeto Localmente 👾

1. Certifique-se de que tenha o **Node.js** e o **npm** (ou yarn) instalados em sua máquina.
2. Clone ou baixe este repositório para a sua máquina.

No primeiro acesso, rode a instalação dos pacotes base:
```bash
npm install
```

3. Em seguida, ligue o servidor de desenvolvimento do Expo e emuladores:
```bash
npx expo start
```
*Dica para Windows*: use a opção `npx expo start -c` em caso de cachê engasgado.

## Dúvidas com Expo?

Você pode usar o Expo Go pelo seu Celular scaneando o QR Code na aba de terminal que abriu, ou pressionar a tecla "A" para o emulador de Android ou "I" para o simulador de iOS se tiver eles rodando nativos em seu processador. Para mais informações do React Native confira a [Documentação Oficial do Expo](https://docs.expo.dev/).
