import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { VendlyButton } from '@/components/VendlyButton';
import { VendlyInput } from '@/components/VendlyInput';
import { VendlyCard } from '@/components/VendlyCard';

import { useStore } from '@/lib/store';

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

export default function EditProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const updateProduct = useStore(state => state.updateProduct);
  const deleteProduct = useStore(state => state.deleteProduct);
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    costPrice: '',
    basePrice: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    if (id) {
      const product = useStore.getState().products.find(p => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          costPrice: formatCurrencyInput(product.costPrice.toFixed(2)),
          basePrice: formatCurrencyInput(product.basePrice.toFixed(2)),
          status: product.status,
        });
        setLoadingData(false);
      } else {
        Alert.alert("Erro", "Produto não encontrado.");
        router.push('/products');
      }
    }
  }, [id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    const costPrice = parseCurrencyInput(formData.costPrice);
    if (!formData.costPrice || isNaN(costPrice) || costPrice <= 0) {
      newErrors.costPrice = 'Preço de custo deve ser maior que zero';
    }

    const basePrice = parseCurrencyInput(formData.basePrice);
    if (!formData.basePrice || isNaN(basePrice) || basePrice <= 0) {
      newErrors.basePrice = 'Preço base deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !id) return;

    setLoading(true);
    
    setTimeout(() => {
      updateProduct(id, {
        name: formData.name.trim(),
        costPrice: parseCurrencyInput(formData.costPrice),
        basePrice: parseCurrencyInput(formData.basePrice),
        status: formData.status,
      });

      setLoading(false);
      router.push('/products');
    }, 300);
  };

  const confirmDelete = () => {
    if (!id) return;

    Alert.alert(
      "Excluir Produto",
      "Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              deleteProduct(id);
              setLoading(false);
              router.push('/products');
            }, 300);
          }
        }
      ]
    );
  };

  if (loadingData) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Editar Produto", headerShown: false }} />
      <KeyboardAvoidingView 
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 96, flexGrow: 1 }}>
          <View style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}>
            
            {/* Hero Section */}
            <View style={{ paddingHorizontal: 16, paddingTop: insets.top + 24, paddingBottom: 16 }}>
              <TouchableOpacity
                onPress={() => router.push('/products')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7280' }}>Voltar</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827' }}>
                Editar Produto
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              <VendlyCard>
                <View style={{ gap: 16 }}>
                  <VendlyInput
                    label="Nome do Produto"
                    placeholder="Ex: Camiseta Básica"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    error={errors.name}
                  />

                  <VendlyInput
                    label="Preço de Custo"
                    placeholder="0,00"
                    keyboardType="numeric"
                    value={formData.costPrice}
                    onChangeText={(text) => setFormData({ ...formData, costPrice: formatCurrencyInput(text) })}
                    error={errors.costPrice}
                  />

                  <VendlyInput
                    label="Preço Base"
                    placeholder="0,00"
                    keyboardType="numeric"
                    value={formData.basePrice}
                    onChangeText={(text) => setFormData({ ...formData, basePrice: formatCurrencyInput(text) })}
                    error={errors.basePrice}
                  />

                  <View>
                    <Text style={{ fontWeight: '500', color: '#111827', marginBottom: 8 }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setFormData({ ...formData, status: 'active' })}
                        style={{
                          flex: 1,
                          height: 48,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderRadius: 12,
                          borderColor: formData.status === 'active' ? '#16A34A' : '#E5E7EB',
                          backgroundColor: formData.status === 'active' ? 'rgba(22, 163, 74, 0.05)' : 'transparent',
                        }}
                      >
                        <Text style={{
                          fontWeight: '500',
                          color: formData.status === 'active' ? '#16A34A' : '#6B7280',
                        }}>
                          Ativo
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setFormData({ ...formData, status: 'inactive' })}
                        style={{
                          flex: 1,
                          height: 48,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderRadius: 12,
                          borderColor: formData.status === 'inactive' ? '#6B7280' : '#E5E7EB',
                          backgroundColor: formData.status === 'inactive' ? 'rgba(107, 114, 128, 0.05)' : 'transparent',
                        }}
                      >
                        <Text style={{
                          fontWeight: '500',
                          color: formData.status === 'inactive' ? '#6B7280' : '#9CA3AF',
                        }}>
                          Inativo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </VendlyCard>

              <View style={{ gap: 12, marginTop: 24 }}>
                <VendlyButton
                  variant="primary"
                  loading={loading}
                  onPress={handleSubmit}
                >
                  Salvar Alterações
                </VendlyButton>
                <VendlyButton
                  variant="ghost"
                  onPress={() => router.push('/products')}
                >
                  Cancelar
                </VendlyButton>
                <VendlyButton
                  variant="danger"
                  onPress={confirmDelete}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Trash2 size={20} color="#FFFFFF" />
                  </View>
                </VendlyButton>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
