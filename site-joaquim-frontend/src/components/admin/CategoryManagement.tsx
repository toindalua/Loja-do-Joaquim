import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: number;
  nome: string;
}

interface Subcategory {
  id: number;
  nome: string;
  categorias: Category[];
}

const SubcategoryManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState<{ nome: string; selectedCategories: number[] }>({
    nome: '',
    selectedCategories: [],
  });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:4001/categorias');
    const data = await res.json();
    setCategories(data);
  };

  const fetchSubcategories = async () => {
    const res = await fetch('http://localhost:4001/subcategorias');
    const data = await res.json();

    const formatted = data.reduce((acc: Subcategory[], row: any) => {
      const existing = acc.find(s => s.id === row.id);
      if (existing) {
        existing.categorias.push({ id: row.categoria_id, nome: row.categoria });
      } else {
        acc.push({
          id: row.id,
          nome: row.nome,
          categorias: [{ id: row.categoria_id, nome: row.categoria }],
        });
      }
      return acc;
    }, []);
    setSubcategories(formatted);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (id: number) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(id)
        ? prev.selectedCategories.filter(c => c !== id)
        : [...prev.selectedCategories, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `http://localhost:4001/subcategorias/${editId}` : 'http://localhost:4001/subcategorias';
    const method = editId ? 'PUT' : 'POST';

    const payload = {
      nome: formData.nome,
      categorias: formData.selectedCategories
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(editId ? 'Subcategoria atualizada!' : 'Subcategoria criada!');
      setFormData({ nome: '', selectedCategories: [] });
      setShowForm(false);
      setEditId(null);
      fetchSubcategories();
    } else {
      const err = await res.json();
      toast.error(err.erro || 'Erro ao salvar subcategoria.');
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setFormData({
      nome: subcategory.nome,
      selectedCategories: subcategory.categorias.map(c => c.id),
    });
    setEditId(subcategory.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta subcategoria?')) return;
    const res = await fetch(`http://localhost:4001/subcategorias/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Subcategoria excluída.');
      fetchSubcategories();
    } else {
      toast.error('Erro ao excluir subcategoria.');
    }
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
                <Label>Nome da Subcategoria</Label>
                <Input
                  value={formData.nome}
                  onChange={e => handleInputChange('nome', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Categorias associadas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-1 border p-2 rounded">
                      <Checkbox
                        checked={formData.selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      {cat.nome}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit">{editId ? 'Atualizar' : 'Salvar'}</Button>
                <Button variant="outline" type="button" onClick={() => { setShowForm(false); setEditId(null); }}>
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
                      Categorias: {sub.categorias.map(c => c.nome).join(', ')}
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
