"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '@/lib/data';

interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface PastOrder {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartContextType {
  items: CartItem[];
  currentRestaurant: { id: string; name: string } | null;
  pastOrders: PastOrder[];
  addToCart: (item: MenuItem, restaurantId: string, restaurantName: string) => boolean;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  completeOrder: () => void;
  reorder: (orderId: string) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentRestaurant, setCurrentRestaurant] = useState<{ id: string; name: string } | null>(null);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('hunger-cart');
      const savedRestaurant = localStorage.getItem('hunger-current-restaurant');
      const savedOrders = localStorage.getItem('hunger-past-orders');

      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }

      if (savedRestaurant) {
        try {
          setCurrentRestaurant(JSON.parse(savedRestaurant));
        } catch (error) {
          console.error('Error loading restaurant from localStorage:', error);
        }
      }

      if (savedOrders) {
        try {
          setPastOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('Error loading past orders from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hunger-cart', JSON.stringify(items));
    }
  }, [items]);

  // Save current restaurant to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentRestaurant) {
        localStorage.setItem('hunger-current-restaurant', JSON.stringify(currentRestaurant));
      } else {
        localStorage.removeItem('hunger-current-restaurant');
      }
    }
  }, [currentRestaurant]);

  // Save past orders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hunger-past-orders', JSON.stringify(pastOrders));
    }
  }, [pastOrders]);

  const addToCart = (item: MenuItem, restaurantId: string, restaurantName: string): boolean => {
    // Check if cart has items from a different restaurant
    if (currentRestaurant && currentRestaurant.id !== restaurantId) {
      // Return false to indicate the item couldn't be added
      return false;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1, restaurantId, restaurantName }];
      }
    });

    // Set current restaurant if this is the first item
    if (!currentRestaurant) {
      setCurrentRestaurant({ id: restaurantId, name: restaurantName });
    }

    return true;
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      
      // If cart becomes empty, clear current restaurant
      if (newItems.length === 0) {
        setCurrentRestaurant(null);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCurrentRestaurant(null);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const completeOrder = () => {
    if (items.length === 0 || !currentRestaurant) return;

    const order: PastOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      items: [...items],
      total: getTotalPrice(),
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
    };

    setPastOrders(prev => [order, ...prev]);
    clearCart();
  };

  const reorder = async (orderId: string): Promise<boolean> => {
    const order = pastOrders.find(o => o.id === orderId);
    if (!order) return false;

    // Check if we need to clear cart due to different restaurant
    if (currentRestaurant && currentRestaurant.id !== order.restaurantId) {
      const shouldClear = window.confirm(
        `Your cart contains items from ${currentRestaurant.name}. Do you want to clear it and add items from ${order.restaurantName}?`
      );
      if (!shouldClear) return false;
      clearCart();
    }

    // Add all items from the order
    setCurrentRestaurant({ id: order.restaurantId, name: order.restaurantName });
    setItems(order.items.map(item => ({ ...item })));

    return true;
  };

  return (
    <CartContext.Provider value={{
      items,
      currentRestaurant,
      pastOrders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      completeOrder,
      reorder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
