import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa fazer login para acessar essa página.");
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const mockOrders = [
    { id: '12345', date: '15/05/2023', status: 'Entregue', total: 349.9, items: 3 },
    { id: '12344', date: '02/04/2023', status: 'Entregue', total: 129.9, items: 1 },
    { id: '12343', date: '18/03/2023', status: 'Cancelado', total: 199.9, items: 2 }
  ];

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321'
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Perfil atualizado com sucesso');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Senha atualizada com sucesso');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logout realizado com sucesso');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24 border border-border">
            <div className="space-y-1">
              {['profile', 'orders', 'addresses', 'password'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeTab === tab
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {tab === 'profile' && 'Meu Perfil'}
                  {tab === 'orders' && 'Meus Pedidos'}
                  {tab === 'addresses' && 'Endereços'}
                  {tab === 'password' && 'Alterar Senha'}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Meu Perfil</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Meus Pedidos</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-md p-4 hover:border-muted-foreground transition-colors duration-200"
                      >
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Pedido #{order.id}</p>
                            <p className="text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              order.status === 'Entregue' ? 'text-green-500' :
                              order.status === 'Cancelado' ? 'text-red-500' : ''
                            }`}>
                              {order.status}
                            </p>
                            <p className="font-semibold">
                              {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm">
                            {order.items} {order.items === 1 ? 'item' : 'itens'}
                          </p>
                          <Link
                            to={`/pedido/${order.id}`}
                            className="text-accent hover:underline text-sm"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Você ainda não realizou nenhum pedido.
                    </p>
                    <Link to="/produtos" className="btn-primary">
                      Começar a Comprar
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Meus Endereços</h2>
                  <button className="btn-outline text-sm">Adicionar Endereço</button>
                </div>

                <div className="space-y-4">
                  {['Casa', 'Trabalho'].map((label, idx) => (
                    <div key={label} className="border border-border rounded-md p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{label}</h3>
                        {idx === 0 && (
                          <span className="text-sm bg-muted px-2 py-0.5 rounded">Principal</span>
                        )}
                      </div>
                      <p className="text-sm mt-2">João Silva</p>
                      <p className="text-sm">
                        {label === 'Casa' ? 'Rua Exemplo, 123' : 'Av. Comercial, 456'}
                      </p>
                      <p className="text-sm">Bairro, Cidade - SP, 01234-567</p>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button className="text-sm text-accent hover:underline">
                          {idx === 1 ? 'Definir como principal' : 'Editar'}
                        </button>
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Alterar Senha</h2>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  {['Senha atual', 'Nova senha', 'Confirmar nova senha'].map((label, i) => (
                    <div key={i}>
                      <label htmlFor={`pw-${i}`} className="block text-sm font-medium mb-1">
                        {label}
                      </label>
                      <input id={`pw-${i}`} type="password" className="input-field" />
                    </div>
                  ))}
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Atualizar Senha
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
