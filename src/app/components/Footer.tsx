import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4">{t('aboutUs')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('logo')} - {t('aboutDescription')}
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4">{t('customerService')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('contact')}: +998 90 123 45 67</p>
              <p>Email: info@timashop.uz</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4">{t('followUs')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Instagram: @timashop</p>
              <p>Telegram: @timashop</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Tima Shop. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};