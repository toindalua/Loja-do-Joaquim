
import * as React from "react" // Importa React para criar componentes
import * as ProgressPrimitive from "@radix-ui/react-progress" // Importa componentes base do Radix UI para barra de progresso

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente Progress com encaminhamento de referências
// Este componente cria uma barra de progresso personalizável
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>, // Tipo da referência (elemento DOM do componente raiz)
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> // Props aceitas (todas as props do componente raiz)
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref} // Passa a referência para o componente raiz
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // Estilo base para a barra de progresso (container)
      className // Permite classes personalizadas adicionais
    )}
    {...props} // Passa todas as props adicionais para o componente raiz
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all" // Estilo para o indicador de progresso (parte preenchida)
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Define largura do indicador baseado no valor de progresso
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName // Define nome para DevTools

// Exporta o componente Progress para uso em outros arquivos
export { Progress }
