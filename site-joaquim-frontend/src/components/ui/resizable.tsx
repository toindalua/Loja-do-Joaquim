
import { GripVertical } from "lucide-react" // Importa o ícone de alça vertical da biblioteca Lucide
import * as ResizablePrimitive from "react-resizable-panels" // Importa componentes base para painéis redimensionáveis

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente ResizablePanelGroup
// Este componente agrupa painéis redimensionáveis
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col", // Layout flexível que se ajusta à direção dos painéis
      className
    )}
    {...props} // Passa todas as props adicionais para o componente de grupo
  />
)

// Exporta o painel redimensionável diretamente do pacote
const ResizablePanel = ResizablePrimitive.Panel

// Define o componente ResizableHandle
// Este componente cria a alça que permite redimensionar os painéis
const ResizableHandle = ({
  withHandle, // Prop personalizada para mostrar ou não o ícone de alça
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", // Estilos complexos para a alça, adaptando-se à direção dos painéis
      className
    )}
    {...props} // Passa todas as props adicionais para o componente de alça
  >
    {withHandle && ( // Renderiza o ícone de alça apenas se withHandle for true
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" /> {/* Ícone visual da alça */}
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

// Exporta os componentes para uso em outros arquivos
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
