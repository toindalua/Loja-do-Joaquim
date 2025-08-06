
import { Outlet } from 'react-router-dom'; // Importa Outlet do React Router para renderizar as rotas filhas
import Header from './Header'; // Importa o componente de cabeçalho
import Footer from './Footer'; // Importa o componente de rodapé

// Define o componente Layout
// Este componente fornece uma estrutura comum para todas as páginas
// Organiza o layout com cabeçalho, conteúdo principal e rodapé
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Container flex com altura mínima da tela inteira */}
      <Header /> {/* Renderiza o cabeçalho no topo */}
      <main className="flex-grow"> {/* Conteúdo principal com crescimento flexível para ocupar espaço disponível */}
        <Outlet /> {/* Renderiza o componente da rota atual (rotas aninhadas) */}
      </main>
      <Footer /> {/* Renderiza o rodapé na parte inferior */}
    </div>
  );
};

export default Layout; // Exporta o componente Layout
