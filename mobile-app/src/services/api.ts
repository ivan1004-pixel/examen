import axios from 'axios';


const API_URL = 'http://192.168.100.13:3000'; 

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error conectando a la API", error);
    return [];
  }
};