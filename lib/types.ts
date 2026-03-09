export interface Product {
  id: string;                    // UUID
  name: string;                  // Nome do produto
  costPrice: number;             // Preço de custo
  basePrice: number;             // Preço de venda base
  status: 'active' | 'inactive'; // Status do produto
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}

export interface SaleItem {
  productId: string;       // ID do produto
  productName: string;     // Nome (snapshot)
  costPrice: number;       // Custo (snapshot)
  unitPrice: number;       // Preço unitário de venda
  quantity: number;        // Quantidade vendida
  subtotal: number;        // unitPrice * quantity
}

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

export interface DashboardStats {
  todayTotal: number;    // Total de vendas hoje
  monthTotal: number;    // Total de vendas no mês
  recentSales: Sale[];   // Últimas 5 vendas
}
