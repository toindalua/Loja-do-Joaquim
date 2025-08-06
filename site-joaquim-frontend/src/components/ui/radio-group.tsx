
import * as React from "react" // Importa React para criar componentes
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group" // Importa componentes base do Radix UI para grupos de radio buttons
import { Circle } from "lucide-react" // Importa o ícone de círculo da biblioteca Lucide

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente RadioGroup com encaminhamento de referências
// Este componente cria um grupo de opções radio button
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>, // Tipo da referência (elemento DOM do componente raiz)
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> // Props aceitas (todas as props do componente raiz)
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)} // Layout em grid com espaçamento entre itens
      {...props} // Passa todas as props adicionais para o componente raiz
      ref={ref} // Passa a referência para o componente raiz
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName // Define nome para DevTools

// Define o componente RadioGroupItem com encaminhamento de referências
// Este componente cria uma opção individual dentro do RadioGroup
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>, // Tipo da referência (elemento DOM do item)
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> // Props aceitas (todas as props do item)
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref} // Passa a referência para o componente de item
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", // Estilo do radio button (círculo)
        className // Permite classes personalizadas adicionais
      )}
      {...props} // Passa todas as props adicionais para o componente de item
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" /> {/* Indicador visual quando selecionado (círculo interior) */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName // Define nome para DevTools

// Exporta os componentes para uso em outros arquivos
export { RadioGroup, RadioGroupItem }
