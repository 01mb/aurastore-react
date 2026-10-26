import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { CartProvider } from './context/CartContext';
import PromoBanner from './components/common/PromoBanner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroBanner from './components/shop/HeroBanner';
import ValueProps from './components/shop/ValueProps';
import FilterBar from './components/shop/FilterBar';
import ProductGrid from './components/shop/ProductGrid';
import QuickViewModal from './components/shop/QuickViewModal';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import Toast from './components/common/Toast';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price <= maxPrice;
      return matchCategory && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
        {toast && <Toast message={toast.message} type={toast.type} />}
        <PromoBanner />
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlist.length}
          onReset={() => { setSelectedCategory('All'); setSearchQuery(''); }}
        />

        <HeroBanner onCategorySelect={setSelectedCategory} featuredProduct={PRODUCTS[0]} />
        <ValueProps />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
          <FilterBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            totalCount={filteredProducts.length}
          />
          <ProductGrid
            products={filteredProducts}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onQuickView={setQuickViewProduct}
            onResetFilters={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxPrice(300); }}
          />
        </main>

        <Footer onCategorySelect={setSelectedCategory} />

        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            isWishlisted={wishlist.includes(quickViewProduct.id)}
            onToggleWishlist={toggleWishlist}
            onClose={() => setQuickViewProduct(null)}
          />
        )}

        <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
        {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
      </div>
    </CartProvider>
  );
}