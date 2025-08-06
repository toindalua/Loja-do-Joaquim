import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cartItems, subtotal, clearCart } = useCart();

  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu Carrinho</h1>
        <p className="text-kickit-gray-medium mb-8">
          Seu carrinho está vazio no momento.
        </p>
        <Link to="/produtos" className="btn-primary">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Seção de itens do carrinho - lado esquerdo */}
        <div className="lg:w-2/3">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flow-root">
              <div className="divide-y divide-kickit-gray-light">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    item={item}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t border-kickit-gray-light">
              <Link
                to="/produtos"
                className="text-kickit-orange hover:underline flex items-center"
              >
                <ArrowRight size={16} className="mr-1 rotate-180" />
                Continuar Comprando
              </Link>
              <button
                onClick={clearCart}
                className="text-kickit-gray-medium hover:text-kickit-black"
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Resumo do pedido - lado direito */}
        <div className="lg:w-1/3">
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>
                  {shipping === 0
                    ? 'Grátis'
                    : shipping.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                </span>
              </div>

              {shipping === 0 && (
                <div className="text-green-600 text-sm">
                  Você ganhou frete grátis!
                </div>
              )}

              <div className="border-t border-kickit-gray-light pt-2 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Botão para finalizar a compra */}
            <Link
              to="/checkout"
              className="btn-primary w-full mt-6 py-3 flex justify-center items-center"
            >
              Finalizar Compra
              <ArrowRight size={16} className="ml-2" />
            </Link>

            {/* Métodos de pagamento */}
            <div className="mt-4 text-xs text-kickit-gray-medium text-center">
              <p>Métodos de pagamento aceitos:</p>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-10 h-6 bg-kickit-gray-light rounded"></div>
                <div className="w-10 h-6 bg-kickit-gray-light rounded"></div>
                <div className="w-10 h-6 bg-kickit-gray-light rounded"></div>
                <div className="w-10 h-6 bg-kickit-gray-light rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
