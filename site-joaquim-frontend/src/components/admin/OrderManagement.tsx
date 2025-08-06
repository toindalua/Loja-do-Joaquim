
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestão de Pedidos</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Lista de pedidos será carregada do banco PostgreSQL
            </p>
            <p className="text-sm text-muted-foreground">
              Os pedidos dos clientes aparecerão aqui após integração com banco
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
