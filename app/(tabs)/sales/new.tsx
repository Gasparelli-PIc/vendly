import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack, router, useFocusEffect } from 'expo-router';
import { ArrowLeft, Plus, Trash2, Percent, DollarSign, ShoppingCart, ChevronDown } from 'lucide-react-native';

import { VendlyButton } from '@/components/VendlyButton';
import { VendlyInput } from '@/components/VendlyInput';
import { VendlyCard } from '@/components/VendlyCard';
import { VendlyDatePicker } from '@/components/VendlyDatePicker';
import { Product, SaleItem } from '@/lib/types';

import { useStore } from '@/lib/store';

const formatCurrency = (val: number) => {
  const parts = val.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${parts.join(',')}`;
};

const formatCurrencyInput = (val: string) => {
  if (!val) return '';
  const numeric = val.replace(/\D/g, '');
  if (!numeric) return '';
  const parsed = parseInt(numeric, 10) / 100;
  const parts = parsed.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(',');
};

const parseCurrencyInput = (val: string) => {
  if (!val) return 0;
  return parseFloat(val.replace(/\./g, '').replace(',', '.'));
};

export default function NewSale() {
  const allProducts = useStore(state => state.products);
  const storeProducts = allProducts.filter(p => p.status === 'active');
  const addSale = useStore(state => state.addSale);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<SaleItem[]>([]);
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Current item being added
  const [currentProductId, setCurrentProductId] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('1');
  const [currentPrice, setCurrentPrice] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Adjustments
  const [adjustmentMode, setAdjustmentMode] = useState<'none' | 'discount' | 'additional'>('none');
  const [discountType, setDiscountType] = useState<'percentage' | 'value'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [additionalType, setAdditionalType] = useState<'percentage' | 'value'>('percentage');
  const [additionalValue, setAdditionalValue] = useState('');

  useFocusEffect(
    useCallback(() => {
      setCartItems([]);
      setSaleDate(new Date().toISOString().split('T')[0]);
      setCurrentProductId('');
      setCurrentQuantity('1');
      setCurrentPrice('');
      setAdjustmentMode('none');
      setDiscountType('percentage');
      setDiscountValue('');
      setAdditionalType('percentage');
      setAdditionalValue('');
    }, [])
  );

  const handleCancel = () => {
    router.push('/sales');
  };

  useEffect(() => {
    setProducts(storeProducts);
  }, [storeProducts]);

  const selectedProduct = products.find(p => p.id === currentProductId);


  const handleAddItem = () => {
    if (!selectedProduct || !currentPrice || !currentQuantity) return;
    const price = parseCurrencyInput(currentPrice);
    const qty = parseInt(currentQuantity);

    if (isNaN(price) || price <= 0 || isNaN(qty) || qty <= 0) return;

    const newItem: SaleItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      costPrice: selectedProduct.costPrice,
      unitPrice: price,
      quantity: qty,
      subtotal: price * qty,
    };

    setCartItems([...cartItems, newItem]);
    
    // Reset form
    setCurrentProductId('');
    setCurrentQuantity('1');
    setCurrentPrice('');
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Calculate discount
  let discountAmount = 0;
  if (adjustmentMode === 'discount' && discountValue) {
    const discount = discountType === 'value' ? parseCurrencyInput(discountValue) : parseFloat(discountValue.replace(',', '.'));
    if (!isNaN(discount) && discount > 0) {
      if (discountType === 'percentage') {
        discountAmount = (cartSubtotal * discount) / 100;
      } else {
        discountAmount = discount;
      }
    }
  }

  // Calculate additional
  let additionalAmount = 0;
  if (adjustmentMode === 'additional' && additionalValue) {
    const additional = additionalType === 'value' ? parseCurrencyInput(additionalValue) : parseFloat(additionalValue.replace(',', '.'));
    if (!isNaN(additional) && additional > 0) {
      if (additionalType === 'percentage') {
        additionalAmount = (cartSubtotal * additional) / 100;
      } else {
        additionalAmount = additional;
      }
    }
  }

  const total = cartSubtotal - discountAmount + additionalAmount;

  const handleSubmit = () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    
    setTimeout(() => {
      addSale({
        items: cartItems,
        subtotal: cartSubtotal,
        discountType: adjustmentMode === 'discount' ? discountType : undefined,
        discountValue: adjustmentMode === 'discount' && discountValue ? parseCurrencyInput(discountValue) : undefined,
        discountAmount: discountAmount > 0 ? discountAmount : undefined,
        additionalType: adjustmentMode === 'additional' ? additionalType : undefined,
        additionalValue: adjustmentMode === 'additional' && additionalValue ? parseCurrencyInput(additionalValue) : undefined,
        additionalAmount: additionalAmount > 0 ? additionalAmount : undefined,
        totalValue: total,
        date: saleDate,
      });

      setLoading(false);
      handleCancel();
    }, 300);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Nova Venda", headerShown: false }} />
      <KeyboardAvoidingView 
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 96, flexGrow: 1 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
              <TouchableOpacity
                onPress={handleCancel}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7280' }}>Voltar</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827' }}>
                Nova Venda
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16, gap: 16 }}>
              
              {/* Add Product */}
              <VendlyCard>
                <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 16 }}>Adicionar Produto</Text>
                
                <View style={{ gap: 16 }}>
                  {/* Fake Select for Product */}
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 8 }}>
                      Produto
                    </Text>
                    <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{
                        width: '100%',
                        height: 48,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: isDropdownOpen ? '#16A34A' : '#E5E7EB',
                        backgroundColor: '#FFFFFF',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text style={{ color: currentProductId ? '#111827' : '#9CA3AF', fontSize: 16 }}>
                        {currentProductId && selectedProduct 
                          ? `${selectedProduct.name} - ${formatCurrency(selectedProduct.basePrice)}` 
                          : 'Selecione um produto'}
                      </Text>
                      <View style={{ transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] }}>
                        <ChevronDown size={20} color={isDropdownOpen ? '#16A34A' : '#9CA3AF'} />
                      </View>
                    </TouchableOpacity>

                    {isDropdownOpen && (
                      <View style={{
                        marginTop: 4,
                        borderWidth: 2,
                        borderColor: '#E5E7EB',
                        borderRadius: 12,
                        backgroundColor: '#FFFFFF',
                        overflow: 'hidden'
                      }}>
                        <TouchableOpacity 
                          style={{ paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
                          onPress={() => {
                            setCurrentProductId('');
                            setCurrentPrice('');
                            setIsDropdownOpen(false);
                          }}
                        >
                          <Text style={{ color: '#6B7280', fontSize: 16 }}>Selecione um produto</Text>
                        </TouchableOpacity>
                        
                        {products.map((p, index) => (
                          <TouchableOpacity
                            key={p.id}
                            style={{ 
                              paddingHorizontal: 16, 
                              paddingVertical: 14, 
                              borderBottomWidth: index === products.length - 1 ? 0 : 1, 
                              borderBottomColor: '#F3F4F6', 
                              backgroundColor: p.id === currentProductId ? 'rgba(22, 163, 74, 0.05)' : '#FFFFFF' 
                            }}
                            onPress={() => {
                                setCurrentProductId(p.id);
                                setCurrentPrice(formatCurrencyInput(p.basePrice.toFixed(2)));
                                setIsDropdownOpen(false);
                            }}
                          >
                            <Text style={{ 
                              color: p.id === currentProductId ? '#16A34A' : '#111827', 
                              fontWeight: p.id === currentProductId ? '600' : 'normal',
                              fontSize: 16
                            }}>
                              {p.name} - {formatCurrency(p.basePrice)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <VendlyInput
                        label="Preço"
                        placeholder="0,00"
                        keyboardType="numeric"
                        value={currentPrice}
                        onChangeText={(text) => setCurrentPrice(formatCurrencyInput(text))}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <VendlyInput
                        label="Quantidade"
                        placeholder="1"
                        keyboardType="numeric"
                        value={currentQuantity}
                        onChangeText={(text) => setCurrentQuantity(text.replace(/\D/g, ''))}
                      />
                    </View>
                  </View>

                  <VendlyButton
                    variant="outline"
                    onPress={handleAddItem}
                    disabled={!currentProductId || !currentPrice || !currentQuantity}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Plus size={20} color={(!currentProductId || !currentPrice || !currentQuantity) ? '#9CA3AF' : '#111827'} />
                      <Text style={{ fontWeight: '500', color: (!currentProductId || !currentPrice || !currentQuantity) ? '#9CA3AF' : '#111827' }}>
                        Adicionar ao Carrinho
                      </Text>
                    </View>
                  </VendlyButton>
                </View>
              </VendlyCard>

              {/* Cart Items */}
              {cartItems.length > 0 && (
                <VendlyCard>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <ShoppingCart size={20} color="#16A34A" />
                    <Text style={{ fontWeight: '600', color: '#111827' }}>Itens da Venda ({cartItems.length})</Text>
                  </View>
                  
                  <View style={{ gap: 12 }}>
                    {cartItems.map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#F9FAFB', borderRadius: 12 }}>
                        <View style={{ flex: 1, marginRight: 12 }}>
                          <Text style={{ fontWeight: '500', color: '#111827' }} numberOfLines={1}>{item.productName}</Text>
                          <Text style={{ fontSize: 14, color: '#6B7280' }}>
                            {item.quantity}x {formatCurrency(item.unitPrice)}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                          <Text style={{ fontWeight: '600', color: '#16A34A' }}>
                            {formatCurrency(item.subtotal)}
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleRemoveItem(index)}
                            style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: 8 }}
                          >
                            <Trash2 size={16} color="#DC2626" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </VendlyCard>
              )}

              {/* Data da Venda */}
              <VendlyCard>
                <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 12 }}>Data da Venda</Text>
                <VendlyDatePicker
                  value={saleDate}
                  onChange={(date) => setSaleDate(date)}
                />
              </VendlyCard>

              {/* Adjustments */}
              {cartItems.length > 0 && (
                <VendlyCard>
                  <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 12 }}>Ajuste de valor (opcional)</Text>
                  
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    {(['none', 'discount', 'additional'] as const).map((mode) => (
                      <TouchableOpacity
                        key={mode}
                        activeOpacity={0.7}
                        onPress={() => {
                          setAdjustmentMode(mode);
                          if (mode === 'none') {
                            setDiscountValue('');
                            setAdditionalValue('');
                          } else if (mode === 'discount') {
                            setAdditionalValue('');
                          } else {
                            setDiscountValue('');
                          }
                        }}
                        style={{
                          flex: 1,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: adjustmentMode === mode ? '#16A34A' : '#E5E7EB',
                          backgroundColor: adjustmentMode === mode ? 'rgba(22, 163, 74, 0.05)' : '#FFFFFF'
                        }}
                      >
                        <Text style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: adjustmentMode === mode ? '#16A34A' : '#6B7280'
                        }}>
                          {mode === 'none' ? 'Nenhum' : mode === 'discount' ? 'Desconto' : 'Acréscimo'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {adjustmentMode !== 'none' && (
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <VendlyInput
                          placeholder={adjustmentMode === 'discount' && discountType === 'percentage' ? '0' : '0,00'}
                          keyboardType="numeric"
                          value={adjustmentMode === 'discount' ? discountValue : additionalValue}
                          onChangeText={(text) => {
                            if (adjustmentMode === 'discount') {
                              const formatted = discountType === 'value' ? formatCurrencyInput(text) : text.replace(/[^0-9,]/g, '');
                              setDiscountValue(formatted);
                            } else {
                              const formatted = additionalType === 'value' ? formatCurrencyInput(text) : text.replace(/[^0-9,]/g, '');
                              setAdditionalValue(formatted);
                            }
                          }}
                        />
                      </View>
                      
                      <View style={{ flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4 }}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => adjustmentMode === 'discount' ? setDiscountType('percentage') : setAdditionalType('percentage')}
                          style={{
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor: (adjustmentMode === 'discount' ? discountType : additionalType) === 'percentage' ? '#FFFFFF' : 'transparent',
                          }}
                        >
                          <Percent size={20} color={(adjustmentMode === 'discount' ? discountType : additionalType) === 'percentage' ? '#16A34A' : '#6B7280'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => adjustmentMode === 'discount' ? setDiscountType('value') : setAdditionalType('value')}
                          style={{
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor: (adjustmentMode === 'discount' ? discountType : additionalType) === 'value' ? '#FFFFFF' : 'transparent',
                          }}
                        >
                          <DollarSign size={20} color={(adjustmentMode === 'discount' ? discountType : additionalType) === 'value' ? '#16A34A' : '#6B7280'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </VendlyCard>
              )}

              {/* Total Summary */}
              {cartItems.length > 0 && (
                <VendlyCard style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', borderColor: 'rgba(22, 163, 74, 0.2)' }}>
                  <View style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#6B7280' }}>Subtotal</Text>
                      <Text style={{ fontWeight: '500', color: '#111827' }}>{formatCurrency(cartSubtotal)}</Text>
                    </View>
                    
                    {discountAmount > 0 && (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#6B7280' }}>Desconto</Text>
                        <Text style={{ fontWeight: '500', color: '#DC2626' }}>- {formatCurrency(discountAmount)}</Text>
                      </View>
                    )}
                    
                    {additionalAmount > 0 && (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#6B7280' }}>Acréscimo</Text>
                        <Text style={{ fontWeight: '500', color: '#16A34A' }}>+ {formatCurrency(additionalAmount)}</Text>
                      </View>
                    )}

                    <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(22, 163, 74, 0.2)', paddingTop: 8, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontWeight: '600', color: '#111827' }}>Total</Text>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#16A34A' }}>{formatCurrency(total)}</Text>
                    </View>
                  </View>
                </VendlyCard>
              )}

              {/* Actions */}
              <View style={{ gap: 12, marginTop: 8 }}>
                 <VendlyButton
                  variant="primary"
                  loading={loading}
                  disabled={cartItems.length === 0}
                  onPress={handleSubmit}
                >
                  Salvar Venda
                </VendlyButton>
                <VendlyButton
                  variant="ghost"
                  onPress={handleCancel}
                >
                  Cancelar
                </VendlyButton>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
