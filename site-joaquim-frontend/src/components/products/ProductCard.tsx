import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/produto/${product.id}`} className="block overflow-hidden">
        <div className="relative overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <span className="font-semibold text-lg">
              {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <p className="text-kickit-gray-medium text-sm mb-3">
            {product.subcategory} • {product.category}
          </p>
          <div className="flex flex-wrap gap-1 text-xs text-gray-500">
            {product.availableSizes.map((size) => (
              <span key={size} className="border rounded px-2 py-0.5">
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <button 
          onClick={handleAddToCart} 
          className="btn-primary w-full text-sm"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
