import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';

export const ContactPage = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: t('phoneNumber'),
      value: '+998 90 123 45 67',
      link: 'tel:+998901234567',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@timashop.uz',
      link: 'mailto:info@timashop.uz',
    },
    {
      icon: Send,
      title: 'Telegram',
      value: '@timashop',
      link: 'https://t.me/timashop',
    },
    {
      icon: MapPin,
      title: 'Manzil',
      value: "Toshkent, O'zbekiston",
      link: null,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2">{t('contact')}</h1>
          <p className="text-muted-foreground">
            Biz bilan bog'lanish uchun quyidagi ma'lumotlardan foydalaning
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;

            return (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Map or Additional Info */}
        <Card className="mt-8 p-8">
          <h3 className="mb-4">Ish vaqti</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>Dushanba - Juma: 09:00 - 20:00</p>
            <p>Shanba - Yakshanba: 10:00 - 18:00</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
