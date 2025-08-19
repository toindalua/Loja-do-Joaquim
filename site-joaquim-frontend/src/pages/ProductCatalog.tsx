import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { Product } from '../types';

const ProductCatalog = () => {
  const { category } = useParams<{ category?: string }>();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const [sizeOptions, setSizeOptions] = useState<{ label: string; value: string }[]>([]);


  
  useEffect(() => {
    if (category) {
      setSelectedSubcategories([category]);
    }
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4001/produtos');
      const data = await response.json();
      setProdutos(data);
      setFilteredProducts(data);

      // Gerar subcategorias únicas
      const subcategoriesSet = new Set(data.map((product: Product) => product.subcategory));
      const subcategoryOptions = Array.from(subcategoriesSet)
        .filter(Boolean)
        .map((subcat: string) => ({
          label: subcat.charAt(0).toUpperCase() + subcat.slice(1),
          value: subcat,
        }));
      setSubcategoryOptions(subcategoryOptions);

      // Gerar tamanhos únicos
      const sizesSet = new Set(
        data.flatMap((product: Product) => product.availableSizes || [])
      );
      const sizeOptions = Array.from(sizesSet).map((size: string) => ({
        label: size,
        value: size,
      }));
      setSizeOptions(sizeOptions);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...produtos];

    // Filtro por subcategoria
    if (selectedSubcategories.length > 0) {
      result = result.filter(product =>
        selectedSubcategories.includes(product.subcategory)
      );
    }

    // Filtro por tamanho
    if (selectedSizes.length > 0) {
      result = result.filter(product =>
        product.availableSizes?.some(size => selectedSizes.includes(size))
      );
    }

    setFilteredProducts(result);
  }, [selectedSubcategories, selectedSizes, produtos]);

  const handleFilterChange = (type: string, value: string[]) => {
    if (type === 'categories') {
      setSelectedSubcategories(value);
    } else if (type === 'sizes') {
      setSelectedSizes(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category 
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : 'Todos os Produtos'
        }
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <ProductFilters 
          categories={subcategoryOptions}
          sizes={sizeOptions}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-kickit-gray-medium">
              {filteredProducts.length} produtos encontrados
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm">
                Ordenar por:
              </label>
              <select 
                id="sort"
               className="w-full bg-background text-foreground border border-border rounded px-2 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"

              >
                <option value="newest">Mais recentes</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-kickit-gray-medium">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
