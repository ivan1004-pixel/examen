import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import MyButton from '../../src/components/Mybutton';

export default function DetailScreen() {
  const product = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Error", "Se necesita permiso de cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>Precio: ${product.price}</Text>

      <View style={styles.imgBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Text style={{ color: '#888' }}>Foto no tomada</Text>
        )}
      </View>

      <MyButton title="Tomar Evidencia (Cámara)" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: 'white' },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 20 },
  desc: { fontSize: 16, marginVertical: 10 },
  price: { fontSize: 22, color: 'green', fontWeight: 'bold', marginBottom: 30 },
  imgBox: { width: 250, height: 250, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 12 },
  img: { width: '100%', height: '100%', borderRadius: 12 },
});