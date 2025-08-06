
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  // Gerar número de pedido aleatório para fins de demonstração
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <div className="w-full max-w-md">
        <div className="mb-6 text-green-600">
          <CheckCircle className="h-16 w-16 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Pedido Recebido!</h1>
        <p className="text-lg mb-6">
          Seu pedido foi recebido e está aguardando análise pelo operador.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Número do pedido</p>
            <p className="font-semibold text-lg">{orderNumber}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Aguardando confirmação
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded text-blue-700 text-sm mb-8">
          <p className="font-semibold">O que acontece agora?</p>
          <ol className="text-left list-decimal ml-5 mt-2">
            <li>O operador da loja irá verificar a disponibilidade dos produtos.</li>
            <li>Após confirmação, você receberá instruções para pagamento.</li>
            <li>Assim que o pagamento for aprovado, seu pedido será preparado para entrega.</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/produtos">
              Continuar comprando
            </Link>
          </Button>
          <Button asChild>
            <Link to="/conta">
              Acompanhar pedido
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
