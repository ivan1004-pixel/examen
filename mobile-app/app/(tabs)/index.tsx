import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
// Ajusta la cantidad de '../' según dónde esté tu carpeta src
import { getProducts } from '../../src/services/api';
import MyButton from '../../src/components/Mybutton';

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  // useFocusEffect hace que esto se ejecute cada vez que la pantalla "gana foco"
  // (es decir, cada vez que entras o regresas a ella)
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      console.log("Cargando lista de productos...");
      const data = await getProducts();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.log("Datos vacíos o incorrectos");
        setProducts([]);
      }
    } catch (e) {
      console.error("Error al cargar:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Productos</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({ pathname: "/detail", params: { ...item } })}
          >
            <Text style={styles.title}>{item?.name || 'Sin nombre'}</Text>
            <Text style={styles.price}>${item?.price || 0}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos aún.</Text>}
      />

      <View style={styles.footer}>
        <MyButton title="Recargar Manualmente" onPress={loadData} />
        
        {/* BOTÓN PARA AGREGAR PRODUCTO */}
        <MyButton 
          title="+ Nuevo Producto" 
          style={styles.addButton} 
          onPress={() => router.push("/add")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f4f4f4' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  footer: { marginTop: 10 },
  addButton: { backgroundColor: '#28a745', marginTop: 10 } // Color verde para diferenciar
});