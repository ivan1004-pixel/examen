import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// Asegúrate de que estas rutas sean correctas según tu carpeta
import { getProducts } from '../../src/services/api';
import MyButton from '../../src/components/Mybutton';

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getProducts();
      console.log("DATOS LLEGANDO:", data); // Mira esto en la terminal para ver qué llega
      
      // Verificamos que sea un arreglo antes de guardarlo
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.log("La API no devolvió una lista válida");
        setProducts([]);
      }
    } catch (e) {
      console.error("Error cargando datos:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Examen Móviles</Text>
      <FlatList
        data={products}
        // CORRECCIÓN: Si no hay ID, usa el índice (0, 1, 2...) para que no falle
        keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({ pathname: "/detail", params: { ...item } })}
          >
            {/* CORRECCIÓN: Signos de interrogación para evitar errores si viene vacío */}
            <Text style={styles.title}>{item?.name || 'Producto sin nombre'}</Text>
            <Text style={styles.price}>${item?.price || 0}</Text>
          </TouchableOpacity>
        )}
      />
      <MyButton title="Actualizar Lista" onPress={loadData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f4f4f4' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green' },
});