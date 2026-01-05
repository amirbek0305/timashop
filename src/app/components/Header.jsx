import React from 'react';
import { Moon, Sun, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = ({ currentPage, onNavigate, isDark, toggleTheme }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { key: 'home', label: t('home') },
    { key: 'catalog', label: t('catalog') },
    { key: 'sales', label: t('sales') },
    { key: 'contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <span className="text-sm">TS</span>
            </div>
            <span className="tracking-tight">{t('logo')}</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`transition-colors hover:text-foreground/80 ${
                  currentPage === item.key
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('cart')}
              className="relative h-9 w-9"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User */}
            {user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('login')}
                className="hidden h-9 w-9 md:flex"
              >
                <User className="h-4 w-4" />
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors hover:text-foreground/80 ${
                    currentPage === item.key
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {!user && (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {t('login')}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
