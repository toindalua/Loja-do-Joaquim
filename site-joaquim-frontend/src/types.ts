
// Define a interface do produto com suas propriedades
export type Product = {
  id: number;
  name: string;
  price: string; // ou number, dependendo de como você quiser lidar com preços
  image: string;
  subcategory: string;
  category: string;
  availableSizes: string[];
};

// Define a interface de um item no carrinho
export interface CartItem {
  product: Product;        // O produto adicionado ao carrinho
  quantity: number;        // Quantidade selecionada
  size?: string;           // Tamanho selecionado (opcional)
  color?: string;          // Cor selecionada (opcional)
}

// Define a interface de uma categoria
export interface Category {
  id: number;              // Identificador único da categoria
  name: string;            // Nome da categoria para exibição
  value: string;           // Valor da categoria para uso em URLs e filtros
}

// Define a interface de um endereço para entrega
export interface Address {
  street: string;          // Nome da rua
  district: string;        // Bairro
  city: string;            // Cidade
  state: string;           // Estado
  zipCode: string;         // CEP
  phone: string;           // Telefone de contato
}

// Define a interface de um item em um pedido
export interface OrderItem {
  id: number;              // Identificador único do item
  name: string;            // Nome do produto
  price: number;           // Preço do produto
  quantity: number;        // Quantidade
  size?: string;           // Tamanho escolhido (opcional)
  color?: string;          // Cor escolhida (opcional)
}

// Define a interface completa de um pedido
export interface Order {
  id: number;              // Identificador único do pedido
  customerName: string;    // Nome do cliente
  date: string;            // Data do pedido
  total: number;           // Valor total do pedido
  items: OrderItem[];      // Itens incluídos no pedido
  status: OrderStatus;     // Status atual do pedido
  address: Address;        // Endereço de entrega
  paymentMethod: PaymentMethod; // Método de pagamento escolhido
  notes?: string;          // Observações adicionais (opcional)
}

// Define os possíveis status de um pedido como um tipo union
export type OrderStatus = 
  | 'aguardando_confirmacao'  // Pedido foi feito mas ainda não foi verificado pelo operador
  | 'confirmado'              // Pedido foi confirmado pelo operador
  | 'em_separacao'            // Produtos estão sendo separados para envio
  | 'aguardando_pagamento'    // Aguardando que o cliente efetue o pagamento
  | 'enviado'                 // Pedido foi enviado para entrega
  | 'entregue'                // Pedido foi entregue com sucesso
  | 'cancelado';              // Pedido foi cancelado

// Define os possíveis métodos de pagamento como um tipo union
export type PaymentMethod = 'cartao' | 'pix' | 'dinheiro' | 'crediario';

// Define a interface para controle de administrador
export interface Admin {
  isAdmin: boolean;        // Flag que indica se o usuário é um administrador
}
