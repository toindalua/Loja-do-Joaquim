
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kickit-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Primeira coluna - Logo e descrição */}
          <div className="space-y-4">
            <Link to="/" className="font-heading font-bold text-2xl inline-block">
              Loja do Joaquim
            </Link>
            <p className="text-gray-400 text-sm">
              Sua loja de roupas e calçados esportivos com estilo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Segunda coluna - Links Produtos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><Link to="/categoria/tenis" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Tênis</Link></li>
              <li><Link to="/categoria/camisetas" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Camisetas</Link></li>
              <li><Link to="/categoria/calcas" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Calças</Link></li>
              <li><Link to="/categoria/jaquetas" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Jaquetas</Link></li>
              <li><Link to="/categoria/meias" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Meias</Link></li>
            </ul>
          </div>

          {/* Terceira coluna - Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Contato</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">FAQ</Link></li>
              <li><Link to="/termos" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Termos e Condições</Link></li>
              <li><Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Quarta coluna - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Assine para receber nossas novidades e ofertas exclusivas.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 text-sm rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-kickit-orange"
              />
              <button className="btn-primary w-full text-sm">Assinar</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} Loja do Joaquim. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
