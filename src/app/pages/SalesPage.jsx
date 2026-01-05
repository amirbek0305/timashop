import React from 'react';
import { Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const SalesPage = ({ onProductClick }) => {
  const { t } = useLanguage();

  // Chegirma mahsulotlari - hozircha birinchi 6 ta mahsulot
  const saleProducts = products.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Tag className="h-8 w-8" />
          <h1>{t('sales')}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Maxsus takliflar va chegirmalar
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};
