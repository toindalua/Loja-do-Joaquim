
import * as React from "react" // Importa React para criar componentes
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area" // Importa componentes base do Radix UI para áreas de rolagem

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente ScrollArea com encaminhamento de referências
// Este componente cria uma área com rolagem personalizada
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>, // Tipo da referência (elemento DOM do componente raiz)
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> // Props aceitas (todas as props do componente raiz)
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref} // Passa a referência para o componente raiz
    className={cn("relative overflow-hidden", className)} // Estilo base e permite classes adicionais
    {...props} // Passa todas as props adicionais para o componente raiz
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children} {/* Conteúdo que será rolável */}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar /> {/* Adiciona a barra de rolagem personalizada */}
    <ScrollAreaPrimitive.Corner /> {/* Adiciona o canto da área de rolagem */}
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName // Define nome para DevTools

// Define o componente ScrollBar com encaminhamento de referências
// Este componente cria a barra de rolagem visual
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, // Tipo da referência
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> // Props aceitas
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref} // Passa a referência para o componente de barra de rolagem
    orientation={orientation} // Define se a rolagem é vertical ou horizontal
    className={cn(
      "flex touch-none select-none transition-colors", // Estilos base
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]", // Estilos específicos para barra vertical
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]", // Estilos específicos para barra horizontal
      className // Permite classes personalizadas adicionais
    )}
    {...props} // Passa todas as props adicionais para o componente de barra de rolagem
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" /> {/* Estilo do "polegar" da barra de rolagem */}
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName // Define nome para DevTools

// Exporta os componentes para uso em outros arquivos
export { ScrollArea, ScrollBar }
