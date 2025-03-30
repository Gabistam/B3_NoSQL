import { Link } from 'react-router-dom';
import { CartItem } from '../../types';

const MiniCart = () => {
  // Données mockées pour le mini-panier (temporaire)
  const cartItems: CartItem[] = [
    { productId: "1", name: "Ballon de football", price: 29.99, quantity: 1, imageUrl: "/assets/football.jpg" },
    { productId: "2", name: "Chaussures de running", price: 89.99, quantity: 1, imageUrl: "/assets/running-shoes.jpg" },
    { productId: "3", name: "Tapis de yoga", price: 19.99, quantity: 1, imageUrl: "/assets/yoga-mat.jpg" }
  ];
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold border-b pb-2">Mon panier</h3>
        
        {cartItems.length > 0 ? (
          <>
            <ul className="divide-y">
              {cartItems.map(item => (
                <li key={item.productId} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                  <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</span>
                </li>
              ))}
            </ul>
            
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            
            <div className="mt-4 space-y-2">
              <Link to="/cart" className="btn-primary w-full block text-center">
                Voir le panier
              </Link>
              <button className="w-full py-2 px-4 bg-accent hover:bg-accent-dark text-white font-bold rounded transition-colors">
                Commander
              </button>
            </div>
          </>
        ) : (
          <p className="py-4 text-center text-gray-500">Votre panier est vide</p>
        )}
      </div>
    </div>
  );
};

export default MiniCart;