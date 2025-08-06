
import * as React from "react" // Importa React para criar componentes

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes CSS

// Define o componente Input com encaminhamento de referências
// Este componente cria um campo de entrada de texto personalizado
const Input = React.forwardRef<
  HTMLInputElement, // Tipo da referência (elemento input HTML)
  React.ComponentProps<"input"> // Props aceitas (todas as props de um input HTML)
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type} // Define o tipo do input (text, password, email, etc.)
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // Estilos base do input, incluindo estados como foco e desabilitado
        className // Permite classes personalizadas adicionais
      )}
      ref={ref} // Passa a referência para o elemento input
      {...props} // Passa todas as props adicionais para o input
    />
  )
})
Input.displayName = "Input" // Define nome para DevTools

export { Input } // Exporta o componente Input para uso em outros arquivos
