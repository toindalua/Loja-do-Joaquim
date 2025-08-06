
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

// Define o componente Separator com encaminhamento de referências
// Este componente cria uma linha divisória horizontal ou vertical
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { 
      className, 
      orientation = "horizontal", // Orientação padrão é horizontal
      decorative = true, // Por padrão é decorativo (não afeta a navegação por teclado)
      ...props 
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative} // Define se o separador é puramente decorativo
      orientation={orientation} // Define a orientação (horizontal ou vertical)
      className={cn(
        "shrink-0 bg-border", // Estilo básico com cor de borda
        // Aplica altura ou largura dependendo da orientação
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
