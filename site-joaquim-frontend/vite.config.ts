
import { defineConfig } from "vite"; // Importa a função para definir a configuração do Vite
import react from "@vitejs/plugin-react-swc"; // Plugin do Vite para React com SWC (compilador rápido)
import path from "path"; // Utilitário para manipulação de caminhos de arquivo
import { componentTagger } from "lovable-tagger"; // Plugin personalizado para marcar componentes no Lovable

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Configura o servidor para aceitar conexões de qualquer endereço IPv6
    port: 8080, // Define a porta do servidor de desenvolvimento
  },
  plugins: [
    react(), // Adiciona suporte ao React com SWC para compilação rápida
    mode === 'development' &&
    componentTagger(), // Adiciona o tagger de componentes apenas em ambiente de desenvolvimento
  ].filter(Boolean), // Remove valores falsy do array de plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Configura o alias @ para apontar para a pasta src
    },
  },
}));
