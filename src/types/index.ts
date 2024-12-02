export interface IProduct {
  id: number; // Product ID
  name: string; // Product name
  description: string; // Product description
  brand: string; // Brand of the product
  model: string; // Model of the product
  image: string; // URL to the product image
  price: number; // Price as a number
  createdAt: string; // ISO 8601 date string
}

export interface ICartProducts extends IProduct {
  quantity: number;
}
