
import { Link } from 'react-router-dom'; // Importa o componente Link do React Router para navegação
import ProductCard from '../components/products/ProductCard'; // Importa o componente de card de produto
import { mockProducts } from '../data/mockProducts'; // Importa dados mock de produtos

const Home = () => {
  // Filtra produtos marcados como novos e limita a 4 para exibição em destaque
  const featuredProducts = mockProducts.filter((product) => product.isNew).slice(0, 4);
  
  // Define as categorias em destaque com suas imagens e caminhos de navegação
  const categories = [
    {
      name: 'Tênis',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
      path: '/categoria/tenis',
    },
    {
      name: 'Camisetas',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      path: '/categoria/camisetas',
    },
    {
      name: 'Calças',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
      path: '/categoria/calcas',
    },
  ];

  return (
    <div className="pb-12">
      {/* Hero Section - Banner principal com imagem de fundo e texto */}
      <section className="relative h-[80vh] bg-kickit-gray-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-kickit-black to-transparent opacity-60" />
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center px-4 md:px-16">
          <div className="max-w-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              ESTILO E DESEMPENHO
            </h1>
            <p className="text-white text-lg mb-8">
              Descubra nossa nova coleção de roupas e calçados esportivos para seu estilo único.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categoria/lancamentos" className="btn-primary">
                Ver lançamentos
              </Link>
              <Link to="/produtos" className="bg-white text-kickit-black px-6 py-2 rounded-md font-medium hover:bg-kickit-gray-light transition-all duration-200">
                Ver tudo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Exibição das categorias em destaque */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">CATEGORIAS EM DESTAQUE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mapeia as categorias definidas acima e cria links para cada uma */}
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative h-64 overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-kickit-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products - Produtos em lançamento */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">LANÇAMENTOS</h2>
          <Link
            to="/lancamentos"
            className="text-kickit-orange hover:underline font-medium"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Exibe os produtos em destaque usando o componente ProductCard */}
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotion Banner - Banner promocional */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-kickit-gray-light rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"
                alt="Promotion"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex items-center">
              <div>
                <h3 className="text-xl md:text-3xl font-bold mb-4">
                  PROMOÇÃO ESPECIAL
                </h3>
                <p className="text-kickit-gray-medium mb-6">
                  Desconto de 20% em calçados esportivos selecionados. 
                  Aproveite esta oferta por tempo limitado.
                </p>
                <Link to="/ofertas" className="btn-primary">
                  Ver ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Formulário de inscrição para newsletter */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            ASSINE NOSSA NEWSLETTER
          </h3>
          <p className="text-kickit-gray-medium mb-6">
            Cadastre-se para receber novidades e ofertas exclusivas.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Assinar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home; // Exporta o componente Home
