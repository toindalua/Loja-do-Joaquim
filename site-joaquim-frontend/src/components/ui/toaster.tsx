
import { useToast } from "@/hooks/use-toast" // Importa o hook personalizado para gerenciar toasts
import {
  Toast, // Componente base do toast
  ToastClose, // Botão para fechar o toast
  ToastDescription, // Componente para descrição do toast
  ToastProvider, // Provedor de contexto para toasts
  ToastTitle, // Componente para título do toast
  ToastViewport, // Área visível onde os toasts são exibidos
} from "@/components/ui/toast"

// Define o componente Toaster
// Este componente renderiza todos os toasts ativos no sistema
export function Toaster() {
  const { toasts } = useToast() // Obtém a lista de toasts ativos do hook

  return (
    <ToastProvider> {/* Provedor de contexto para o sistema de toast */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}> {/* Renderiza cada toast com um ID único */}
            <div className="grid gap-1"> {/* Layout para conteúdo do toast */}
              {title && <ToastTitle>{title}</ToastTitle>} {/* Renderiza o título se existir */}
              {description && (
                <ToastDescription>{description}</ToastDescription> // Renderiza a descrição se existir
              )}
            </div>
            {action} {/* Renderiza ações do toast (botões, links) */}
            <ToastClose /> {/* Botão para fechar o toast */}
          </Toast>
        )
      })}
      <ToastViewport /> {/* Contêiner para posicionar os toasts na tela */}
    </ToastProvider>
  )
}
