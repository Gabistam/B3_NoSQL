import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';
import { ProductListProps } from '@/types';

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  // Filtrer les produits en fonction des filtres sélectionnés
  const filteredProducts = productsData.filter(product => {
    // Filtre par catégorie
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Filtre par sport
    if (filters.sports.length > 0 && !filters.sports.includes(product.sport)) {
      return false;
    }
    
    // Filtre par prix
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded shadow overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Placeholder pour les images */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Image Produit
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.category} - {product.sport}</p>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">{product.price.toFixed(2)}€</span>
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark"
                >
                  Voir
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-500">Aucun produit ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;