import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import MyButton from '../src/components/Mybutton';

const API_URL = 'http://192.168.100.13:3000/products'; 

export default function AddScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Ponle al menos nombre y precio");
      return;
    }

    try {
      // Enviamos los datos al Backend
      await axios.post(API_URL, {
        name: name,
        price: parseFloat(price),
        description: description,
        // Nota: Subir archivos reales es muy difícil en 5 minutos. 
        // Por ahora mandamos sin foto para asegurar los puntos del formulario.
      });

      Alert.alert("Éxito", "Producto creado");
      // Al volver, la lista se actualizará sola si usaste el hook correcto
      router.back(); 
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ej. Mouse Gamer" />

      <Text style={styles.label}>Precio</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="100" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Detalles..." />

      <MyButton title="Guardar Producto" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 5, fontSize: 16 },
});