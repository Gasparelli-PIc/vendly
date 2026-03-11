import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { VendlyButton } from '@/components/VendlyButton';
import { VendlyCard } from '@/components/VendlyCard';
import { Sale } from '@/lib/types';
import { useStore } from '@/lib/store';

const formatCurrency = (val: number) => {
  const parts = val.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${parts.join(',')}`;
};
const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

export default function SaleDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const deleteSale = useStore(state => state.deleteSale);
  const insets = useSafeAreaInsets();

  const [sale, setSale] = useState<Sale | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (id) {
      const data = useStore.getState().sales.find(s => s.id === id);
      if (data) {
        setSale(data);
      } else {
         Alert.alert("Erro", "Venda não encontrada");
         router.back();
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

  const custoTotal = sale.items.reduce((sum, item) => sum + ((item.costPrice || 0) * item.quantity), 0);
  const lucroTotal = sale.totalValue - custoTotal;
  const margemLucro = sale.subtotal > 0 ? (lucroTotal / sale.subtotal) * 100 : 0;

  return (
    <>
      <Stack.Screen options={{ title: "Detalhes da Venda", headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 96, flexGrow: 1 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: insets.top + 24, paddingBottom: 16 }}>
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
              
              <VendlyCard style={{ padding: 0, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(22, 163, 74, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingCart size={20} color="#16A34A" />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                    Produtos ({sale.items.length})
                  </Text>
                </View>
                
                <View>
                  {sale.items.map((item, index) => (
                    <View 
                      key={index} 
                      style={{ 
                        padding: 16, 
                        borderBottomWidth: index === sale.items.length - 1 ? 0 : 1, 
                        borderBottomColor: '#F9FAFB',
                        gap: 4
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#111827', flex: 1, marginRight: 16 }}>
                          {item.productName}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#16A34A' }}>
                          {formatCurrency(item.subtotal)}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: '#6B7280' }}>
                          Qtd: {item.quantity}  •  Venda un: {formatCurrency(item.unitPrice)}
                        </Text>
                        <Text style={{ fontSize: 13, color: '#6B7280' }}>
                          Custo un: {formatCurrency(item.costPrice || 0)}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, fontWeight: '500', color: '#16A34A' }}>
                          Lucro un: {formatCurrency(item.unitPrice - (item.costPrice || 0))}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </VendlyCard>

              {/* Total Summary */}
              <VendlyCard style={{ backgroundColor: '#F9FAFB', borderWidth: 0 }}>
                <View style={{ gap: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>Total Bruto</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>{formatCurrency(sale.subtotal)}</Text>
                  </View>
                  
                  {sale.discountAmount && sale.discountAmount > 0 ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#6B7280' }}>
                        Desconto {sale.discountType === 'percentage' ? `(${sale.discountValue}%)` : ''}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: '#DC2626' }}>- {formatCurrency(sale.discountAmount)}</Text>
                    </View>
                  ) : null}
                  
                  {sale.additionalAmount && sale.additionalAmount > 0 ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#6B7280' }}>
                        Acréscimo {sale.additionalType === 'percentage' ? `(${sale.additionalValue}%)` : ''}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: '#16A34A' }}>+ {formatCurrency(sale.additionalAmount)}</Text>
                    </View>
                  ) : null}

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>Custo Total</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#DC2626' }}>{formatCurrency(custoTotal)}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>Lucro</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#16A34A' }}>{formatCurrency(lucroTotal)}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>Margem de Lucro</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#16A34A' }}>{margemLucro.toFixed(2)}%</Text>
                  </View>

                  <View style={{ 
                    borderTopWidth: 1, 
                    borderTopColor: '#E5E7EB', 
                    paddingTop: 12, 
                    marginTop: 4, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Total Líquido</Text>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#16A34A' }}>{formatCurrency(sale.totalValue)}</Text>
                  </View>
                </View>
              </VendlyCard>

              {/* Actions */}
              <View style={{ gap: 12, marginTop: 16 }}>
                <VendlyButton
                  variant="primary"
                  onPress={() => router.push({ pathname: '/sales/edit', params: { id: sale.id } })}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '500' }}>Editar Venda</Text>
                </VendlyButton>
                
                <VendlyButton
                  variant="outline"
                  onPress={confirmDelete}
                  style={{ borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }}
                  textStyle={{ color: '#DC2626' }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Trash2 size={18} color="#DC2626" />
                    <Text style={{ color: '#DC2626', fontWeight: '500' }}>Excluir Venda</Text>
                  </View>
                </VendlyButton>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
