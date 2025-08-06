
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface DeliveryAddressFormProps {
  initialData: {
    fullName: string;
    phone: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    zipCode: string;
    deliveryType: string;
  };
  onSubmit: (data: any) => void;
}

const DeliveryAddressForm = ({ initialData, onSubmit }: DeliveryAddressFormProps) => {
  const form = useForm({
    defaultValues: initialData
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo*</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone*</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua*</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, Avenida, etc" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número*</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Apartamento, bloco, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro*</FormLabel>
                <FormControl>
                  <Input placeholder="Bairro" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP*</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Opção de entrega*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="city" id="city" />
                    <Label htmlFor="city" className="font-normal">Na cidade (entrega em até 2 dias úteis)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outside" id="outside" />
                    <Label htmlFor="outside" className="font-normal">Fora da cidade (entrega em até 5 dias úteis)</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
          <p className="font-semibold">Informações importantes sobre a entrega:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Entregas na cidade: taxa de R$ 15,00 (grátis para compras acima de R$ 200,00)</li>
            <li>Entregas fora da cidade: taxa de R$ 30,00 (grátis para compras acima de R$ 200,00)</li>
            <li>Os prazos podem variar de acordo com a disponibilidade dos produtos</li>
          </ul>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Continuar para o pagamento
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeliveryAddressForm;
