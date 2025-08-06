
import React, { useState } from 'react'; // Importa React e hook useState
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação programática
import { ArrowRight, CreditCard, QrCode, BadgeDollarSign, User } from 'lucide-react'; // Importa ícones
import { toast } from 'sonner'; // Importa função toast para notificações
import { useCart } from '../hooks/useCart'; // Importa hook personalizado para o carrinho
import { Button } from '@/components/ui/button'; // Importa componente Button
import { Card, CardContent } from '@/components/ui/card'; // Importa componentes Card
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Importa componentes RadioGroup
import { Input } from '@/components/ui/input'; // Importa componente Input
import { Label } from '@/components/ui/label'; // Importa componente Label
import { Textarea } from '@/components/ui/textarea'; // Importa componente Textarea
import DeliveryAddressForm from '../components/checkout/DeliveryAddressForm'; // Importa formulário de endereço
import PaymentMethodForm from '../components/checkout/PaymentMethodForm'; // Importa formulário de método de pagamento

const Checkout = () => {
  const navigate = useNavigate(); // Hook para navegação programática
  const { cartItems, subtotal, clearCart } = useCart(); // Extrai dados e funções do contexto do carrinho
  
  // Estados locais para controlar o fluxo de checkout
  const [currentStep, setCurrentStep] = useState<'address' | 'payment'>('address'); // Etapa atual do checkout
  const [paymentMethod, setPaymentMethod] = useState<string>(''); // Método de pagamento selecionado
  
  // Estado para os dados de endereço
  const [addressData, setAddressData] = useState({
    fullName: '', // Nome completo
    phone: '', // Telefone
    street: '', // Rua
    number: '', // Número
    complement: '', // Complemento
    neighborhood: '', // Bairro
    zipCode: '', // CEP
    deliveryType: 'city', // Tipo de entrega (cidade ou interestadual)
  });

  // Cálculo do frete baseado no valor do pedido e tipo de entrega
  const shipping = subtotal > 200 ? 0 : addressData.deliveryType === 'city' ? 15 : 30;
  
  // Aplicação de desconto de 10% para pagamentos via PIX ou Dinheiro
  const discount = (paymentMethod === 'pix' || paymentMethod === 'cash') ? subtotal * 0.1 : 0;
  
  // Cálculo do valor total (subtotal + frete - desconto)
  const total = subtotal + shipping - discount;

  // Função para processar o envio do formulário de endereço
  const handleAddressSubmit = (data: typeof addressData) => {
    setAddressData(data); // Atualiza o estado com os dados do endereço
    setCurrentStep('payment'); // Avança para a etapa de pagamento
    window.scrollTo(0, 0); // Rola para o topo da página
  };

  // Função para processar o envio do formulário de pagamento
  const handlePaymentSubmit = (method: string, paymentData?: any) => {
    setPaymentMethod(method); // Atualiza o método de pagamento selecionado
    
    // Simulação do envio do pedido
    toast.success('Pedido enviado para análise!', {
      description: 'Aguarde a confirmação do operador para prosseguir com o pagamento.'
    });
    
    // Simulando redirecionamento para página de confirmação após 2 segundos
    setTimeout(() => {
      clearCart(); // Limpa o carrinho
      navigate('/pedido-confirmado'); // Navega para página de confirmação
    }, 2000);
  };

  // Verificação de carrinho vazio
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-kickit-gray-medium mb-8">
          Seu carrinho está vazio. Adicione produtos para continuar com a compra.
        </p>
        <Button onClick={() => navigate('/produtos')}>
          Voltar às compras
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8"> {/* Container principal */}
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Indicador visual das etapas do checkout */}
      <div className="flex mb-8 border-b">
        <div 
          className={`pb-2 px-4 ${currentStep === 'address' 
            ? 'border-b-2 border-primary font-semibold' // Estilo para etapa ativa
            : 'text-muted-foreground'}`} // Estilo para etapa inativa
        >
          1. Endereço de Entrega
        </div>
        <div 
          className={`pb-2 px-4 ${currentStep === 'payment' 
            ? 'border-b-2 border-primary font-semibold' // Estilo para etapa ativa
            : 'text-muted-foreground'}`} // Estilo para etapa inativa
        >
          2. Método de Pagamento
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8"> {/* Layout responsivo */}
        {/* Formulário principal (Endereço ou Pagamento) */}
        <div className="lg:w-2/3">
          <Card>
            <CardContent className="pt-6">
              {/* Renderização condicional baseada na etapa atual */}
              {currentStep === 'address' ? (
                <DeliveryAddressForm 
                  initialData={addressData} // Passa dados iniciais
                  onSubmit={handleAddressSubmit} // Passa função de submit
                />
              ) : (
                <PaymentMethodForm
                  onSubmit={handlePaymentSubmit} // Passa função de submit
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumo do pedido (sempre visível) */}
        <div className="lg:w-1/3">
          <Card className="sticky top-24"> {/* Fixa o card ao rolar a página */}
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-4">
                {/* Contador de itens no carrinho */}
                <p className="text-sm text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
                </p>
                
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                
                {/* Entrega */}
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span>
                    {shipping === 0 
                      ? 'Grátis' 
                      : shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>

                {/* Desconto (condicional) */}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto (10%)</span>
                    <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                )}
                
                {/* Total */}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
              </div>

              {/* Informação importante sobre o processo de pagamento */}
              <div className="mt-4 bg-yellow-50 p-3 rounded text-sm">
                <p className="font-semibold text-yellow-800">Importante:</p>
                <p className="text-yellow-700">O pagamento só estará disponível após a confirmação da disponibilidade dos produtos pelo operador.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout; // Exporta o componente Checkout
