import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { VendlyCard } from '@/components/VendlyCard';
import { EmptyState } from '@/components/EmptyState';
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react-native';
import { Sale } from '@/lib/types';
import { VendlyDatePicker } from '@/components/VendlyDatePicker';

// Se essas funções já existirem no seu lib/storage.ts ou lib/utils.ts, descomente e use-as.
// import { getTodaySales, getWeekSales, getMonthSales, getSalesByDateRange } from '@/lib/storage';
// import { formatCurrency, getTodayFormatted } from '@/lib/utils';

// Mocks temporários para a tela funcionar e não quebrar. Substitua pelas importações reais.
const getTodaySales = (): Sale[] => [];
const getWeekSales = (): Sale[] => [];
const getMonthSales = (): Sale[] => [];
const getSalesByDateRange = (s: string, e: string): Sale[] => [];
const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`;
const getTodayFormatted = () => new Date().toLocaleDateString('pt-BR');


type FilterType = 'today' | 'week' | 'month' | 'custom';

export default function Dashboard() {
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

  const totalBruto = sales.reduce((sum, sale) => sum + sale.subtotal, 0);
  const totalDescontos = sales.reduce((sum, sale) => sum + (sale.discountAmount || 0), 0);
  const totalAcrescimos = sales.reduce((sum, sale) => sum + (sale.additionalAmount || 0), 0);
  const totalLiquido = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
  
  const totalCusto = sales.reduce((sum, sale) => {
    const saleCost = sale.items.reduce((itemSum, item) => 
      itemSum + (item.costPrice * item.quantity), 0
    );
    return sum + saleCost;
  }, 0);
  
  const totalLucro = totalLiquido - totalCusto;
  const margemLucro = totalBruto > 0 ? (totalLucro / totalBruto) * 100 : 0;

  const recentSales = sales.slice(0, 5);

  return (
    <>
      <Stack.Screen options={{ title: "Dashboard" }} />
      <ScrollView style={{ flex: 1, backgroundColor: "#F9FAFB" }} contentContainerStyle={{ paddingBottom: 96 }}>
        <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
          {/* Hero Section */}
          <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 4 }}>
                Vendly
              </Text>
              <Text style={{ color: "#6B7280", textTransform: "capitalize" }}>
                {getTodayFormatted()}
              </Text>
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

          <View style={{ padding: 16, gap: 16 }}>
            {/* Main Financial Summary */}
            {sales.length > 0 ? (
              <>
                {/* Revenue Cards */}
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <VendlyCard style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                      <View style={{ width: 40, height: 40, backgroundColor: 'rgba(22, 163, 74, 0.1)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <DollarSign size={20} color="#16A34A" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Total Líquido</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }} numberOfLines={1}>
                          {formatCurrency(totalLiquido)}
                        </Text>
                      </View>
                    </View>
                  </VendlyCard>

                  <VendlyCard style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                      <View style={{ width: 40, height: 40, backgroundColor: 'rgba(22, 163, 74, 0.1)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} color="#16A34A" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Lucro</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#16A34A' }} numberOfLines={1}>
                          {formatCurrency(totalLucro)}
                        </Text>
                      </View>
                    </View>
                  </VendlyCard>
                </View>

                {/* Detailed Financial Breakdown */}
                <VendlyCard>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Percent size={20} color="#16A34A" />
                    <Text style={{ fontWeight: '600', color: '#111827', fontSize: 16 }}>Resumo Financeiro</Text>
                  </View>
                  
                  <View style={{ gap: 12 }}>
                    {/* Total Bruto */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                      <Text style={{ fontSize: 14, color: '#6B7280' }}>Total Bruto</Text>
                      <Text style={{ fontWeight: '600', color: '#111827' }}>
                        {formatCurrency(totalBruto)}
                      </Text>
                    </View>

                    {/* Descontos */}
                    {totalDescontos > 0 && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                        <Text style={{ fontSize: 14, color: '#6B7280' }}>Desconto de Venda</Text>
                        <Text style={{ fontWeight: '600', color: '#DC2626' }}>
                          - {formatCurrency(totalDescontos)}
                        </Text>
                      </View>
                    )}

                    {/* Acréscimos */}
                    {totalAcrescimos > 0 && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                        <Text style={{ fontSize: 14, color: '#6B7280' }}>Acréscimo de Venda</Text>
                        <Text style={{ fontWeight: '600', color: '#16A34A' }}>
                          + {formatCurrency(totalAcrescimos)}
                        </Text>
                      </View>
                    )}

                    {/* Total Líquido */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>Total Líquido</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#16A34A' }}>
                        {formatCurrency(totalLiquido)}
                      </Text>
                    </View>

                    {/* Custo Total */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                      <Text style={{ fontSize: 14, color: '#6B7280' }}>Custo Total</Text>
                      <Text style={{ fontWeight: '600', color: '#111827' }}>
                        {formatCurrency(totalCusto)}
                      </Text>
                    </View>

                    {/* Lucro */}
                    <View style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', borderRadius: 8, padding: 12, marginTop: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 2 }}>Lucro</Text>
                          <Text style={{ fontSize: 12, color: '#6B7280' }}>
                            Margem: {margemLucro.toFixed(1)}%
                          </Text>
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#16A34A' }}>
                          {formatCurrency(totalLucro)}
                        </Text>
                      </View>
                    </View>

                    {/* Stats */}
                    <View style={{ flexDirection: 'row', gap: 12, paddingTop: 8 }}>
                      <View style={{ flex: 1, alignItems: 'center', padding: 8, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Vendas</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>{sales.length}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center', padding: 8, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Ticket Médio</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
                          {formatCurrency(sales.length > 0 ? totalLiquido / sales.length : 0)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </VendlyCard>
              </>
            ) : (
              <VendlyCard>
                <EmptyState
                  title="Nenhuma venda no período"
                  message="Não há vendas para o período selecionado. Registre uma nova venda."
                  actionLabel="Registrar Venda"
                  onAction={() => router.push('/sales')}
                />
              </VendlyCard>
            )}

            {/* Recent Sales */}
            {recentSales.length > 0 && (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
                    Últimas Vendas
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/sales')}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#16A34A' }}>
                      Ver todas
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={{ gap: 12 }}>
                  {recentSales.map((sale) => {
                    const saleCost = sale.items.reduce((sum, item) => 
                      sum + (item.costPrice * item.quantity), 0
                    );
                    const saleProfit = sale.totalValue - saleCost;

                    return (
                      <TouchableOpacity 
                        key={sale.id}
                        onPress={() => router.push('/sales')}
                        activeOpacity={0.7}
                      >
                        <VendlyCard>
                          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginRight: 16 }}>
                              <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>
                                {new Date(sale.date).toLocaleDateString('pt-BR')}
                              </Text>
                              {sale.items.length === 1 ? (
                                <View>
                                  <Text style={{ fontWeight: '500', color: '#111827', fontSize: 16 }} numberOfLines={1}>
                                    {sale.items[0].productName}
                                  </Text>
                                  <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
                                    {sale.items[0].quantity}x {formatCurrency(sale.items[0].unitPrice)}
                                  </Text>
                                </View>
                              ) : (
                                <View>
                                  <Text style={{ fontWeight: '500', color: '#111827', fontSize: 16 }}>
                                    {sale.items.length} produtos
                                  </Text>
                                  <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }} numberOfLines={1}>
                                    {sale.items.map(item => `${item.quantity}x ${item.productName}`).join(', ')}
                                  </Text>
                                </View>
                              )}
                            </View>
                            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                              <Text style={{ fontWeight: '600', color: '#16A34A', fontSize: 16 }}>
                                {formatCurrency(sale.totalValue)}
                              </Text>
                              <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                                Lucro: {formatCurrency(saleProfit)}
                              </Text>
                            </View>
                          </View>
                        </VendlyCard>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
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