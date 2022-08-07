import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (shippingAddress: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);