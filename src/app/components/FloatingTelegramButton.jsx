import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';

export const FloatingTelegramButton = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { items } = useCart();

  const handleTelegramClick = () => {
    if (items.length === 0) return;

    const message = generateTelegramMessage();
    const sellerUsername = 'timashop'; // actual seller username bilan almashtir
    const telegramUrl = `https://t.me/${sellerUsername}?text=${encodeURIComponent(
      message
    )}`;
    window.open(telegramUrl, '_blank');
  };

  const generateTelegramMessage = () => {
    let message = `${t('telegramMessage')}\n\n`;

    items.forEach((item, index) => {
      const itemName =
        language === 'uz'
          ? item.name
          : language === 'ru'
          ? item.nameRu
          : item.nameEn;

      message += `${index + 1}. ${itemName}\n`;
      message += `   ${t('article')}: ${item.article}\n`;

      if (item.selectedSize) {
        message += `   ${t('size')}: ${item.selectedSize}\n`;
      }

      if (item.selectedColor) {
        message += `   ${t('color')}: ${item.selectedColor}\n`;
      }

      message += `   ${t('quantity')}: ${item.quantity}\n`;
      message += `   ${t('price')}: ${item.price.toLocaleString()} ${t(
        'currency'
      )}\n\n`;
    });

    if (user) {
      message += `\n${t('fullName')}: ${user.name}`;

      if (user.phone) {
        message += `\n${t('phoneNumber')}: ${user.phone}`;
      }

      if (user.email) {
        message += `\nEmail: ${user.email}`;
      }
    }

    return message;
  };

  if (items.length === 0) return null;

  return (
    <Button
      onClick={handleTelegramClick}
      className="fixed bottom-6 right-6 z-50 h-14 gap-2 rounded-full px-6 shadow-lg"
      size="lg"
    >
      <Send className="h-5 w-5" />
      <span className="hidden sm:inline">Telegram</span>
    </Button>
  );
};
