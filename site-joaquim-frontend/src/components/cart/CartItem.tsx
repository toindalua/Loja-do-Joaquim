
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex border-b border-kickit-gray-light py-4">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">{item.product.name}</h3>
            {item.size && (
              <p className="mt-1 text-sm text-kickit-gray-medium">
                Tamanho: {item.size}
              </p>
            )}
            {item.color && (
              <div className="mt-1 flex items-center">
                <span className="text-sm text-kickit-gray-medium mr-2">Cor:</span>
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            )}
          </div>
          <p className="text-base font-medium">
            {item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className="p-1 px-2"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : ""} />
            </button>
            <span className="px-2 py-1">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="p-1 px-2"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleRemoveItem}
            className="text-kickit-gray-medium hover:text-kickit-black"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
