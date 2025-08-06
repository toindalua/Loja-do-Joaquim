
import * as React from "react" // Importa React para criar componentes
import * as HoverCardPrimitive from "@radix-ui/react-hover-card" // Importa componentes base do Radix UI para cards flutuantes

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Exporta o componente raiz do HoverCard diretamente
const HoverCard = HoverCardPrimitive.Root

// Exporta o gatilho do HoverCard diretamente
const HoverCardTrigger = HoverCardPrimitive.Trigger

// Define o componente HoverCardContent com encaminhamento de referências
// Este componente define o conteúdo que aparece ao passar o mouse sobre o gatilho
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>, // Tipo da referência (elemento DOM do conteúdo)
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> // Props aceitas (todas as props do conteúdo)
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref} // Passa a referência para o componente de conteúdo
    align={align} // Define o alinhamento horizontal (center por padrão)
    sideOffset={sideOffset} // Define o espaçamento do elemento de origem
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", // Estilos e animações para o card
      className // Permite classes personalizadas adicionais
    )}
    {...props} // Passa todas as props adicionais para o componente de conteúdo
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName // Define nome para DevTools

// Exporta os componentes para uso em outros arquivos
export { HoverCard, HoverCardTrigger, HoverCardContent }
