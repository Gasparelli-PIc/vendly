import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { Package, Search, Power } from 'lucide-react-native';

import { VendlyCard } from '@/components/VendlyCard';
import { VendlyInput } from '@/components/VendlyInput';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { VendlyButton } from '@/components/VendlyButton';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';

const formatCurrency = (val: number) => {
  const parts = val.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${parts.join(',')}`;
};

export default function Products() {
  const products = useStore(state => state.products);
  const updateProduct = useStore(state => state.updateProduct);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (product: Product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    updateProduct(product.id, { status: newStatus });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Produtos", headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 }}>Produtos</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{products.length} cadastrados</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Ativos</Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#16A34A' }}>
                    {products.filter(p => p.status === 'active').length}
                  </Text>
                </View>
              </View>
              
              <VendlyInput
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ height: 48 }}
              />
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              {products.length === 0 ? (
                <EmptyState
                  title="Nenhum produto cadastrado"
                  message="Você ainda não cadastrou nenhum produto. Comece adicionando."
                  actionLabel="Cadastrar Produto"
                  onAction={() => router.push('/products/new')}
                  icon={<Package size={64} color="#9CA3AF" />}
                />
              ) : filteredProducts.length === 0 ? (
                <EmptyState
                  title="Nenhum resultado"
                  message="Não encontramos produtos com esse nome."
                  icon={<Search size={64} color="#9CA3AF" />}
                />
              ) : (
                <View style={{ gap: 12 }}>
                  {filteredProducts.map((product) => (
                    <TouchableOpacity 
                      key={product.id}
                      activeOpacity={0.7}
                      onPress={() => router.push(`/products/${product.id}` as any)}
                    >
                      <VendlyCard>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 4 }} numberOfLines={1}>
                              {product.name}
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#16A34A', marginBottom: 8 }}>
                              {formatCurrency(product.basePrice)}
                            </Text>
                            <StatusBadge status={product.status} />
                          </View>
                          
                          <VendlyButton
                            variant={product.status === 'active' ? 'ghost' : 'outline'}
                            onPress={() => handleToggleStatus(product)}
                            style={{ paddingHorizontal: 12, height: 36, minWidth: undefined, flex: 0 }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <Power size={16} color={product.status === 'active' ? '#6B7280' : '#111827'} />
                              <Text style={{ 
                                fontWeight: '500', 
                                color: product.status === 'active' ? '#6B7280' : '#111827' 
                              }}>
                                {product.status === 'active' ? 'Desativar' : 'Ativar'}
                              </Text>
                            </View>
                          </VendlyButton>
                        </View>
                      </VendlyCard>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

          </View>
        </ScrollView>
        <FloatingActionButton to="/products/new" />
      </View>
    </>
  );
}