
import * as React from "react" // Importa React para criar componentes
import * as LabelPrimitive from "@radix-ui/react-label" // Importa componentes base do Radix UI para labels
import { Slot } from "@radix-ui/react-slot" // Importa Slot para passar referências para componentes filhos
import {
  Controller, // Componente de controle do react-hook-form
  ControllerProps, // Tipos de props para o Controller
  FieldPath, // Tipo para caminhos de campo
  FieldValues, // Tipo para valores de campo
  FormProvider, // Provedor de contexto do formulário
  useFormContext, // Hook para acessar o contexto do formulário
} from "react-hook-form"

import { cn } from "@/lib/utils" // Importa função utilitária para combinar classes
import { Label } from "@/components/ui/label" // Importa componente Label personalizado

// Exporta o provedor do formulário diretamente
const Form = FormProvider

// Define o tipo para o contexto de campo do formulário
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName // Nome do campo
}

// Cria o contexto para campos de formulário
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

// Define o componente FormField para integração com react-hook-form
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}> {/* Fornece o nome do campo no contexto */}
      <Controller {...props} /> {/* Renderiza o controlador do react-hook-form */}
    </FormFieldContext.Provider>
  )
}

// Hook personalizado para acessar o estado e metadados do campo atual
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext) // Obtém o contexto do campo
  const itemContext = React.useContext(FormItemContext) // Obtém o contexto do item do formulário
  const { getFieldState, formState } = useFormContext() // Obtém funções e estado do contexto do formulário

  const fieldState = getFieldState(fieldContext.name, formState) // Obtém o estado do campo específico

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>") // Erro se usado fora de um FormField
  }

  const { id } = itemContext // Extrai o ID do contexto do item

  // Retorna dados formatados do campo
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState, // Inclui o estado do campo (erro, sujeira, toque, etc.)
  }
}

// Define o tipo para o contexto de item do formulário
type FormItemContextValue = {
  id: string // ID único para o item
}

// Cria o contexto para itens de formulário
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// Define o componente FormItem com encaminhamento de referências
// Este componente representa um item individual do formulário (label + controle + mensagem)
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId() // Gera um ID único para o item

  return (
    <FormItemContext.Provider value={{ id }}> {/* Fornece o ID no contexto */}
      <div ref={ref} className={cn("space-y-2", className)} {...props} /> {/* Container com espaçamento vertical */}
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem" // Define nome para DevTools

// Define o componente FormLabel com encaminhamento de referências
// Este componente cria um label vinculado ao controle do formulário
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField() // Obtém dados do campo atual

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)} // Estilo especial em caso de erro
      htmlFor={formItemId} // Conecta o label ao controle pelo ID
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel" // Define nome para DevTools

// Define o componente FormControl com encaminhamento de referências
// Este componente encapsula o controle do formulário com metadados de acessibilidade
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField() // Obtém dados do campo atual

  return (
    <Slot
      ref={ref}
      id={formItemId} // ID único para o controle
      aria-describedby={
        !error
          ? `${formDescriptionId}` // Se não há erro, apenas vincula à descrição
          : `${formDescriptionId} ${formMessageId}` // Se há erro, vincula à descrição e à mensagem de erro
      }
      aria-invalid={!!error} // Marca como inválido em caso de erro
      {...props}
    />
  )
})
FormControl.displayName = "FormControl" // Define nome para DevTools

// Define o componente FormDescription com encaminhamento de referências
// Este componente exibe uma descrição ou instruções para o campo
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField() // Obtém o ID da descrição

  return (
    <p
      ref={ref}
      id={formDescriptionId} // Define o ID para vinculação com o controle
      className={cn("text-sm text-muted-foreground", className)} // Estilo de texto auxiliar
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription" // Define nome para DevTools

// Define o componente FormMessage com encaminhamento de referências
// Este componente exibe mensagens de erro ou validação para o campo
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField() // Obtém dados de erro e ID da mensagem
  const body = error ? String(error?.message) : children // Usa a mensagem de erro ou o conteúdo passado como filho

  if (!body) {
    return null // Não renderiza nada se não houver mensagem
  }

  return (
    <p
      ref={ref}
      id={formMessageId} // Define o ID para vinculação com o controle
      className={cn("text-sm font-medium text-destructive", className)} // Estilo de texto de erro
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage" // Define nome para DevTools

// Exporta todos os componentes para uso em outros arquivos
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
