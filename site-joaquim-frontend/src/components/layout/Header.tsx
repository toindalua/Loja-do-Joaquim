import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Settings, LogIn, LogOut } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useIsAdmin } from '../../hooks/useIsAdmin';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = useIsAdmin();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuCategories = [
    { name: 'Masculino', path: '/categoria/masculino' },
    { name: 'Feminino', path: '/categoria/feminino' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo + Menu */}
          <div className="flex items-center gap-6">
            <Link to="/" className="font-heading font-bold text-2xl">
              Loja do Joaquim
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
  {menuCategories.map((category) => (
    <Link 
      key={category.name} 
      to={category.path} 
      className="text-foreground hover:text-accent font-medium transition-colors duration-200"
    >
      {category.name}
    </Link>
  ))}
</nav>

          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin" className="flex items-center gap-1">
                      <Settings size={18} />
                      <span>Admin</span>
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="sm">
                  <Link to="/conta" className="flex items-center gap-1">
                    <User size={18} />
                    <span>Minha Conta</span>
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-1">
                  <LogOut size={18} />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login" className="flex items-center gap-1">
                    <LogIn size={18} />
                    <span>Entrar</span>
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/cadastro" className="flex items-center gap-1">
                    <span>Cadastrar</span>
                  </Link>
                </Button>
              </div>
            )}

            {isAuthenticated && isAdmin && (
  <Link to="/admin" className="text-foreground hover:text-accent transition-colors duration-200" title="Área de administração">
    <Settings size={24} />
  </Link>
)}

{isAuthenticated && (
  <Link to="/conta" className="text-foreground hover:text-accent transition-colors duration-200">
    <User size={24} />
  </Link>
)}

<Link to="/carrinho" className="text-foreground hover:text-accent transition-colors duration-200 relative">
  <ShoppingCart size={24} />
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
</Link>

            <button 
              className="md:hidden text-kickit-black"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-kickit-gray-light animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {menuCategories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.path} 
                  className="text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/conta" 
                      className="flex items-center gap-1 text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>Minha Conta</span>
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-1 text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings size={18} />
                        <span>Administração</span>
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-1 text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                    >
                      <LogOut size={18} />
                      <span>Sair</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="flex items-center gap-1 text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn size={18} />
                      <span>Entrar</span>
                    </Link>
                    <Link 
                      to="/cadastro" 
                      className="flex items-center gap-1 text-kickit-black hover:text-kickit-orange font-medium transition-colors duration-200 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Cadastrar</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
