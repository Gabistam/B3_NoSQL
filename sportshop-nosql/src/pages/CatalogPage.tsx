import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/catalog/ProductList';
import ProductFilter from '../components/catalog/ProductFilter';
import productsData from '../data/products.json';

const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Extraire les catégories et sports uniques des produits
  const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
  const uniqueSports = Array.from(new Set(productsData.map(product => product.sport)));

  // État pour les filtres avec des types corrects
  const [filters, setFilters] = useState<{
    categories: string[];
    sports: string[];
    priceRange: [number, number];
  }>({
    categories: categoryParam ? [categoryParam] : [],
    sports: [],
    priceRange: [0, 200]
  });

  // Gestionnaire pour les changements de filtres
  const handleFilterChange = (newFilters: {
    categories: string[];
    sports: string[];
    priceRange: [number, number];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catalogue de produits</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="md:w-1/4">
          <ProductFilter
            categories={uniqueCategories}
            sports={uniqueSports}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Main content with product list */}
        <div className="md:w-3/4">
          <ProductList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;