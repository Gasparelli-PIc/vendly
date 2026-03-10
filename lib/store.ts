import { create } from 'zustand';
import { Product, Sale } from './types';

interface StoreState {
  products: Product[];
  sales: Sale[];
  
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Sale actions
  addSale: (sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteSale: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  sales: [],

  addProduct: (product) => set((state) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { products: [...state.products, newProduct] };
  }),

  updateProduct: (id, data) => set((state) => ({
    products: state.products.map((p) => 
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    )
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),

  addSale: (sale) => set((state) => {
    const newSale: Sale = {
      ...sale,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { sales: [newSale, ...state.sales] }; // prepend new sales
  }),

  deleteSale: (id) => set((state) => ({
    sales: state.sales.filter((s) => s.id !== id)
  })),
}));
