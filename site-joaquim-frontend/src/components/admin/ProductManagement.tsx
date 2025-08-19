import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  subcategory: string;
  availableSizes: string[];
}

const ALL_SIZES = ['P', 'M', 'G', 'GG', ...Array.from({ length: 25 }, (_, i) => (20 + i).toString())];

const ProductManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: '',
    image: '',
    category: '',
    subcategory: '',
    availableSizes: [],
  });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4001/produtos');
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:4001/categorias');
    const data = await res.json();
    setCategories(data.map((c: any) => c.nome));
  };

  const fetchSubcategories = async () => {
    const res = await fetch('http://localhost:4001/subcategorias');
    const data = await res.json();
    console.log("data: ",data);
    setSubcategories(data.map((s: any) => `${s.nome} - ${s.categoria}`));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSize = (size: string) => {
    setFormData(prev => {
      const exists = prev.availableSizes.includes(size);
      return {
        ...prev,
        availableSizes: exists
          ? prev.availableSizes.filter(s => s !== size)
          : [...prev.availableSizes, size],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:4001/produtos/${editId}`
      : 'http://localhost:4001/produtos';

    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success(editId ? 'Produto atualizado!' : 'Produto adicionado!');
      setFormData({
        name: '',
        price: '',
        image: '',
        category: '',
        subcategory: '',
        availableSizes: [],
      });
      setShowForm(false);
      setEditId(null);
      fetchProducts();
    } else {
      toast.error('Erro ao salvar produto.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    const res = await fetch(`http://localhost:4001/produtos/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Produto excluído.');
      fetchProducts();
    } else {
      toast.error('Erro ao excluir produto.');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({ ...product });
    setEditId(product.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <Button onClick={() => { setShowForm(true); setEditId(null); }}>
          <Plus size={16} className="mr-2" /> Adicionar Produto
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editId ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
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
                  <Input value={formData.image} onChange={e => handleInputChange('image', e.target.value)} required />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <select
                    value={formData.category}
                    onChange={e => handleInputChange('category', e.target.value)}
                    className="w-full bg-background text-foreground border border-border rounded px-2 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"

                  >
                    <option value="">Selecione...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Subcategoria</Label>
                  <select
                    value={formData.subcategory}
                    onChange={e => handleInputChange('subcategory', e.target.value)}
                    className="w-full bg-background text-foreground border border-border rounded px-2 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"

                  >
                    <option value="">Selecione...</option>
                    {subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Tamanhos disponíveis</Label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border p-2 rounded">
                    {ALL_SIZES.map(size => (
                      <label key={size} className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.availableSizes.includes(size)}
                          onChange={() => toggleSize(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editId ? 'Atualizar' : 'Salvar'}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>
                  Cancelar
                </Button>
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
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map(product => (
                <li key={product.id} className="border p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category} / {product.subcategory}</p>
                    <p className="text-sm">R$ {product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEdit(product)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(product.id)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nenhum produto cadastrado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
