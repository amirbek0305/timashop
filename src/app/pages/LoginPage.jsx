import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export const LoginPage = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login
    login({
      id: '1',
      name: 'User',
      email: loginData.email,
    });

    toast.success(t('login'));
    onNavigate('home');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Mock register
    login({
      id: '1',
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
    });

    toast.success(t('register'));
    onNavigate('home');
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2">{t('logo')}</h1>
          <p className="text-sm text-muted-foreground">{t('heroSubtitle')}</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('login')}</TabsTrigger>
            <TabsTrigger value="register">{t('register')}</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t('email')}</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">{t('password')}</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {t('login')}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {t('dontHaveAccount')}
              </div>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">{t('fullName')}</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ismingiz"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">{t('phoneNumber')}</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">{t('email')}</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">{t('password')}</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {t('register')}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {t('alreadyHaveAccount')}
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
