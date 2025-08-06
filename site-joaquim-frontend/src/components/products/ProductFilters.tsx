import { useState } from 'react';
import { X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  sizes: FilterOption[];
  onFilterChange: (type: string, value: string[]) => void;
}

const ProductFilters = ({ categories, sizes, onFilterChange }: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = (
    type: 'categories' | 'sizes',
    value: string,
    checked: boolean
  ) => {
    let updatedValues: string[] = [];

    if (type === 'categories') {
      updatedValues = checked
        ? [...selectedCategories, value]
        : selectedCategories.filter(v => v !== value);
      setSelectedCategories(updatedValues);
    } else {
      updatedValues = checked
        ? [...selectedSizes, value]
        : selectedSizes.filter(v => v !== value);
      setSelectedSizes(updatedValues);
    }

    onFilterChange(type, updatedValues);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    onFilterChange('categories', []);
    onFilterChange('sizes', []);
  };

  const FiltersContent = () => (
    <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
      <div>
        <h3 className="text-sm font-medium mb-2">Subcategorias</h3>
        {categories.map((cat) => (
          <div key={cat.value} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.value)}
              onChange={(e) =>
                handleFilterChange('categories', cat.value, e.target.checked)
              }
              className="mr-2"
              id={`cat-${cat.value}`}
            />
            <label htmlFor={`cat-${cat.value}`} className="text-sm">
              {cat.label}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tamanhos</h3>
        {sizes.map((size) => (
          <div key={size.value} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size.value)}
              onChange={(e) =>
                handleFilterChange('sizes', size.value, e.target.checked)
              }
              className="mr-2"
              id={`size-${size.value}`}
            />
            <label htmlFor={`size-${size.value}`} className="text-sm">
              {size.label}
            </label>
          </div>
        ))}
      </div>

      {(selectedCategories.length > 0 || selectedSizes.length > 0) && (
        <button
          className="mt-2 text-sm text-red-500 underline"
          onClick={handleClearFilters}
        >
          Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block w-64 border-r pr-4">
        <FiltersContent />
      </div>

      {/* Mobile Filters Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full px-4 py-2 border border-kickit-gray-light rounded-md text-sm font-medium mb-4"
        >
          Filtros
        </button>
      </div>

      {/* Mobile Filters Sidebar */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h2 className="text-lg font-semibold">Filtros</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <FiltersContent />
                </div>
                <div className="border-t p-4">
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full btn-primary"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
