import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';

export const ProductCard = ({ product, onProductClick }) => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  const productName =
    language === 'uz'
      ? product.name
      : language === 'ru'
      ? product.nameRu
      : product.nameEn;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${productName} ${t('addToCart').toLowerCase()}`);
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 bg-transparent transition-all hover:shadow-lg"
      onClick={() => onProductClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{product.article}</p>
        <h3 className="mt-1 line-clamp-1">{productName}</h3>
        <p className="mt-2">
          {product.price.toLocaleString()} {t('currency')}
        </p>

        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="mt-3 w-full gap-2"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          {t('addToCart')}
        </Button>
      </div>
    </Card>
  );
};
