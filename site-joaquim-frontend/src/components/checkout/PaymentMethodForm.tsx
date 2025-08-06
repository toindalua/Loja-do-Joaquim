
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QrCode, BadgeDollarSign, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useCart } from '@/hooks/useCart';

interface PaymentMethodFormProps {
  onSubmit: (method: string, data?: any) => void;
}

const PaymentMethodForm = ({ onSubmit }: PaymentMethodFormProps) => {
  const [method, setMethod] = useState<string>('pix');
  const [showCreditCheckForm, setShowCreditCheckForm] = useState<boolean>(false);
  const [creditCheckStatus, setCreditCheckStatus] = useState<'none' | 'checking' | 'approved' | 'rejected'>('none');
  const { subtotal } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(method);
  };

  const handleCreditCheck = () => {
    setCreditCheckStatus('checking');
    setTimeout(() => {
      // Simulando verificação de crédito
      const isApproved = Math.random() > 0.3; // 70% de chance de aprovação
      setCreditCheckStatus(isApproved ? 'approved' : 'rejected');
    }, 1500);
  };

  const renderPaymentDetails = () => {
    const discount = (method === 'pix' || method === 'cash') ? subtotal * 0.1 : 0;
    
    switch(method) {
      case 'pix':
        return (
          <div className="mt-4">
            <div className="bg-green-50 p-3 rounded mb-4">
              <p className="text-green-700 font-semibold">Desconto de 10% aplicado!</p>
              <p className="text-green-600">Economize {(subtotal * 0.1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <p className="text-gray-600 mb-4">O QR code para pagamento será disponibilizado após a confirmação dos produtos pelo operador.</p>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
              <QrCode className="mx-auto mb-2 text-gray-400" size={100} />
              <p className="text-sm text-gray-500">QR Code será exibido após aprovação do operador</p>
            </div>
          </div>
        );
      
      case 'cash':
        return (
          <div className="mt-4">
            <div className="bg-green-50 p-3 rounded mb-4">
              <p className="text-green-700 font-semibold">Desconto de 10% aplicado!</p>
              <p className="text-green-600">Economize {(subtotal * 0.1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <p className="text-gray-600">O pagamento será realizado no momento da entrega. Você receberá um desconto de 10% no valor total da compra.</p>
            <p className="text-gray-600 mt-2">Por favor, tenha o valor exato em mãos para facilitar a entrega.</p>
          </div>
        );
      
      case 'credit':
        return (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">Esta opção está disponível apenas para clientes cadastrados em nosso sistema de crediário.</p>
            
            {showCreditCheckForm && (
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="fullName">Nome completo</Label>
                  <Input id="fullName" placeholder="Nome completo conforme cadastro" />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                
                {creditCheckStatus === 'none' && (
                  <Button onClick={handleCreditCheck}>
                    Consultar cadastro
                  </Button>
                )}
                
                {creditCheckStatus === 'checking' && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                    <span>Consultando sistema...</span>
                  </div>
                )}
                
                {creditCheckStatus === 'approved' && (
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-green-700">Cadastro encontrado e aprovado!</p>
                    <p className="text-green-600 text-sm">Você pode prosseguir com a compra no crediário.</p>
                  </div>
                )}
                
                {creditCheckStatus === 'rejected' && (
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-red-700">Cadastro não encontrado ou não aprovado.</p>
                    <p className="text-red-600 text-sm">Por favor, escolha outra forma de pagamento ou entre em contato com nossa loja.</p>
                  </div>
                )}
              </div>
            )}

            <Button 
              onClick={() => setShowCreditCheckForm(!showCreditCheckForm)}
              variant="outline" 
              className="mb-4"
            >
              {showCreditCheckForm ? 'Esconder formulário' : 'Verificar cadastro'}
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
      
      <RadioGroup value={method} onValueChange={setMethod} className="space-y-4">
        <div className={`border rounded-lg p-4 cursor-pointer ${method === 'pix' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex items-center cursor-pointer">
              <QrCode className="mr-2" />
              <span>PIX (10% de desconto)</span>
            </Label>
          </div>
          {method === 'pix' && renderPaymentDetails()}
        </div>

        <div className={`border rounded-lg p-4 cursor-pointer ${method === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center cursor-pointer">
              <BadgeDollarSign className="mr-2" />
              <span>Dinheiro na entrega (10% de desconto)</span>
            </Label>
          </div>
          {method === 'cash' && renderPaymentDetails()}
        </div>

        <div className={`border rounded-lg p-4 cursor-pointer ${method === 'credit' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit" id="credit" />
            <Label htmlFor="credit" className="flex items-center cursor-pointer">
              <User className="mr-2" />
              <span>Crediário (apenas para clientes cadastrados)</span>
            </Label>
          </div>
          {method === 'credit' && renderPaymentDetails()}
        </div>
      </RadioGroup>

      <div className="bg-yellow-50 p-4 rounded text-sm text-yellow-700 mt-6">
        <p className="font-semibold">Importante:</p>
        <p>O pagamento só estará disponível após a confirmação dos produtos pelo operador da loja.</p>
        <p className="mt-1">Você receberá uma notificação quando seu pedido for aprovado.</p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full sm:w-auto mt-4">
            Finalizar Pedido
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar pedido</AlertDialogTitle>
            <AlertDialogDescription>
              Seu pedido será enviado para análise. Após a confirmação dos produtos pelo operador, 
              você receberá instruções para finalizar o pagamento.
              
              {(method === 'pix' || method === 'cash') && (
                <p className="text-green-600 mt-2">
                  Você receberá um desconto de 10% no valor total da compra.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onSubmit(method)}>
              Confirmar Pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default PaymentMethodForm;
