
import * as React from "react" // Importa React para criar componentes
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu" // Importa componentes base do Radix UI para navegação
import { cva } from "class-variance-authority" // Importa cva para definir variantes de classes
import { ChevronDown } from "lucide-react" // Importa ícone de seta para baixo

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente NavigationMenu com encaminhamento de referências
// Fornece a estrutura base do menu de navegação
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref} // Passa a referência para o componente raiz
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center", // Estilos base para posicionamento e layout
      className // Permite classes personalizadas
    )}
    {...props} // Passa todas as outras props para o componente raiz
  >
    {children}
    <NavigationMenuViewport /> {/* Adiciona o viewport que mostra o conteúdo do menu */}
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName // Define nome para DevTools

// Define o componente NavigationMenuList com encaminhamento de referências
// Contém os itens do menu de navegação
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1", // Estilos para layout horizontal dos itens
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName // Define nome para DevTools

// Exporta o item do menu de navegação diretamente do Radix
const NavigationMenuItem = NavigationMenuPrimitive.Item

// Define estilos para o gatilho do menu de navegação usando cva
// Permite consistência visual em todos os gatilhos
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

// Define o componente NavigationMenuTrigger com encaminhamento de referências
// Este é o botão que abre um submenu
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)} // Aplica estilos do trigger e permite classes adicionais
    {...props}
  >
    {children}{" "} {/* Conteúdo do trigger */}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" // Ícone de seta que rotaciona quando o menu está aberto
      aria-hidden="true" // Esconde para leitores de tela já que é apenas decorativo
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName // Define nome para DevTools

// Define o componente NavigationMenuContent com encaminhamento de referências
// Este é o conteúdo que aparece quando um trigger é clicado
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ", // Animações e posicionamento do conteúdo do menu
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName // Define nome para DevTools

// Exporta o link do menu de navegação diretamente do Radix
const NavigationMenuLink = NavigationMenuPrimitive.Link

// Define o componente NavigationMenuViewport com encaminhamento de referências
// Este é o container onde o conteúdo do menu é renderizado
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}> {/* Container para posicionamento */}
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]", // Estilos e animações para o viewport
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName // Define nome para DevTools

// Define o componente NavigationMenuIndicator com encaminhamento de referências
// Este é um indicador visual que mostra qual item está selecionado
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in", // Animações para mostrar/esconder o indicador
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" /> {/* Elemento visual do indicador (seta) */}
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName // Define nome para DevTools

// Exporta todos os componentes para uso em outros arquivos
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
