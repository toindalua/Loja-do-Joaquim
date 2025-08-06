
import { cn } from "@/lib/utils"

// Define o componente Skeleton
// Este componente cria um elemento visual temporário durante o carregamento de conteúdo
// Ele mostra uma animação de "pulso" que indica que o conteúdo está carregando
function Skeleton({
  className, // Classes CSS personalizadas
  ...props // Props adicionais para o elemento div
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)} // Combina a classe de animação padrão com classes personalizadas
      {...props} // Passa todas as props adicionais para o elemento div
    />
  )
}

export { Skeleton }
