
import * as React from "react" // Importa React para criar componentes
import { OTPInput, OTPInputContext } from "input-otp" // Importa componentes base para entrada de OTP (One Time Password)
import { Dot } from "lucide-react" // Importa o ícone de ponto da biblioteca Lucide

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes

// Define o componente InputOTP com encaminhamento de referências
// Este componente cria um campo para inserção de códigos OTP (senhas de uso único)
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>, // Tipo da referência (elemento do componente OTPInput)
  React.ComponentPropsWithoutRef<typeof OTPInput> // Props aceitas (todas as props do OTPInput)
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref} // Passa a referência para o componente OTPInput
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50", // Estilos para o container com opacidade reduzida quando desabilitado
      containerClassName // Permite classes personalizadas adicionais para o container
    )}
    className={cn("disabled:cursor-not-allowed", className)} // Estilo quando desabilitado e classes personalizadas
    {...props} // Passa todas as props adicionais
  />
))
InputOTP.displayName = "InputOTP" // Define nome para DevTools

// Define o componente InputOTPGroup com encaminhamento de referências
// Este componente agrupa os slots individuais do OTP
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">, // Tipo da referência (elemento div)
  React.ComponentPropsWithoutRef<"div"> // Props aceitas (todas as props de div)
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} /> // Container flex para alinhar os slots
))
InputOTPGroup.displayName = "InputOTPGroup" // Define nome para DevTools

// Define o componente InputOTPSlot com encaminhamento de referências
// Este componente representa cada dígito individual no campo OTP
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">, // Tipo da referência (elemento div)
  React.ComponentPropsWithoutRef<"div"> & { index: number } // Props aceitas (props de div + índice do slot)
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext) // Obtém contexto do OTPInput
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] // Extrai dados do slot pelo índice

  return (
    <div
      ref={ref} // Passa a referência para o elemento div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", // Estilo base do slot com bordas e cantos arredondados
        isActive && "z-10 ring-2 ring-ring ring-offset-background", // Destaque visual quando o slot está ativo
        className // Permite classes personalizadas adicionais
      )}
      {...props} // Passa todas as props adicionais
    >
      {char} {/* Exibe o caractere inserido */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" /> {/* Cursor de texto animado */}
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot" // Define nome para DevTools

// Define o componente InputOTPSeparator com encaminhamento de referências
// Este componente cria separadores visuais entre os slots de OTP
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">, // Tipo da referência (elemento div)
  React.ComponentPropsWithoutRef<"div"> // Props aceitas (todas as props de div)
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}> {/* Elemento separador com papel semântico */}
    <Dot /> {/* Ícone de ponto como separador visual */}
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator" // Define nome para DevTools

// Exporta todos os componentes para uso em outros arquivos
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
