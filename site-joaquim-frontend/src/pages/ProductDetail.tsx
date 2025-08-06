
import { useState, useEffect } from 'react'; // Importa hooks para estado e efeitos
import { useParams, useNavigate } from 'react-router-dom'; // Importa hooks para navegação e parâmetros de URL
import { toast } from 'sonner'; // Importa toast para notificações
import { useCart } from '../hooks/useCart'; // Importa o hook do carrinho
import { mockProducts } from '../data/mockProducts'; // Importa dados de produtos

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do produto da URL
  const navigate = useNavigate(); // Hook para navegação programática
  const { addToCart } = useCart(); // Obtém a função para adicionar ao carrinho
  
  // Encontra o produto pelo ID nos dados mockados
  const product = mockProducts.find(p => p.id === Number(id));
  
  // Estados para controlar as seleções do usuário
  const [selectedSize, setSelectedSize] = useState<string>(''); // Estado para o tamanho selecionado
  const [selectedColor, setSelectedColor] = useState<string>(''); // Estado para a cor selecionada
  const [quantity, setQuantity] = useState(1); // Estado para a quantidade
  const [currentImage, setCurrentImage] = useState(''); // Estado para a imagem atual exibida
  
  // Efeito que executa quando o componente monta ou quando o produto muda
  useEffect(() => {
    if (!product) {
      navigate('/produtos'); // Redireciona para página de produtos se o produto não for encontrado
      toast.error('Produto não encontrado');
      return;
    }
    
    setCurrentImage(product.imageUrl); // Define a imagem principal do produto
    
    // Define valores padrão para tamanho e cor se disponíveis
    if (product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0]);
    }
    
    if (product.availableColors.length > 0) {
      setSelectedColor(product.availableColors[0]);
    }
  }, [product, navigate]);
  
  // Se o produto não existir, retorna null (será tratado pelo useEffect acima)
  if (!product) {
    return null;
  }
  
  // Função para adicionar o produto ao carrinho
  const handleAddToCart = () => {
    // Verifica se o tamanho foi selecionado para tênis
    if (product.category === 'tenis' && !selectedSize) {
      toast.error('Selecione um tamanho');
      return;
    }
    
    // Adiciona o produto ao carrinho com as opções selecionadas
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} adicionado ao carrinho`);
  };
  
  // Função para alterar a quantidade dentro dos limites (1-10)
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Seção de imagens do produto - lado esquerdo */}
        <div className="md:w-1/2">
          <div className="sticky top-24">
            {/* Imagem principal do produto */}
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
            {/* Miniaturas das imagens para seleção */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[product.imageUrl, ...Array(3).fill(product.imageUrl)].map((img, idx) => (
                <button
                  key={idx}
                  className={`border rounded-md overflow-hidden ${currentImage === img ? 'border-kickit-black' : 'border-kickit-gray-light'}`}
                  onClick={() => setCurrentImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Informações do produto - lado direito */}
        <div className="md:w-1/2">
          {/* Tag de "Novo" se o produto for novo */}
          {product.isNew && (
            <span className="inline-block bg-kickit-black text-white text-xs uppercase tracking-wide py-1 px-2 rounded mb-4">
              Novo
            </span>
          )}
          
          {/* Nome do produto */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Preço do produto */}
          <div className="text-2xl font-semibold mb-6">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          
          {/* Descrição do produto */}
          <p className="text-kickit-gray-medium mb-6">
            {product.description}
          </p>
          
          {/* Seleção de tamanho (se disponível) */}
          {product.availableSizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tamanho</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-2 border rounded-md text-center ${
                      selectedSize === size
                        ? 'bg-kickit-black text-white border-kickit-black'
                        : 'bg-white text-kickit-black border-kickit-gray-light hover:bg-kickit-gray-light'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Seleção de cor (se disponível) */}
          {product.availableColors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Cor</h3>
              <div className="flex space-x-3">
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-kickit-black'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Seleção de quantidade */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantidade</h3>
            <div className="flex items-center">
              {/* Botão para diminuir quantidade */}
              <button
                className="px-3 py-1 border border-kickit-gray-light rounded-l-md"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              {/* Input de quantidade */}
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-12 py-1 border-t border-b border-kickit-gray-light text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
              {/* Botão para aumentar quantidade */}
              <button
                className="px-3 py-1 border border-kickit-gray-light rounded-r-md"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Botão para adicionar ao carrinho */}
          <button
            onClick={handleAddToCart}
            className="btn-primary w-full py-3 mb-4"
          >
            Adicionar ao Carrinho
          </button>
          
          {/* Informações adicionais sobre entrega e devolução */}
          <div className="border-t border-kickit-gray-light pt-6 mt-6">
            <div className="mb-4">
              <h4 className="font-semibold">Entrega</h4>
              <p className="text-sm text-kickit-gray-medium">
                Entrega gratuita para compras acima de R$200,00
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Devolução</h4>
              <p className="text-sm text-kickit-gray-medium">
                Devolução gratuita em até 30 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
