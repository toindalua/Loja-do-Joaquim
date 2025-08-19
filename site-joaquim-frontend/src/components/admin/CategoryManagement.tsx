import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: number;
  nome: string;
}

interface Subcategory {
  id: number;
  nome: string;
  categoriaId: number;
  categoriaNome?: string;
}

const SubcategoryManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState({ nome: '', categoriaId: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:4001/categorias');
    const data = await res.json();
    setCategories(data);
  };

  const fetchSubcategories = async () => {
    const res = await fetch('http://localhost:4001/subcategorias');
    const data = await res.json();
    setSubcategories(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:4001/subcategorias/${editId}`
      : 'http://localhost:4001/subcategorias';

    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success(editId ? 'Subcategoria atualizada!' : 'Subcategoria adicionada!');
      setFormData({ nome: '', categoriaId: '' });
      setShowForm(false);
      setEditId(null);
      fetchSubcategories();
    } else {
      toast.error('Erro ao salvar subcategoria.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta subcategoria?')) return;
    const res = await fetch(`http://localhost:4001/subcategorias/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Subcategoria excluída.');
      fetchSubcategories();
    } else {
      toast.error('Erro ao excluir subcategoria.');
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setFormData({ nome: subcategory.nome, categoriaId: subcategory.categoriaId.toString() });
    setEditId(subcategory.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Subcategorias</h2>
        <Button onClick={() => { setShowForm(true); setEditId(null); }}>
          <Plus size={16} className="mr-2" /> Nova Subcategoria
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editId ? 'Editar Subcategoria' : 'Nova Subcategoria'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input
                  value={formData.nome}
                  onChange={e => handleInputChange('nome', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <select
                  value={formData.categoriaId}
                  onChange={e => handleInputChange('categoriaId', e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
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
          <CardTitle>Lista de Subcategorias</CardTitle>
        </CardHeader>
        <CardContent>
          {subcategories.length > 0 ? (
            <ul className="space-y-4">
              {subcategories.map(sub => (
                <li key={sub.id} className="border p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-bold">{sub.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      Categoria: {sub.categoriaNome || sub.categoriaId}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEdit(sub)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(sub.id)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nenhuma subcategoria cadastrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubcategoryManagement;
