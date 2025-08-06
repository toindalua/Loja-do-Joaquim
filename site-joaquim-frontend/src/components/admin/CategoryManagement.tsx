import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  subcategory: string;
  category: string;
  availableSizes: string[];
}

const ProductManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    subcategory: '',
    availableSizes: '',
  });

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:4001/produtos');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast.error('Erro ao buscar produtos do banco.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui deveria haver uma chamada POST para salvar no banco

    toast.success('Produto adicionado com sucesso!');
    setFormData({
      name: '',
      price: '',
      image: '',
      category: '',
      subcategory: '',
      availableSizes: '',
    });
    setShowForm(false);
    fetchProducts(); // Atualiza lista
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          <Plus size={16} />
          Adicionar Produto
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
                </div>
                <div>
                  <Label>Preço</Label>
                  <Input value={formData.price} onChange={e => handleInputChange('price', e.target.value)} required />
                </div>
                <div>
                  <Label>Imagem (URL)</Label>
                  <Input value={formData.image} onChange={e => handleInputChange('image', e.target.value)} />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Input value={formData.category} onChange={e => handleInputChange('category', e.target.value)} />
                </div>
                <div>
                  <Label>Subcategoria</Label>
                  <Input value={formData.subcategory} onChange={e => handleInputChange('subcategory', e.target.value)} />
                </div>
                <div>
                  <Label>Tamanhos disponíveis (separados por vírgula)</Label>
                  <Input value={formData.availableSizes} onChange={e => handleInputChange('availableSizes', e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Salvar</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground">Nenhum produto encontrado no banco.</p>
          ) : (
            <ul className="space-y-4">
              {products.map(prod => (
                <li key={prod.id} className="border p-4 rounded-md">
                  <p><strong>{prod.name}</strong></p>
                  <p>Categoria: {prod.category}</p>
                  <p>Subcategoria: {prod.subcategory}</p>
                  <p>Preço: R$ {prod.price}</p>
                  <p>Tamanhos: {prod.availableSizes.join(', ')}</p>
                  {prod.image && (
                    <img src={prod.image} alt={prod.name} className="mt-2 max-w-[150px]" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
