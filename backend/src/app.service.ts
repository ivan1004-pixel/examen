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
}