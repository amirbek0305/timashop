import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingTelegramButton } from '../app/components/FloatingTelegramButton';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { PurchasePage } from './pages/PurchasePage';
import { SalesPage } from './pages/SalesPage';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'catalog':
        return <CatalogPage onProductClick={handleProductClick} />;
      case 'product':
        return selectedProduct ? (
          <ProductDetailPage product={selectedProduct} onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'purchase':
        return <PurchasePage onNavigate={handleNavigate} />;
      case 'sales':
        return <SalesPage onProductClick={handleProductClick} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header
              currentPage={currentPage}
              onNavigate={handleNavigate}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
            <main className="flex-1">{renderPage()}</main>
            <Footer />
            <FloatingTelegramButton />
            <Toaster position="top-center" />
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
