import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { Product } from '../types';
import AddToCartButton from '../components/cart/AddToCartButton';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    // Simuler une requête API
    setLoading(true);
    
    // Rechercher le produit par ID
    const foundProduct = productsData.find(p => p.id === id);
    
    setTimeout(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    }, 300); // Petit délai pour simuler un chargement
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-xl font-bold mb-2">Produit non trouvé</h2>
          <p>Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Image du produit */}
          <div className="md:w-1/2 h-80 bg-gray-200 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-contain h-full w-full"
              />
            ) : (
              <div className="text-gray-400 text-xl">Image non disponible</div>
            )}
          </div>
          
          {/* Informations du produit */}
          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">{product.category} | {product.sport}</span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.toFixed(1)} ({product.reviews.length} avis)
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-primary mb-6">
              {product.price.toFixed(2)}€
            </div>
            
            <div className="mb-6">
              <div className="text-gray-700 mb-2">Quantité:</div>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-l"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-r"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <AddToCartButton 
                product={product} 
                quantity={quantity} 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded transition-colors"
              />
            </div>
            
            {product.stock < 5 && (
              <div className="mt-4 text-orange-500">
                {product.stock > 0 
                  ? `Plus que ${product.stock} en stock!` 
                  : "Rupture de stock"}
              </div>
            )}
          </div>
        </div>
        
        {/* Onglets d'information supplémentaire */}
        <div className="border-t mt-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Détails du produit</h2>
            <p className="text-gray-700">
              {product.description}
            </p>
          </div>
        </div>
        
        {/* Section des avis */}
        <div className="border-t">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Avis clients ({product.reviews.length})</h2>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{review.userName}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun avis pour ce produit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;