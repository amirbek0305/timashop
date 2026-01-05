import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

export const CatalogPage = ({ onProductClick }) => {
  const { t } = useLanguage();

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500000],
  });

  const categories = ['men', 'accessories'];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const priceMatch =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return categoryMatch && priceMatch;
  });

  const handleCategoryToggle = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500000],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="mb-4">{t('category')}</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label htmlFor={category} className="cursor-pointer">
                {t(category)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-4">{t('priceRange')}</h4>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
            min={0}
            max={500000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0].toLocaleString()} {t('currency')}</span>
            <span>{filters.priceRange[1].toLocaleString()} {t('currency')}</span>
          </div>
        </div>
      </div>

      <Button onClick={handleClearFilters} variant="outline" className="w-full">
        {t('clearFilters')}
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1>{t('catalog')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredProducts.length} mahsulot
          </p>
        </div>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              {t('filters')}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t('filters')}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-lg border p-6">
            <h3 className="mb-4">{t('filters')}</h3>
            <FilterContent />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-muted-foreground">{t('emptyCart')}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
