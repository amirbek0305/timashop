import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../contexts/CartContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onProductClick }) => {
  const { t } = useLanguage();

  const categories = [
    { key: 'shirts', label: t('shirts'), image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400' },
    { key: 'pants', label: t('pants'), image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' },
    { key: 'jackets', label: t('jackets'), image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
    { key: 'accessories', label: t('accessories'), image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
  ];

  const popularProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4 text-4xl md:text-6xl">{t('heroTitle')}</h1>
              <p className="mb-8 text-lg md:text-xl opacity-90">{t('heroSubtitle')}</p>
              <Button
                onClick={() => onNavigate('catalog')}
                size="lg"
                className="h-12 gap-2 bg-white text-black hover:bg-white/90"
              >
                {t('shopNow')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8">{t('categories')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => onNavigate('catalog')}
              className="group relative h-64 overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
            >
              <img
                src={category.image}
                alt={category.label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white">{category.label}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2>{t('popularProducts')}</h2>
          <Button
            onClick={() => onNavigate('catalog')}
            variant="ghost"
            className="gap-2"
          >
            {t('catalog')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
};