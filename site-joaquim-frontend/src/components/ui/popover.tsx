
import * as React from "react" // Importa React para criar componentes
import * as PopoverPrimitive from "@radix-ui/react-popover" // Importa componentes base do Radix UI para popovers

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Exporta o componente raiz do Popover diretamente
const Popover = PopoverPrimitive.Root

// Exporta o gatilho do Popover diretamente
const PopoverTrigger = PopoverPrimitive.Trigger

// Define o componente PopoverContent com encaminhamento de referências
// Este componente define a aparência e comportamento do conteúdo do popover
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>, // Tipo da referência (elemento DOM do conteúdo)
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> // Props aceitas (todas as props do conteúdo)
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal> {/* Portal para renderizar o conteúdo fora da hierarquia DOM atual */}
    <PopoverPrimitive.Content
      ref={ref} // Passa a referência para o componente de conteúdo
      align={align} // Define o alinhamento horizontal (center, start, end)
      sideOffset={sideOffset} // Define o espaçamento do elemento de origem
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", // Estilos e animações para o popover
        className // Permite classes personalizadas adicionais
      )}
      {...props} // Passa todas as props adicionais para o componente de conteúdo
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName // Define nome para DevTools

// Exporta os componentes para uso em outros arquivos
export { Popover, PopoverTrigger, PopoverContent }
