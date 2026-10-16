export type Role = "customer" | "admin";
 
export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}
 
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}
 
export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category; // a full object, not a string
  images: string[]; // an array, not a single image
}
 
// Auth
export interface LoginCredentials {
  email: string;
  password: string;
}
 
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
 
// Cart (built by me, not from the API)
export interface CartItem {
  productId: number;
  title: string;
  price: number; // price at time of adding
  image: string;
  quantity: number;
}
 
// Orders (the API has none, so i build this myself later)
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
 
export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  country: string;
  phone: string;
}
 
export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string; 
}