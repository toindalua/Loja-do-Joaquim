
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import AdminLogin from '@/components/admin/AdminLogin';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa fazer login primeiro.");
      navigate('/login');
    } else if (!isAdmin) {
      toast.error("Acesso restrito a administradores.");
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // If not admin, don't render the admin panel
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para a loja
          </Button>
        </div>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
        
        <TabsContent value="categories">
          <CategoryManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
