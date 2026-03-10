import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react-native';

import { VendlyButton } from '@/components/VendlyButton';
import { VendlyCard } from '@/components/VendlyCard';
import { Sale } from '@/lib/types';

// Mocks
const getSaleById = (id: string): Sale | null => null;
const deleteSale = (id: string) => {};
const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`;
const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

export default function SaleDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sale, setSale] = useState<Sale | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (id) {
      const data = getSaleById(id);
      if (data) {
        setSale(data);
      } else {
        // Mock data
        setSale({
          id: id,
          items: [
            { productId: '1', productName: 'Produto Mockado', costPrice: 10, unitPrice: 20, quantity: 2, subtotal: 40 }
          ],
          subtotal: 40,
          totalValue: 40,
          date: new Date().toISOString().split('T')[0],
          createdAt: '',
          updatedAt: ''
        });
      }
      setLoadingData(false);
    }
  }, [id]);

  const confirmDelete = () => {
    if (!id) return;

    Alert.alert(
      "Excluir Venda",
      "Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
             deleteSale(id);
             router.back();
          }
        }
      ]
    );
  };

  if (loadingData || !sale) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Detalhes da Venda", headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 96, flexGrow: 1 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7280' }}>Voltar</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827' }}>
                Detalhes da Venda
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>
                Realizada em {formatDate(sale.date)}
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16, gap: 16 }}>
              
              <VendlyCard>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <ShoppingCart size={20} color="#16A34A" />
                  <Text style={{ fontWeight: '600', color: '#111827' }}>Itens da Venda ({sale.items.length})</Text>
                </View>
                
                <View style={{ gap: 12 }}>
                  {sale.items.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#F9FAFB', borderRadius: 12 }}>
                      <View style={{ flex: 1, marginRight: 12 }}>
                        <Text style={{ fontWeight: '500', color: '#111827' }} numberOfLines={1}>{item.productName}</Text>
                        <Text style={{ fontSize: 14, color: '#6B7280' }}>
                          {item.quantity}x {formatCurrency(item.unitPrice)}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '600', color: '#16A34A' }}>
                          {formatCurrency(item.subtotal)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </VendlyCard>

              {/* Total Summary */}
              <VendlyCard style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', borderColor: 'rgba(22, 163, 74, 0.2)' }}>
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#6B7280' }}>Subtotal</Text>
                    <Text style={{ fontWeight: '500', color: '#111827' }}>{formatCurrency(sale.subtotal)}</Text>
                  </View>
                  
                  {sale.discountAmount && sale.discountAmount > 0 ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#6B7280' }}>Desconto</Text>
                      <Text style={{ fontWeight: '500', color: '#DC2626' }}>- {formatCurrency(sale.discountAmount)}</Text>
                    </View>
                  ) : null}
                  
                  {sale.additionalAmount && sale.additionalAmount > 0 ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#6B7280' }}>Acréscimo</Text>
                      <Text style={{ fontWeight: '500', color: '#16A34A' }}>+ {formatCurrency(sale.additionalAmount)}</Text>
                    </View>
                  ) : null}

                  <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(22, 163, 74, 0.2)', paddingTop: 8, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', color: '#111827' }}>Total</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#16A34A' }}>{formatCurrency(sale.totalValue)}</Text>
                  </View>
                </View>
              </VendlyCard>

              {/* Actions */}
              <View style={{ gap: 12, marginTop: 8 }}>
                <VendlyButton
                  variant="danger"
                  onPress={confirmDelete}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Trash2 size={20} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontWeight: '500' }}>Excluir Venda</Text>
                  </View>
                </VendlyButton>
                <VendlyButton
                  variant="ghost"
                  onPress={() => router.back()}
                >
                  Voltar
                </VendlyButton>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
