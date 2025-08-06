
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define as variantes do botão usando class-variance-authority (cva)
// Isso permite criar diferentes estilos de botão baseados em props
const buttonVariants = cva(
  // Classes base que todos os botões terão
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Variantes que podem ser aplicadas ao botão
    variants: {
      // Variantes de aparência visual
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Estilo padrão (fundo colorido)
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Estilo para ações destrutivas (vermelho)
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Estilo com apenas borda
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Estilo secundário
        ghost: "hover:bg-accent hover:text-accent-foreground", // Estilo fantasma (sem fundo até hover)
        link: "text-primary underline-offset-4 hover:underline", // Estilo de link
      },
      // Variantes de tamanho
      size: {
        default: "h-10 px-4 py-2", // Tamanho padrão
        sm: "h-9 rounded-md px-3", // Pequeno
        lg: "h-11 rounded-md px-8", // Grande
        icon: "h-10 w-10", // Formato quadrado para ícones
      },
    },
    // Variantes padrão quando não especificadas
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Define a interface para as props do botão, estendendo HTMLButtonElement
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // Prop para usar o Slot em vez de button
}

// Componente Button com forward ref para passar referências
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Se asChild for true, renderiza o Slot que passará as props para o elemento filho
    // Senão, renderiza um button normal
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" // Define o nome de exibição para ferramentas de dev

// Exporta o componente Button e as variantes para uso em outros arquivos
export { Button, buttonVariants }
