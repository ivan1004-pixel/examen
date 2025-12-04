import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Laptop Gamer', price: 1500, description: 'Alta potencia gráfica' },
    { id: 2, name: 'Smartphone Pro', price: 900, description: 'Cámara de 108MP' },
    { id: 3, name: 'Monitor 4K', price: 400, description: 'Panel IPS 144Hz' },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(p => p.id === id);
  }

  // Métodos de relleno necesarios
  
  create(createProductDto: any) {
    const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    
    const newProduct = {
      id: newId,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description || 'Sin descripción',
      // Truco: Si mandan foto, la usamos, si no, ponemos una genérica
      image: createProductDto.image || null 
    };

    this.products.push(newProduct);
    return newProduct;
  }
  
  update(id: number, updateProductDto: any) { return `Esta acción actualiza el producto #${id}`; }
  remove(id: number) { return `Esta acción elimina el producto #${id}`; }
}