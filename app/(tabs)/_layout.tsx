import { Tabs } from "expo-router";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#16A34A",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 85,
          paddingBottom: Platform.OS === 'ios' ? 28 : 15,
          paddingTop: 10,
          backgroundColor: "#ffffff",
          borderTopColor: "#E5E7EB",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        headerShown: false, // Keep header visible or hide based on UI preference
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products/index"
        options={{
          title: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sales/index"
        options={{
          title: "Vendas",
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      
      {/* Telas Ocultas na aba inferior */}
      <Tabs.Screen name="products/new" options={{ href: null }} />
      <Tabs.Screen name="products/[id]" options={{ href: null }} />
      <Tabs.Screen name="sales/new" options={{ href: null }} />
      <Tabs.Screen name="sales/[id]" options={{ href: null }} />
    </Tabs>
  );
}