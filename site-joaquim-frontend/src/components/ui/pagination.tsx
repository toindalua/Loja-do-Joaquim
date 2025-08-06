
import * as React from "react" // Importa React para criar componentes
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react" // Importa ícones da biblioteca Lucide

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes
import { ButtonProps, buttonVariants } from "@/components/ui/button" // Importa variantes e props do botão

// Define o componente Pagination
// Este é o container principal para os controles de paginação
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation" // Define o papel para acessibilidade
    aria-label="pagination" // Rótulo para acessibilidade
    className={cn("mx-auto flex w-full justify-center", className)} // Centraliza a navegação
    {...props} // Passa todas as props adicionais
  />
)
Pagination.displayName = "Pagination" // Define nome para DevTools

// Define o componente PaginationContent com encaminhamento de referências
// Este componente contém os itens de paginação
const PaginationContent = React.forwardRef<
  HTMLUListElement, // Tipo da referência (elemento ul)
  React.ComponentProps<"ul"> // Props aceitas (todas as props de ul)
>(({ className, ...props }, ref) => (
  <ul
    ref={ref} // Passa a referência para o elemento ul
    className={cn("flex flex-row items-center gap-1", className)} // Layout horizontal com espaçamento
    {...props} // Passa todas as props adicionais
  />
))
PaginationContent.displayName = "PaginationContent" // Define nome para DevTools

// Define o componente PaginationItem com encaminhamento de referências
// Este componente representa cada item individual na paginação
const PaginationItem = React.forwardRef<
  HTMLLIElement, // Tipo da referência (elemento li)
  React.ComponentProps<"li"> // Props aceitas (todas as props de li)
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} /> // Elemento li com classes personalizáveis
))
PaginationItem.displayName = "PaginationItem" // Define nome para DevTools

// Define o tipo PaginationLinkProps
// Estende as props de um elemento <a> com propriedades adicionais
type PaginationLinkProps = {
  isActive?: boolean // Indica se o link atual está ativo
} & Pick<ButtonProps, "size"> & // Reutiliza a prop "size" do componente Button
  React.ComponentProps<"a"> // Todas as props de um elemento anchor

// Define o componente PaginationLink
// Este componente é um link de paginação estilizado como botão
const PaginationLink = ({
  className,
  isActive,
  size = "icon", // Tamanho padrão é "icon"
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined} // Atributo de acessibilidade para indicar página atual
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost", // Variante do botão baseada no estado ativo
        size, // Tamanho do botão
      }),
      className // Permite classes personalizadas adicionais
    )}
    {...props} // Passa todas as props adicionais
  />
)
PaginationLink.displayName = "PaginationLink" // Define nome para DevTools

// Define o componente PaginationPrevious
// Este componente é o link para ir para a página anterior
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page" // Rótulo para acessibilidade
    size="default" // Tamanho padrão
    className={cn("gap-1 pl-2.5", className)} // Espaçamento para o ícone
    {...props} // Passa todas as props adicionais
  >
    <ChevronLeft className="h-4 w-4" /> {/* Ícone de seta para esquerda */}
    <span>Previous</span> {/* Texto do link */}
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious" // Define nome para DevTools

// Define o componente PaginationNext
// Este componente é o link para ir para a próxima página
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page" // Rótulo para acessibilidade
    size="default" // Tamanho padrão
    className={cn("gap-1 pr-2.5", className)} // Espaçamento para o ícone
    {...props} // Passa todas as props adicionais
  >
    <span>Next</span> {/* Texto do link */}
    <ChevronRight className="h-4 w-4" /> {/* Ícone de seta para direita */}
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext" // Define nome para DevTools

// Define o componente PaginationEllipsis
// Este componente representa reticências para indicar páginas omitidas
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden // Esconde das tecnologias assistivas pois é apenas visual
    className={cn("flex h-9 w-9 items-center justify-center", className)} // Centraliza o ícone
    {...props} // Passa todas as props adicionais
  >
    <MoreHorizontal className="h-4 w-4" /> {/* Ícone de reticências horizontais */}
    <span className="sr-only">More pages</span> {/* Texto para leitores de tela */}
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis" // Define nome para DevTools

// Exporta todos os componentes para uso em outros arquivos
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
