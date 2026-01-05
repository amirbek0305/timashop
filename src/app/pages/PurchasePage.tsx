import React, { useState, useEffect } from 'react';
import { Copy, Send, CircleCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { generateArticleCode } from '../data/products';

interface PurchasePageProps {
  onNavigate: (page: string) => void;
}

export const PurchasePage: React.FC<PurchasePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [orderCodes, setOrderCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate unique codes for each item
    const codes = items.map(() => generateArticleCode());
    setOrderCodes(codes);
  }, [items]);

  const handleCopyCode = () => {
    const codesText = orderCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopied(true);
    toast.success(t('copyCode'));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegramSend = () => {
    const message = generateTelegramMessage();
    const sellerUsername = 'timashop'; // Replace with actual seller username
    const telegramUrl = `https://t.me/${sellerUsername}?text=${encodeURIComponent(message)}`;
    
    window.open(telegramUrl, '_blank');
    
    // Clear cart after sending
    setTimeout(() => {
      clearCart();
      toast.success(t('orderSuccess'));
      onNavigate('home');
    }, 1000);
  };

  const generateTelegramMessage = () => {
    let message = `${t('telegramMessage')}\n\n`;
    
    items.forEach((item, index) => {
      const itemName = language === 'uz' ? item.name : language === 'ru' ? item.nameRu : item.nameEn;
      message += `${index + 1}. ${itemName}\n`;
      message += `   ${t('article')}: ${item.article}\n`;
      message += `   ${t('orderCodes')}: ${orderCodes[index]}\n`;
      if (item.selectedSize) {
        message += `   ${t('size')}: ${item.selectedSize}\n`;
      }
      if (item.selectedColor) {
        message += `   ${t('color')}: ${item.selectedColor}\n`;
      }
      message += `   ${t('quantity')}: ${item.quantity}\n`;
      message += `   ${t('price')}: ${item.price.toLocaleString()} ${t('currency')}\n\n`;
    });

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\n${t('total')}: ${totalPrice.toLocaleString()} ${t('currency')}\n`;

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

  if (items.length === 0) {
    onNavigate('home');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <CircleCheck className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h1 className="mb-2">{t('orderSuccess')}</h1>
          <p className="text-muted-foreground">
            {t('sendToTelegram')}
          </p>
        </div>

        {/* Order Codes */}
        <Card className="mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>{t('orderCodes')}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="gap-2"
            >
              {copied ? (
                <>
                  <CircleCheck className="h-4 w-4" />
                  {t('copyCode')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t('copyCode')}
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            {orderCodes.map((code, index) => {
              const item = items[index];
              const itemName = language === 'uz' ? item.name : language === 'ru' ? item.nameRu : item.nameEn;
              
              return (
                <div key={index} className="rounded-lg border p-3">
                  <p className="mb-1 text-sm">{itemName}</p>
                  <code className="text-xs text-muted-foreground">{code}</code>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Order Details */}
        <Card className="mb-6 p-6">
          <h3 className="mb-4">{t('cart')}</h3>
          <div className="space-y-3">
            {items.map((item, index) => {
              const itemName = language === 'uz' ? item.name : language === 'ru' ? item.nameRu : item.nameEn;
              
              return (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <p>{itemName}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x {item.price.toLocaleString()} {t('currency')}
                    </p>
                  </div>
                  <p>{(item.price * item.quantity).toLocaleString()} {t('currency')}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span>{t('total')}</span>
              <span>
                {items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}{' '}
                {t('currency')}
              </span>
            </div>
          </div>
        </Card>

        {/* Telegram Button */}
        <Button
          onClick={handleTelegramSend}
          size="lg"
          className="w-full gap-2"
        >
          <Send className="h-5 w-5" />
          {t('sendToTelegram')}
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Sizning buyurtmangiz Telegram orqali sotuvchiga yuboriladi
        </p>
      </div>
    </div>
  );
};