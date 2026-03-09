# Vendly - Documentação Front-End Completa

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Design System](#design-system)
5. [Componentes](#componentes)
6. [Páginas](#páginas)
7. [Rotas](#rotas)
8. [Tipos e Interfaces](#tipos-e-interfaces)
9. [Armazenamento Local](#armazenamento-local)
10. [Utilitários](#utilitários)
11. [Estilos](#estilos)
12. [Funcionalidades Principais](#funcionalidades-principais)

---

## 🎯 Visão Geral

**Vendly** é um sistema de gerenciamento de vendas mobile-first e offline-first para pequenos comerciantes brasileiros. O objetivo principal é permitir que um vendedor registre uma venda em **menos de 10 segundos**, com foco em simplicidade, velocidade e usabilidade em dispositivos móveis.

### Características Principais
- ✅ **Mobile-First**: Interface otimizada para smartphones
- ✅ **Offline-First**: Funciona 100% offline usando localStorage
- ✅ **Rápido**: Registro de venda em < 10 segundos
- ✅ **Análise Financeira**: Cálculo automático de lucro e margem
- ✅ **Sistema de Múltiplos Produtos**: Carrinho de compras por venda
- ✅ **Desconto/Acréscimo**: Flexibilidade em valores finais
- ✅ **Filtros por Período**: Dashboard e vendas com filtros customizados

---

## 🏗️ Arquitetura

### Stack Tecnológico
- **React 18.3.1** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **React Router 7.13.0** - Roteamento (Data Mode)
- **Tailwind CSS 4.1.12** - Estilização
- **Vite 6.3.5** - Build tool
- **date-fns 3.6.0** - Manipulação de datas
- **react-datepicker 9.1.0** - Seletor de datas customizado
- **lucide-react 0.487.0** - Ícones

### Padrão de Arquitetura
- **Component-Based**: Componentes reutilizáveis
- **Local State Management**: useState e useEffect
- **localStorage API**: Persistência de dados
- **Atomic Design**: Componentes do design system separados

---

## 📁 Estrutura de Pastas

```
/src
├── /app
│   ├── App.tsx                 # Componente raiz
│   ├── routes.ts               # Configuração de rotas
│   ├── /components             # Componentes reutilizáveis
│   │   ├── BottomNav.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FloatingActionButton.tsx
│   │   ├── LoadingState.tsx
│   │   ├── SaleDetailsSheet.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── VendlyButton.tsx
│   │   ├── VendlyCard.tsx
│   │   ├── VendlyDatePicker.tsx
│   │   ├── VendlyInput.tsx
│   │   └── /figma              # Componentes do Figma
│   ├── /lib                    # Lógica de negócio
│   │   ├── seed.ts
│   │   ├── storage.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── /pages                  # Páginas da aplicação
│       ├── Dashboard.tsx
│       ├── EditProduct.tsx
│       ├── EditSale.tsx
│       ├── NewProduct.tsx
│       ├── NewSale.tsx
│       ├── Products.tsx
│       ├── RootLayout.tsx
│       └── Sales.tsx
└── /styles                     # Estilos globais
    ├── datepicker.css
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

---

## 🎨 Design System

### Paleta de Cores

```css
/* Cores Principais */
--vendly-primary: #16A34A      /* Verde principal (botões, ações) */
--vendly-bg: #F9FAFB           /* Fundo cinza claro */
--vendly-card: #FFFFFF         /* Fundo de cards */
--vendly-text: #111827         /* Texto principal (quase preto) */
--vendly-text-secondary: #6B7280  /* Texto secundário (cinza) */
--vendly-border: #E5E7EB       /* Bordas */
--vendly-error: #DC2626        /* Vermelho (erros, exclusões) */
--vendly-warning: #F59E0B      /* Amarelo (avisos) */
```

### Tipografia

```css
/* Fonte */
font-family: 'Inter', sans-serif;

/* Pesos */
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600

/* Tamanhos (herdados de Tailwind) */
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
```

### Sistema de Espaçamento
- Base: **8px** (múltiplos de 8)
- Padding interno de cards: **16px** (p-4)
- Gaps entre elementos: **12px** (gap-3)
- Margin entre sections: **16px** (space-y-4)

### Border Radius
- Inputs/Buttons: **12px** (rounded-xl)
- Cards: **16px** (rounded-2xl)
- Small elements: **8px** (rounded-lg)

---

## 🧩 Componentes

### 1. VendlyButton
**Arquivo:** `/src/app/components/VendlyButton.tsx`

Botão customizado com variantes e estado de loading.

**Props:**
```typescript
interface VendlyButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // + todas as props de HTMLButtonElement
}
```

**Variantes:**
- `primary`: Verde #16A34A com texto branco
- `secondary`: Branco com borda verde
- `danger`: Vermelho #DC2626 com texto branco
- `ghost`: Transparente com hover cinza
- `outline`: Branco com borda cinza

**Uso:**
```tsx
<VendlyButton variant="primary" loading={isLoading}>
  Salvar
</VendlyButton>
```

---

### 2. VendlyInput
**Arquivo:** `/src/app/components/VendlyInput.tsx`

Input customizado com label e mensagem de erro.

**Props:**
```typescript
interface VendlyInputProps {
  label?: string;
  error?: string;
  className?: string;
  // + todas as props de HTMLInputElement
}
```

**Características:**
- Border verde no focus
- Ring effect (#16A34A/20)
- Altura fixa: 48px (h-12)
- Border radius: 12px
- Mensagem de erro em vermelho

**Uso:**
```tsx
<VendlyInput
  label="Nome do Produto"
  type="text"
  placeholder="Ex: Coca-Cola 2L"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={errors.name}
/>
```

---

### 3. VendlyCard
**Arquivo:** `/src/app/components/VendlyCard.tsx`

Container para agrupar conteúdo relacionado.

**Props:**
```typescript
interface VendlyCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

**Características:**
- Fundo branco
- Border radius: 16px (rounded-2xl)
- Padding: 16px (p-4)
- Shadow suave
- Hover shadow (quando clicável)

**Uso:**
```tsx
<VendlyCard>
  <h2>Título</h2>
  <p>Conteúdo do card</p>
</VendlyCard>
```

---

### 4. VendlyDatePicker
**Arquivo:** `/src/app/components/VendlyDatePicker.tsx`

Seletor de data customizado com calendário visual.

**Props:**
```typescript
interface VendlyDatePickerProps {
  value: string;           // Formato: YYYY-MM-DD
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
}
```

**Características:**
- Calendário em português (pt-BR)
- Formato de exibição: dd/MM/yyyy
- Cabeçalho verde (#16A34A)
- Ícone de calendário integrado
- Dias selecionados destacados
- Hoje destacado com fundo verde claro

**Uso:**
```tsx
<VendlyDatePicker
  label="Data da Venda"
  value={saleDate}
  onChange={(date) => setSaleDate(date)}
/>
```

---

### 5. StatusBadge
**Arquivo:** `/src/app/components/StatusBadge.tsx`

Badge para status de produtos (ativo/inativo).

**Props:**
```typescript
interface StatusBadgeProps {
  status: 'active' | 'inactive';
}
```

**Características:**
- `active`: Verde com texto "Ativo"
- `inactive`: Cinza com texto "Inativo"
- Border radius: 6px
- Texto pequeno (text-xs)

**Uso:**
```tsx
<StatusBadge status={product.status} />
```

---

### 6. BottomNav
**Arquivo:** `/src/app/components/BottomNav.tsx`

Navegação inferior fixa (bottom tabs).

**Características:**
- Altura: 80px (h-20)
- 3 abas: Dashboard, Produtos, Vendas
- Ícones do lucide-react
- Indicador de aba ativa (verde)
- Sticky na parte inferior

**Abas:**
1. **Dashboard** - `/` - ícone: LayoutDashboard
2. **Produtos** - `/produtos` - ícone: Package
3. **Vendas** - `/vendas` - ícone: ShoppingCart

---

### 7. FloatingActionButton (FAB)
**Arquivo:** `/src/app/components/FloatingActionButton.tsx`

Botão flutuante para ações principais.

**Props:**
```typescript
interface FloatingActionButtonProps {
  to: string;          // Rota para navegação
  label: string;       // Texto do botão
}
```

**Características:**
- Posição: fixed bottom-right
- Fundo verde (#16A34A)
- Ícone Plus do lucide-react
- Shadow grande
- Animação de hover

**Uso:**
```tsx
<FloatingActionButton to="/vendas/nova" label="Nova Venda" />
```

---

### 8. EmptyState
**Arquivo:** `/src/app/components/EmptyState.tsx`

Tela de estado vazio com mensagem e ação.

**Props:**
```typescript
interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}
```

**Uso:**
```tsx
<EmptyState
  title="Nenhuma venda hoje"
  message="Você ainda não registrou vendas hoje."
  actionLabel="Registrar Venda"
  onAction={() => navigate('/vendas/nova')}
  icon={<ShoppingCart className="w-16 h-16" />}
/>
```

---

### 9. LoadingState
**Arquivo:** `/src/app/components/LoadingState.tsx`

Indicador de carregamento.

**Props:**
```typescript
interface LoadingStateProps {
  message?: string;
}
```

**Uso:**
```tsx
<LoadingState message="Carregando vendas..." />
```

---

### 10. ConfirmDialog
**Arquivo:** `/src/app/components/ConfirmDialog.tsx`

Diálogo de confirmação para ações destrutivas.

**Props:**
```typescript
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'default';
}
```

**Uso:**
```tsx
<ConfirmDialog
  open={dialogOpen}
  onOpenChange={setDialogOpen}
  title="Excluir venda?"
  description="Esta ação não pode ser desfeita."
  confirmLabel="Excluir"
  onConfirm={handleDelete}
  variant="danger"
/>
```

---

### 11. SaleDetailsSheet
**Arquivo:** `/src/app/components/SaleDetailsSheet.tsx`

Drawer/Sheet para detalhes de uma venda.

**Props:**
```typescript
interface SaleDetailsSheetProps {
  sale: Sale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

**Características:**
- Exibe todos os produtos da venda
- Mostra desconto/acréscimo aplicado
- Calcula e exibe lucro e margem
- Botões de editar e excluir
- Data formatada em português

---

## 📄 Páginas

### 1. Dashboard
**Arquivo:** `/src/app/pages/Dashboard.tsx`  
**Rota:** `/`

**Funcionalidades:**
- Métricas do dia (total de vendas)
- Métricas do mês (total de vendas)
- Filtros por período (Hoje, Semana, Mês, Customizado)
- Análise financeira detalhada:
  - Receita total
  - Custo total
  - Lucro líquido
  - Margem de lucro (%)
- Lista de vendas recentes
- Estado vazio quando não há vendas

**Filtros:**
- **Hoje**: Vendas do dia atual
- **Semana**: Últimos 7 dias
- **Mês**: Mês atual
- **Customizado**: Seleção de data início/fim com VendlyDatePicker

---

### 2. Products (Lista de Produtos)
**Arquivo:** `/src/app/pages/Products.tsx`  
**Rota:** `/produtos`

**Funcionalidades:**
- Listagem de todos os produtos
- Busca por nome
- Exibição de:
  - Nome do produto
  - Preço base
  - Status (ativo/inativo)
- Botão toggle para ativar/desativar produto
- Click no card para editar
- FAB para adicionar novo produto
- Estado vazio quando não há produtos

---

### 3. NewProduct (Cadastro de Produto)
**Arquivo:** `/src/app/pages/NewProduct.tsx`  
**Rota:** `/produtos/novo`

**Campos:**
- Nome do produto (obrigatório)
- Preço de custo (number, >= 0)
- Preço de venda (number, >= 0)
- Status inicial: sempre "ativo"

**Validações:**
- Nome não pode ser vazio
- Preços devem ser números válidos
- Preços não podem ser negativos

**Fluxo:**
1. Preencher formulário
2. Clicar em "Cadastrar Produto"
3. Loading de 300ms (simulação)
4. Salvar no localStorage
5. Redirecionar para `/produtos`

---

### 4. EditProduct (Edição de Produto)
**Arquivo:** `/src/app/pages/EditProduct.tsx`  
**Rota:** `/produtos/:id/editar`

**Funcionalidades:**
- Carregar dados do produto por ID
- Editar nome, preço de custo, preço de venda
- Alternar status (ativo/inativo)
- Botão de excluir produto
- Confirmação antes de excluir
- Validações iguais ao NewProduct

**Fluxo de Exclusão:**
1. Clicar em "Excluir Produto"
2. Abrir ConfirmDialog
3. Confirmar exclusão
4. Remover do localStorage
5. Redirecionar para `/produtos`

---

### 5. Sales (Lista de Vendas)
**Arquivo:** `/src/app/pages/Sales.tsx`  
**Rota:** `/vendas`

**Funcionalidades:**
- Listagem de vendas com filtros
- Filtros: Hoje, Semana, Mês, Customizado
- Exibição de:
  - Data da venda
  - Valor total
  - Lucro calculado
  - Margem de lucro (%)
- Click no card para ver detalhes (SaleDetailsSheet)
- Botão de excluir na lista
- FAB para nova venda
- Estado vazio

**Cálculo de Lucro (por venda):**
```typescript
const profit = sale.items.reduce((sum, item) => {
  return sum + ((item.unitPrice - item.costPrice) * item.quantity);
}, 0);
```

**Margem de Lucro:**
```typescript
const margin = sale.totalValue > 0 
  ? (profit / sale.totalValue) * 100 
  : 0;
```

---

### 6. NewSale (Registro de Venda)
**Arquivo:** `/src/app/pages/NewSale.tsx`  
**Rota:** `/vendas/nova`

**Funcionalidades:**
- Sistema de carrinho de produtos
- Adicionar múltiplos produtos à venda
- Campos para cada produto:
  - Seleção de produto (dropdown)
  - Preço unitário (editável)
  - Quantidade
- Botão "Adicionar ao Carrinho"
- Lista de itens no carrinho
- Remover item do carrinho
- Seleção de data da venda (VendlyDatePicker)
- Sistema de ajuste de valor:
  - **Desconto**: % ou valor fixo
  - **Acréscimo**: % ou valor fixo
  - Toggle entre modos
- Preview do total:
  - Subtotal
  - Desconto aplicado (se houver)
  - Acréscimo aplicado (se houver)
  - Total final

**Fluxo:**
1. Selecionar produto
2. Definir preço e quantidade
3. Adicionar ao carrinho
4. Repetir para mais produtos (opcional)
5. Selecionar data da venda
6. Aplicar desconto/acréscimo (opcional)
7. Clicar em "Registrar Venda"
8. Salvar no localStorage
9. Redirecionar para `/vendas`

**Cálculo do Total:**
```typescript
const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

// Se desconto
if (discountType === 'percentage') {
  discountAmount = (subtotal * discountValue) / 100;
} else {
  discountAmount = discountValue;
}

// Se acréscimo
if (additionalType === 'percentage') {
  additionalAmount = (subtotal * additionalValue) / 100;
} else {
  additionalAmount = additionalValue;
}

const total = subtotal - discountAmount + additionalAmount;
```

---

### 7. EditSale (Edição de Venda)
**Arquivo:** `/src/app/pages/EditSale.tsx`  
**Rota:** `/vendas/:id/editar`

**Funcionalidades:**
- Carregar dados da venda por ID
- Editar produtos no carrinho
- Adicionar/remover produtos
- Alterar data da venda
- Modificar desconto/acréscimo
- Validações iguais ao NewSale

**Fluxo:**
1. Carregar venda existente
2. Preencher formulário com dados atuais
3. Permitir edições
4. Clicar em "Salvar Alterações"
5. Atualizar no localStorage
6. Redirecionar para `/vendas`

---

### 8. RootLayout
**Arquivo:** `/src/app/pages/RootLayout.tsx`  
**Rota:** Wrapper para `/`, `/produtos`, `/vendas`

**Funcionalidades:**
- Layout base com BottomNav
- Outlet para renderizar páginas filhas
- Padding bottom para não sobrepor o BottomNav

```tsx
<div className="pb-20">
  <Outlet />
  <BottomNav />
</div>
```

---

## 🛣️ Rotas

**Arquivo:** `/src/app/routes.ts`

```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },       // /
      { path: 'produtos', Component: Products },   // /produtos
      { path: 'vendas', Component: Sales },        // /vendas
    ],
  },
  { path: '/produtos/novo', Component: NewProduct },
  { path: '/produtos/:id/editar', Component: EditProduct },
  { path: '/vendas/nova', Component: NewSale },
  { path: '/vendas/:id/editar', Component: EditSale },
]);
```

**Estrutura:**
- Rotas com BottomNav: `/`, `/produtos`, `/vendas`
- Rotas sem BottomNav: formulários e edições

---

## 📦 Tipos e Interfaces

**Arquivo:** `/src/app/lib/types.ts`

### Product
```typescript
export interface Product {
  id: string;                    // UUID gerado automaticamente
  name: string;                  // Nome do produto
  costPrice: number;             // Preço de custo
  basePrice: number;             // Preço de venda base
  status: 'active' | 'inactive'; // Status do produto
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}
```

### SaleItem
```typescript
export interface SaleItem {
  productId: string;       // ID do produto
  productName: string;     // Nome (snapshot)
  costPrice: number;       // Custo (snapshot)
  unitPrice: number;       // Preço unitário de venda
  quantity: number;        // Quantidade vendida
  subtotal: number;        // unitPrice * quantity
}
```

### Sale
```typescript
export interface Sale {
  id: string;                              // UUID
  items: SaleItem[];                       // Array de produtos vendidos
  subtotal: number;                        // Soma dos subtotais dos itens
  discountType?: 'percentage' | 'value';   // Tipo de desconto
  discountValue?: number;                  // Valor ou % do desconto
  discountAmount?: number;                 // Valor calculado do desconto
  additionalType?: 'percentage' | 'value'; // Tipo de acréscimo
  additionalValue?: number;                // Valor ou % do acréscimo
  additionalAmount?: number;               // Valor calculado do acréscimo
  totalValue: number;                      // Valor final da venda
  date: string;                            // Data da venda (YYYY-MM-DD)
  createdAt: string;                       // ISO timestamp
  updatedAt: string;                       // ISO timestamp
}
```

### DashboardStats
```typescript
export interface DashboardStats {
  todayTotal: number;    // Total de vendas hoje
  monthTotal: number;    // Total de vendas no mês
  recentSales: Sale[];   // Últimas 5 vendas
}
```

---

## 💾 Armazenamento Local

**Arquivo:** `/src/app/lib/storage.ts`

### Keys do localStorage
```typescript
const PRODUCTS_KEY = 'vendly_products';
const SALES_KEY = 'vendly_sales';
```

### Funções de Produto

#### getProducts()
```typescript
export const getProducts = (): Product[]
```
Retorna todos os produtos do localStorage.

#### saveProduct()
```typescript
export const saveProduct = (
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Product
```
Cria um novo produto com:
- ID gerado via `crypto.randomUUID()`
- createdAt e updatedAt automáticos

#### updateProduct()
```typescript
export const updateProduct = (
  id: string, 
  updates: Partial<Product>
): Product | null
```
Atualiza um produto existente.

#### deleteProduct()
```typescript
export const deleteProduct = (id: string): boolean
```
Remove um produto por ID.

#### getProductById()
```typescript
export const getProductById = (id: string): Product | null
```
Busca um produto específico.

---

### Funções de Venda

#### getSales()
```typescript
export const getSales = (): Sale[]
```
Retorna todas as vendas.

#### saveSale()
```typescript
export const saveSale = (
  sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>
): Sale
```
Cria uma nova venda.

#### updateSale()
```typescript
export const updateSale = (
  id: string, 
  updates: Partial<Sale>
): Sale | null
```
Atualiza uma venda existente.

#### deleteSale()
```typescript
export const deleteSale = (id: string): boolean
```
Remove uma venda.

---

### Funções de Dashboard

#### getDashboardStats()
```typescript
export const getDashboardStats = (): DashboardStats
```
Calcula estatísticas para o dashboard:
- Total do dia
- Total do mês
- Últimas 5 vendas

#### getSalesByDateRange()
```typescript
export const getSalesByDateRange = (
  startDate?: string, 
  endDate?: string
): Sale[]
```
Filtra vendas por intervalo de datas.

#### getTodaySales()
```typescript
export const getTodaySales = (): Sale[]
```
Retorna vendas do dia atual.

#### getWeekSales()
```typescript
export const getWeekSales = (): Sale[]
```
Retorna vendas dos últimos 7 dias.

#### getMonthSales()
```typescript
export const getMonthSales = (): Sale[]
```
Retorna vendas do mês atual.

---

## 🛠️ Utilitários

**Arquivo:** `/src/app/lib/utils.ts`

### formatCurrency()
```typescript
export const formatCurrency = (value: number): string
```
Formata número para moeda brasileira.  
**Exemplo:** `1234.56` → `"R$ 1.234,56"`

### formatDate()
```typescript
export const formatDate = (dateString: string): string
```
Formata data ISO para padrão brasileiro.  
**Exemplo:** `"2024-03-15"` → `"15/03/2024"`

### formatDateTime()
```typescript
export const formatDateTime = (dateString: string): string
```
Formata data e hora ISO para padrão brasileiro.  
**Exemplo:** `"2024-03-15T14:30:00"` → `"15/03/2024 14:30"`

### getCurrentDate()
```typescript
export const getCurrentDate = (): string
```
Retorna data atual no formato YYYY-MM-DD.  
**Exemplo:** `"2024-03-15"`

### getTodayFormatted()
```typescript
export const getTodayFormatted = (): string
```
Retorna data atual formatada por extenso em português.  
**Exemplo:** `"sexta-feira, 15 de março de 2024"`

---

## 🎨 Estilos

### theme.css
**Arquivo:** `/src/styles/theme.css`

Define as variáveis CSS customizadas do Vendly e tema Tailwind.

**Variáveis principais:**
```css
:root {
  --vendly-primary: #16A34A;
  --vendly-bg: #F9FAFB;
  --vendly-card: #FFFFFF;
  --vendly-text: #111827;
  --vendly-text-secondary: #6B7280;
  --vendly-border: #E5E7EB;
  --vendly-error: #DC2626;
  --vendly-warning: #F59E0B;
}
```

### datepicker.css
**Arquivo:** `/src/styles/datepicker.css`

Estilos customizados para o react-datepicker.

**Características:**
- Cabeçalho verde (#16A34A)
- Dias com hover verde
- Dia selecionado: fundo verde
- Dia atual: fundo verde claro (#16A34A10)
- Border radius: 12px
- Sombra suave
- Fonte Inter

### fonts.css
**Arquivo:** `/src/styles/fonts.css`

Importação da fonte Inter do Google Fonts.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### tailwind.css
**Arquivo:** `/src/styles/tailwind.css`

Importação dos layers do Tailwind CSS v4.

```css
@import 'tailwindcss';
```

---

## ⚙️ Funcionalidades Principais

### 1. Registro Rápido de Venda (< 10 segundos)

**Objetivo:** Permitir que o vendedor registre uma venda em menos de 10 segundos.

**Fluxo Otimizado:**
1. Click no FAB "Nova Venda" (1s)
2. Selecionar produto no dropdown (2s)
3. Confirmar quantidade padrão = 1 (0s)
4. Adicionar ao carrinho (1s)
5. Data já preenchida com hoje (0s)
6. Click em "Registrar Venda" (1s)
7. **Total: ~5 segundos**

**Otimizações:**
- Quantidade padrão: 1
- Data padrão: hoje
- Preço padrão: basePrice do produto
- Navegação direta (sem steps)

---

### 2. Sistema de Múltiplos Produtos por Venda

**Característica:** Cada venda pode conter vários produtos.

**Estrutura de Dados:**
```typescript
const sale: Sale = {
  id: "uuid",
  items: [
    {
      productId: "uuid-1",
      productName: "Coca-Cola 2L",
      costPrice: 3.50,
      unitPrice: 7.00,
      quantity: 2,
      subtotal: 14.00
    },
    {
      productId: "uuid-2",
      productName: "Pão Francês",
      costPrice: 0.30,
      unitPrice: 0.50,
      quantity: 10,
      subtotal: 5.00
    }
  ],
  subtotal: 19.00,
  totalValue: 19.00,
  date: "2024-03-15",
  // ...
}
```

**Benefícios:**
- Vendas mais realistas
- Análise financeira precisa
- Histórico detalhado

---

### 3. Desconto e Acréscimo

**Tipos de Ajuste:**
- **Desconto Percentual**: Ex: 10% sobre o subtotal
- **Desconto em Valor**: Ex: R$ 5,00 fixo
- **Acréscimo Percentual**: Ex: 5% sobre o subtotal
- **Acréscimo em Valor**: Ex: R$ 2,00 fixo

**Regra:** Apenas um ajuste por venda (ou desconto, ou acréscimo, ou nenhum).

**Cálculo:**
```typescript
const subtotal = 100.00;

// Desconto de 10%
const discountAmount = (100 * 10) / 100; // 10.00
const total = 100 - 10; // 90.00

// Acréscimo de R$ 5,00
const additionalAmount = 5.00;
const total = 100 + 5; // 105.00
```

---

### 4. Análise Financeira

**Métricas Calculadas:**

#### 1. Receita Total
```typescript
const revenue = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
```

#### 2. Custo Total
```typescript
const cost = sales.reduce((sum, sale) => {
  return sum + sale.items.reduce((itemSum, item) => {
    return itemSum + (item.costPrice * item.quantity);
  }, 0);
}, 0);
```

#### 3. Lucro Líquido
```typescript
const profit = revenue - cost;
```

#### 4. Margem de Lucro (%)
```typescript
const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
```

**Onde é exibido:**
- Dashboard (métricas globais)
- Lista de Vendas (lucro e margem por venda)
- Detalhes de Venda (lucro e margem específicos)

---

### 5. Filtros por Período

**Opções de Filtro:**
- **Hoje**: Vendas do dia atual
- **Semana**: Últimos 7 dias
- **Mês**: Mês atual (01 até hoje)
- **Customizado**: Seleção livre de data início e fim

**Implementação:**
```typescript
const [filter, setFilter] = useState<FilterType>('today');
const [customStartDate, setCustomStartDate] = useState('');
const [customEndDate, setCustomEndDate] = useState('');

useEffect(() => {
  if (filter === 'today') {
    setSales(getTodaySales());
  } else if (filter === 'week') {
    setSales(getWeekSales());
  } else if (filter === 'month') {
    setSales(getMonthSales());
  } else if (filter === 'custom' && customStartDate && customEndDate) {
    setSales(getSalesByDateRange(customStartDate, customEndDate));
  }
}, [filter, customStartDate, customEndDate]);
```

---

### 6. Gestão de Produtos

**Status do Produto:**
- **Ativo**: Aparece no dropdown de vendas
- **Inativo**: Não aparece no dropdown, mas mantém histórico

**Ações:**
- Criar produto
- Editar produto (nome, preços, status)
- Toggle status (ativo ↔ inativo)
- Excluir produto (com confirmação)
- Buscar produto por nome

**Validações:**
- Nome obrigatório
- Preços devem ser números >= 0
- Não permite venda com produto inativo

---

### 7. Edição de Vendas

**Permitido editar:**
- Data da venda
- Produtos da venda (adicionar/remover)
- Quantidade e preço de cada produto
- Desconto/Acréscimo

**Fluxo:**
1. Clicar em "Editar" nos detalhes da venda
2. Redirecionar para `/vendas/:id/editar`
3. Carregar dados atuais
4. Permitir modificações
5. Salvar alterações
6. Atualizar `updatedAt`

---

### 8. Snapshot de Dados

**Problema:** Se um produto for editado ou excluído, o histórico de vendas pode ficar inconsistente.

**Solução:** Fazer snapshot dos dados do produto no momento da venda.

**O que é armazenado:**
```typescript
const saleItem: SaleItem = {
  productId: product.id,          // Referência
  productName: product.name,      // Snapshot
  costPrice: product.costPrice,   // Snapshot
  unitPrice: selectedPrice,       // Pode ser diferente do basePrice
  quantity: qty,
  subtotal: selectedPrice * qty,
};
```

**Benefício:** Histórico imutável, mesmo se produto for alterado.

---

### 9. Sistema de Dados Demo

**Arquivo:** `/src/app/lib/seed.ts`

Popula o localStorage com dados de exemplo na primeira vez.

**Dados criados:**
- 5 produtos de exemplo
- 3 vendas de exemplo

**Execução:**
```typescript
// Em App.tsx
useEffect(() => {
  seedDemoData();
}, []);
```

**Verificação:**
```typescript
export const seedDemoData = () => {
  const products = getProducts();
  if (products.length === 0) {
    // Criar produtos de exemplo
    // Criar vendas de exemplo
  }
};
```

---

### 10. Mobile-First e Responsividade

**Estratégias:**
- Max-width container: `max-w-screen-sm` (640px)
- Bottom Navigation fixa
- Cards empilhados verticalmente
- Inputs com altura touch-friendly (48px)
- Espaçamento generoso
- Texto legível (min 14px)

**Breakpoints (se necessário):**
```css
sm: 640px   /* Tablet pequeno */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
```

**Classe comum:**
```tsx
<div className="max-w-screen-sm mx-auto">
  {/* Conteúdo centralizado com largura máxima */}
</div>
```

---

### 11. Offline-First

**Estratégia:**
- 100% localStorage
- Sem chamadas de API
- Funciona sem internet
- Dados persistidos no navegador

**IDs Preparados para Sincronização Futura:**
- Uso de `crypto.randomUUID()` (compatível com UUIDs backend)
- Timestamps ISO 8601
- Estrutura de dados pronta para REST API

**Futura Sincronização (não implementado):**
```typescript
// Pseudo-código
const syncToServer = async () => {
  const localSales = getSales();
  const response = await fetch('/api/sales', {
    method: 'POST',
    body: JSON.stringify(localSales),
  });
  // Atualizar IDs, marcar como sincronizado, etc.
};
```

---

## 🚀 Comandos e Scripts

### Desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

### Build de Produção
```bash
npm run build
# ou
pnpm build
```

### Instalação de Dependências
```bash
npm install
# ou
pnpm install
```

---

## 📊 Fluxo de Dados

### Cadastro de Produto
```
User Input → VendlyInput → State (useState)
           ↓
      Validação
           ↓
   saveProduct(storage.ts)
           ↓
    localStorage['vendly_products']
           ↓
      navigate('/produtos')
```

### Registro de Venda
```
User selects Product → Add to Cart → State (cartItems)
                                         ↓
                              Apply Discount/Additional
                                         ↓
                               Calculate Total
                                         ↓
                              saveSale(storage.ts)
                                         ↓
                        localStorage['vendly_sales']
                                         ↓
                            navigate('/vendas')
```

### Exibição de Análise Financeira
```
Load Sales → Filter by Period → Calculate Metrics
                                       ↓
                         ┌──────────────┴──────────────┐
                         ↓                             ↓
                   Revenue Total                  Cost Total
                         ↓                             ↓
                         └──────────────┬──────────────┘
                                        ↓
                              Profit = Revenue - Cost
                                        ↓
                         Margin = (Profit / Revenue) * 100
```

---

## 🎯 Metas de Performance

### Tempo de Carregamento
- **Inicial:** < 1s
- **Navegação entre páginas:** < 100ms (client-side routing)
- **Salvamento de dados:** < 50ms (localStorage)

### Tempo de Ação do Usuário
- **Registro de venda:** < 10s (objetivo principal)
- **Cadastro de produto:** < 30s
- **Busca de produto:** instantânea (filtro local)

### Tamanho do Bundle
- **Objetivo:** < 500KB (gzipped)
- **React + Router + Tailwind:** ~200KB
- **Componentes customizados:** ~50KB

---

## 🔐 Validações e Regras de Negócio

### Produtos
1. Nome não pode ser vazio
2. Preço de custo >= 0
3. Preço de venda >= 0
4. Status deve ser 'active' ou 'inactive'
5. Produtos inativos não aparecem em vendas

### Vendas
1. Deve ter pelo menos 1 item no carrinho
2. Quantidade de cada item >= 1
3. Preço unitário de cada item >= 0
4. Data da venda é obrigatória
5. Desconto não pode ser maior que o subtotal
6. Se desconto percentual, deve ser entre 0 e 100

### Desconto/Acréscimo
1. Apenas um pode ser aplicado por venda
2. Valor deve ser >= 0
3. Percentual deve estar entre 0 e 100 (se aplicável)

---

## 🐛 Tratamento de Erros

### Produto não encontrado
```typescript
const product = getProductById(id);
if (!product) {
  navigate('/produtos'); // Redireciona se não existir
}
```

### Venda sem itens
```typescript
if (cartItems.length === 0) {
  // Botão "Registrar Venda" fica desabilitado
  return;
}
```

### LocalStorage indisponível
```typescript
try {
  localStorage.setItem(key, value);
} catch (error) {
  console.error('Erro ao salvar dados:', error);
  // Fallback: exibir mensagem ao usuário
}
```

---

## 🎨 Padrões de UX

### Estados Vazios
- Sempre exibir EmptyState quando não há dados
- Incluir ícone ilustrativo
- Mensagem clara e amigável
- Ação principal destacada

### Loading States
- Exibir LoadingState durante carregamento
- Simular delay de 300ms em salvamentos (UX realista)
- Desabilitar botões durante loading
- Indicador visual (spinner)

### Confirmações
- Sempre confirmar ações destrutivas (exclusões)
- ConfirmDialog com descrição clara
- Botão de confirmação em vermelho (variant="danger")
- Botão de cancelar sempre visível

### Feedback Visual
- Hover states em elementos clicáveis
- Foco visível em inputs (ring verde)
- Transições suaves (transition-colors)
- Sombras em cards clicáveis

---

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Navegadores móveis modernos (iOS Safari, Chrome Android)

### Devices
- ✅ Smartphones (iOS e Android)
- ✅ Tablets
- ✅ Desktop (funcionamento degradado da UX mobile)

### APIs Utilizadas
- `localStorage` - Persistência de dados
- `crypto.randomUUID()` - Geração de IDs únicos
- `Intl.NumberFormat` - Formatação de moeda
- `Intl.DateTimeFormat` - Formatação de datas

---

## 🔄 Próximos Passos (Futuro)

### Backend e Sincronização
- [ ] Implementar API REST com Node.js/Express
- [ ] Autenticação de usuários
- [ ] Sincronização bidirecional localStorage ↔ Server
- [ ] Resolução de conflitos

### Funcionalidades Avançadas
- [ ] Relatórios em PDF
- [ ] Gráficos de vendas (usando recharts)
- [ ] Categorias de produtos
- [ ] Histórico de preços
- [ ] Multi-loja (vários pontos de venda)
- [ ] Estoque integrado

### UX/UI
- [ ] Dark mode
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Atalhos de teclado
- [ ] Temas customizáveis

### Exportação de Dados
- [ ] Exportar vendas para Excel/CSV
- [ ] Backup automático
- [ ] Importar dados de planilhas

---

## 📚 Recursos de Aprendizado

### Documentação Oficial
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

### Bibliotecas Utilizadas
- [lucide-react](https://lucide.dev/) - Ícones
- [react-datepicker](https://reactdatepicker.com/) - Seletor de datas
- [date-fns](https://date-fns.org/) - Manipulação de datas

---

## 🏁 Conclusão

O **Vendly** é uma aplicação completa de gerenciamento de vendas, construída com tecnologias modernas e focada em:

✅ **Simplicidade** - Registro de venda em < 10 segundos  
✅ **Offline-First** - Funciona sem internet  
✅ **Mobile-First** - Otimizado para smartphones  
✅ **Análise Financeira** - Lucro e margem automáticos  
✅ **Flexibilidade** - Múltiplos produtos, descontos, acréscimos  

Toda a arquitetura foi pensada para escalar, permitindo futura integração com backend, multi-usuários, e sincronização na nuvem.

---

**Versão:** 1.0.0  
**Última Atualização:** 09/03/2026  
**Desenvolvido com:** ❤️ e ☕
