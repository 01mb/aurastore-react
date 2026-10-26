import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const addToCart = (product, color = null, size = null) => {
    const itemColor = color || product.colors[0];
    const itemSize = size || product.sizes[0];
    const cartKey = `${product.id}-${itemColor}-${itemSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, cartKey, selectedColor: itemColor, selectedSize: itemSize, quantity: 1 }];
    });
  };

  const updateQuantity = (cartKey, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.cartKey === cartKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setCouponCode('');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 150;
  const shippingFee = cartSubtotal > freeShippingThreshold || cartSubtotal === 0 ? 0 : 15.00;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      couponCode,
      setCouponCode,
      discountPercent,
      setDiscountPercent,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartSubtotal,
      discountAmount,
      shippingFee,
      cartTotal,
      totalCartUnits,
      freeShippingThreshold
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};