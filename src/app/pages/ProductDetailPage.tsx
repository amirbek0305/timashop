import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart, Product } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onNavigate }) => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const productName = language === 'uz' ? product.name : language === 'ru' ? product.nameRu : product.nameEn;
  const productDescription = language === 'uz' ? product.description : language === 'ru' ? product.descriptionRu : product.descriptionEn;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    toast.success(`${productName} ${t('addToCart').toLowerCase()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        onClick={() => onNavigate('catalog')}
        variant="ghost"
        className="mb-8 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('catalog')}
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.article}</p>
            <h1 className="mt-2">{productName}</h1>
            <p className="mt-4 text-2xl">{product.price.toLocaleString()} {t('currency')}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <Label className="mb-3 block">{t('selectSize')}</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 min-w-[60px] cursor-pointer items-center justify-center rounded-md border px-4 transition-colors peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <Label className="mb-3 block">{t('color')}</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex h-10 cursor-pointer items-center rounded-md border px-4 transition-colors peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div>
            <Label className="mb-3 block">{t('quantity')}</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            {t('addToCart')}
          </Button>

          {/* Description */}
          <div className="border-t pt-6">
            <h3 className="mb-2">{t('description')}</h3>
            <p className="text-sm text-muted-foreground">{productDescription}</p>
          </div>

          {/* Stock Status */}
          <div className="rounded-lg border p-4">
            <p className="text-sm">
              <span className="text-green-600">✓</span> {t('inStock')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
