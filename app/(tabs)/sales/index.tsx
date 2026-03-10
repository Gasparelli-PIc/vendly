import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { Calendar, Trash2 } from 'lucide-react-native';

import { VendlyCard } from '@/components/VendlyCard';
import { EmptyState } from '@/components/EmptyState';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { VendlyDatePicker } from '@/components/VendlyDatePicker';
import { Sale } from '@/lib/types';

// Mocks temporários para o funcionamento sem o backend final
const getTodaySales = (): Sale[] => [];
const getWeekSales = (): Sale[] => [];
const getMonthSales = (): Sale[] => [];
const getSalesByDateRange = (s: string, e: string): Sale[] => [];
const deleteSale = (id: string) => {};
const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`;
const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');



type FilterType = 'today' | 'week' | 'month' | 'custom';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filter, setFilter] = useState<FilterType>('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    let data: Sale[] = [];
    
    switch (filter) {
      case 'today':
        data = getTodaySales();
        break;
      case 'week':
        data = getWeekSales();
        break;
      case 'month':
        data = getMonthSales();
        break;
      case 'custom':
        data = getSalesByDateRange(customStartDate, customEndDate);
        break;
    }
    
    setSales(data);
  }, [filter, customStartDate, customEndDate]);

  const handleDelete = (id: string) => {
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
            // setFilter(filter) para forçar reload das vendas caso já implementem hook customizado depois
          }
        }
      ]
    );
  };

  const handleViewDetails = (sale: Sale) => {
    // Navigate to sale details screen instead of sheet for now
    router.push(`/sales/${sale.id}` as any);
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.totalValue, 0);

  return (
    <>
      <Stack.Screen options={{ title: "Vendas", headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 }}>Vendas</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{sales.length} no período</Text>
                </View>
                {sales.length > 0 && (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Total</Text>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#16A34A' }}>
                      {formatCurrency(totalSales)}
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Filter Tabs */}
              <View style={{ gap: 12 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
                  style={{ marginHorizontal: -4 }}
                >
                  <FilterButton
                    active={filter === 'today'}
                    onClick={() => setFilter('today')}
                    label="Hoje"
                  />
                  <FilterButton
                    active={filter === 'week'}
                    onClick={() => setFilter('week')}
                    label="Semana"
                  />
                  <FilterButton
                    active={filter === 'month'}
                    onClick={() => setFilter('month')}
                    label="Mês"
                  />
                  <FilterButton
                    active={filter === 'custom'}
                    onClick={() => setFilter('custom')}
                    label="Personalizado"
                    icon={Calendar}
                  />
                </ScrollView>

                {/* Custom Date Range */}
                {filter === 'custom' && (
                  <VendlyCard style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>De</Text>
                        <VendlyDatePicker
                          value={customStartDate}
                          onChange={(date) => setCustomStartDate(date)}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>Até</Text>
                        <VendlyDatePicker
                          value={customEndDate}
                          onChange={(date) => setCustomEndDate(date)}
                        />
                      </View>
                    </View>
                  </VendlyCard>
                )}
              </View>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              {/* Sales List */}
              {sales.length === 0 ? (
                <EmptyState
                  title="Nenhuma venda registrada"
                  message="Não há vendas para o período selecionado. Registre uma nova venda."
                  actionLabel="Registrar Venda"
                  onAction={() => router.push('/sales/new')}
                />
              ) : (
                <View style={{ gap: 12 }}>
                  {sales.map((sale) => (
                    <TouchableOpacity 
                      key={sale.id}
                      activeOpacity={0.7}
                      onPress={() => handleViewDetails(sale)}
                    >
                      <VendlyCard>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                              {formatDate(sale.date)}
                            </Text>
                            
                            {sale.items.length === 1 ? (
                              <>
                                <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 4 }} numberOfLines={1}>
                                  {sale.items[0].productName}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>
                                  Qtd: {sale.items[0].quantity} · {formatCurrency(sale.items[0].unitPrice)}/un
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 4 }}>
                                  Venda com {sale.items.length} produtos
                                </Text>
                                <View style={{ gap: 4, marginBottom: 8 }}>
                                  {sale.items.map((item, idx) => (
                                    <Text key={idx} style={{ fontSize: 14, color: '#6B7280' }}>
                                      {item.quantity}x {item.productName} - {formatCurrency(item.subtotal)}
                                    </Text>
                                  ))}
                                </View>
                              </>
                            )}
                            
                            {(Boolean(sale.discountAmount) || Boolean(sale.additionalAmount)) && (
                              <View style={{ gap: 2, marginBottom: 8 }}>
                                {Boolean(sale.discountAmount) && (
                                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Desconto: -{formatCurrency(sale.discountAmount!)}</Text>
                                )}
                                {Boolean(sale.additionalAmount) && (
                                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Acréscimo: +{formatCurrency(sale.additionalAmount!)}</Text>
                                )}
                              </View>
                            )}
                            
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#16A34A' }}>
                              {formatCurrency(sale.totalValue)}
                            </Text>
                          </View>
                          
                          <TouchableOpacity
                            onPress={() => handleDelete(sale.id)}
                            style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(220, 38, 38, 0.05)', borderRadius: 8 }}
                          >
                            <Trash2 size={16} color="#DC2626" />
                          </TouchableOpacity>
                        </View>
                      </VendlyCard>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

          </View>
        </ScrollView>
        <FloatingActionButton to="/sales/new" />
      </View>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  icon: Icon
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: any;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={{
        paddingHorizontal: 16,
        height: 36,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: active ? '#16A34A' : '#FFFFFF',
        borderWidth: active ? 0 : 1,
        borderColor: '#E5E7EB',
      }}
    >
      {Icon && <Icon size={16} color={active ? '#FFFFFF' : '#6B7280'} />}
      <Text style={{
        fontWeight: '500',
        fontSize: 14,
        color: active ? '#FFFFFF' : '#6B7280',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}