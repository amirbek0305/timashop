import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  logo: { uz: 'Tima Shop', ru: 'Tima Shop', en: 'Tima Shop' },
  home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
  catalog: { uz: 'Katalog', ru: 'Каталог', en: 'Catalog' },
  sales: { uz: 'Aksiyalar', ru: 'Акции', en: 'Sales' },
  contact: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
  login: { uz: 'Kirish', ru: 'Войти', en: 'Login' },
  logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Logout' },
  
  // Hero
  heroTitle: { uz: 'Zamonaviy uslubda kiyining', ru: 'Одевайтесь в современном стиле', en: 'Dress in Modern Style' },
  heroSubtitle: { uz: 'Erkaklar uchun sifatli va zamonaviy kiyimlar', ru: 'Качественная и современная мужская одежда', en: 'Quality & Modern Men\'s Fashion' },
  shopNow: { uz: 'Xarid qilish', ru: 'Купить сейчас', en: 'Shop Now' },
  
  // Categories
  categories: { uz: 'Kategoriyalar', ru: 'Категории', en: 'Categories' },
  men: { uz: 'Erkaklar', ru: 'Мужчины', en: 'Men' },
  women: { uz: 'Ayollar', ru: 'Женщины', en: 'Women' },
  kids: { uz: 'Bolalar', ru: 'Дети', en: 'Kids' },
  accessories: { uz: 'Aksessuarlar', ru: 'Аксессуары', en: 'Accessories' },
  shirts: { uz: 'Ko\'ylaklar', ru: 'Рубашки', en: 'Shirts' },
  pants: { uz: 'Shimlar', ru: 'Брюки', en: 'Pants' },
  jackets: { uz: 'Kurtkalar', ru: 'Куртки', en: 'Jackets' },
  casual: { uz: 'Kundalik', ru: 'Повседневное', en: 'Casual' },
  
  // Products
  popularProducts: { uz: 'Mashhur mahsulotlar', ru: 'Популярные товары', en: 'Popular Products' },
  addToCart: { uz: 'Savatchaga qo\'shish', ru: 'Добавить в корзину', en: 'Add to Cart' },
  price: { uz: 'Narx', ru: 'Цена', en: 'Price' },
  article: { uz: 'Artikul', ru: 'Артикул', en: 'Article' },
  size: { uz: 'O\'lchami', ru: 'Размер', en: 'Size' },
  color: { uz: 'Rang', ru: 'Цвет', en: 'Color' },
  quantity: { uz: 'Miqdori', ru: 'Количество', en: 'Quantity' },
  
  // Filters
  filters: { uz: 'Filtrlar', ru: 'Фильтры', en: 'Filters' },
  priceRange: { uz: 'Narx oralig\'i', ru: 'Диапазон цен', en: 'Price Range' },
  category: { uz: 'Kategoriya', ru: 'Категория', en: 'Category' },
  clearFilters: { uz: 'Tozalash', ru: 'Очистить', en: 'Clear' },
  applyFilters: { uz: 'Qo\'llash', ru: 'Применить', en: 'Apply' },
  
  // Cart
  cart: { uz: 'Savat', ru: 'Корзина', en: 'Cart' },
  emptyCart: { uz: 'Savat bo\'sh', ru: 'Корзина пуста', en: 'Cart is Empty' },
  continueShopping: { uz: 'Xaridni davom ettirish', ru: 'Продолжить покупки', en: 'Continue Shopping' },
  buy: { uz: 'Sotib olish', ru: 'Купить', en: 'Buy' },
  total: { uz: 'Jami', ru: 'Итого', en: 'Total' },
  remove: { uz: 'O\'chirish', ru: 'Удалить', en: 'Remove' },
  
  // Auth
  register: { uz: 'Ro\'yxatdan o\'tish', ru: 'Регистрация', en: 'Register' },
  phoneNumber: { uz: 'Telefon raqami', ru: 'Номер телефона', en: 'Phone Number' },
  email: { uz: 'Email', ru: 'Email', en: 'Email' },
  password: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
  fullName: { uz: 'To\'liq ism', ru: 'Полное имя', en: 'Full Name' },
  alreadyHaveAccount: { uz: 'Hisobingiz bormi?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
  dontHaveAccount: { uz: 'Hisobingiz yo\'qmi?', ru: 'Нет аккаунта?', en: 'Don\'t have an account?' },
  
  // Purchase
  orderCodes: { uz: 'Buyurtma kodlari', ru: 'Коды заказа', en: 'Order Codes' },
  copyCode: { uz: 'Kodni nusxalash', ru: 'Копировать код', en: 'Copy Code' },
  sendToTelegram: { uz: 'Telegram orqali sotuvchiga yuborish', ru: 'Отправить продавцу через Telegram', en: 'Send to Seller via Telegram' },
  orderSuccess: { uz: 'Buyurtma muvaffaqiyatli yaratildi!', ru: 'Заказ успешно создан!', en: 'Order Created Successfully!' },
  
  // Footer
  aboutUs: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' },
  customerService: { uz: 'Xizmat ko\'rsatish', ru: 'Служба поддержки', en: 'Customer Service' },
  followUs: { uz: 'Ijtimoiy tarmoqlar', ru: 'Социальные сети', en: 'Follow Us' },
  aboutDescription: { 
    uz: 'erkaklar uchun zamonaviy va sifatli kiyimlar do\'koni', 
    ru: 'магазин современной и качественной мужской одежды', 
    en: 'modern and quality men\'s clothing store' 
  },
  allRightsReserved: { uz: 'Barcha huquqlar himoyalangan', ru: 'Все права защищены', en: 'All rights reserved' },
  
  // Product Detail
  description: { uz: 'Ta\'rif', ru: 'Описание', en: 'Description' },
  selectSize: { uz: 'O\'lchamni tanlang', ru: 'Выберите размер', en: 'Select Size' },
  inStock: { uz: 'Mavjud', ru: 'В наличии', en: 'In Stock' },
  outOfStock: { uz: 'Mavjud emas', ru: 'Нет в наличии', en: 'Out of Stock' },
  
  // Telegram
  telegramMessage: { 
    uz: 'Assalomu alaykum! Quyidagi mahsulotlarni buyurtma qilmoqchiman:', 
    ru: 'Здравствуйте! Хочу заказать следующие товары:', 
    en: 'Hello! I would like to order the following products:' 
  },
  
  // Currency
  currency: { uz: 'so\'m', ru: 'сум', en: 'UZS' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};