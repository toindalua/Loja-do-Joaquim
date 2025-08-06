
import { useState } from 'react'; // Importa o hook useState do React para gerenciar o estado interno do componente (no caso, a senha digitada)
import { Button } from '@/components/ui/button'; // Importa o componente Button da UI personalizada
import { Input } from '@/components/ui/input'; // Importa o componente Input da UI personalizada
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Importa componentes de cartão da UI personalizada para estruturar o layout
import { toast } from 'sonner'; // Importa a função toast da biblioteca sonner para exibir notificações

// Define a interface das props que o componente AdminLogin recebe
// Espera uma função onLogin que recebe uma senha como parâmetro e retorna um boolean
interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

// Define o componente funcional AdminLogin que recebe as props definidas acima
const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  // Cria um estado local para armazenar a senha digitada pelo usuário
  const [password, setPassword] = useState('');

  // Função que é executada quando o formulário é enviado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    
    const success = onLogin(password); // Chama a função onLogin passando a senha digitada e armazena o resultado
    
    if (!success) { // Se o login falhar (retornar false)
      toast.error('Senha incorreta. Tente novamente.'); // Exibe uma notificação de erro
    }
  };

  // Retorna a estrutura JSX do componente
  return (
    <div className="container mx-auto flex items-center justify-center h-screen"> 
      <Card className="w-full max-w-md"> {/* Cartão com largura máxima de 400px */}
        <CardHeader>
          <CardTitle className="text-center">Acesso Administrativo</CardTitle> {/* Título centralizado */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Formulário com espaçamento vertical entre elementos */}
            <div className="space-y-2"> {/* Container para o input e label com espaçamento vertical */}
              <label htmlFor="password" className="text-sm font-medium">
                Senha de administrador
              </label>
              <Input
                id="password"
                type="password" // Campo do tipo password (oculta os caracteres)
                placeholder="Digite a senha de admin"
                value={password} // Vincula o valor do input ao estado password
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado quando o input muda
                required // Torna o campo obrigatório
              />
            </div>
            <Button type="submit" className="w-full"> {/* Botão que ocupa toda a largura disponível */}
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin; // Exporta o componente para ser usado em outros arquivos
