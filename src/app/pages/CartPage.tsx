import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2">{t('emptyCart')}</h2>
          <p className="mb-6 text-muted-foreground">{t('continueShopping')}</p>
          <Button onClick={() => onNavigate('catalog')}>
            {t('catalog')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">{t('cart')}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const itemName = language === 'uz' ? item.name : language === 'ru' ? item.nameRu : item.nameEn;
            
            return (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={item.image}
                      alt={itemName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-1">{itemName}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t('article')}: {item.article}
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-muted-foreground">
                          {t('size')}: {item.selectedSize}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-muted-foreground">
                          {t('color')}: {item.selectedColor}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>

                      {/* Price */}
                      <p>{(item.price * item.quantity).toLocaleString()} {t('currency')}</p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <h3 className="mb-4">{t('total')}</h3>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('total')}</span>
                <span>{totalPrice.toLocaleString()} {t('currency')}</span>
              </div>
            </div>

            <Button
              onClick={() => onNavigate('purchase')}
              size="lg"
              className="mt-6 w-full"
            >
              {t('buy')}
            </Button>

            <Button
              onClick={() => onNavigate('catalog')}
              variant="ghost"
              className="mt-2 w-full"
            >
              {t('continueShopping')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
