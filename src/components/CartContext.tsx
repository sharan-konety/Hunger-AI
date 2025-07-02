"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MenuItem } from '@/lib/data';

interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface PastOrder {
  id: string;
  items: CartItem[];
  restaurant: { id: string; name: string };
  total: number;
  orderDate: string;
  status: 'completed' | 'delivered';
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
  reorder: (orderId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentRestaurant, setCurrentRestaurant] = useState<{ id: string; name: string } | null>(null);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and past orders from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hunger-cart');
      const savedRestaurant = localStorage.getItem('hunger-current-restaurant');
      const savedPastOrders = localStorage.getItem('hunger-past-orders');
      
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      if (savedRestaurant) {
        setCurrentRestaurant(JSON.parse(savedRestaurant));
      }
      if (savedPastOrders) {
        setPastOrders(JSON.parse(savedPastOrders));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hunger-cart', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items, isLoaded]);

  // Save current restaurant to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        if (currentRestaurant) {
          localStorage.setItem('hunger-current-restaurant', JSON.stringify(currentRestaurant));
        } else {
          localStorage.removeItem('hunger-current-restaurant');
        }
      } catch (error) {
        console.error('Failed to save restaurant to localStorage:', error);
      }
    }
  }, [currentRestaurant, isLoaded]);

  // Save past orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hunger-past-orders', JSON.stringify(pastOrders));
      } catch (error) {
        console.error('Failed to save past orders to localStorage:', error);
      }
    }
  }, [pastOrders, isLoaded]);

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

    const newOrder: PastOrder = {
      id: `order-${Date.now()}`,
      items: [...items],
      restaurant: { ...currentRestaurant },
      total: getTotalPrice(),
      orderDate: new Date().toISOString(),
      status: 'completed'
    };

    setPastOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const reorder = (orderId: string): boolean => {
    const order = pastOrders.find(o => o.id === orderId);
    if (!order) return false;

    // Check if cart has items from a different restaurant
    if (currentRestaurant && currentRestaurant.id !== order.restaurant.id) {
      return false; // Would need to clear cart first
    }

    // Clear current cart and add all items from the past order
    setItems(order.items);
    setCurrentRestaurant(order.restaurant);
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
