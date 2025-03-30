import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import MiniCart from '../cart/MiniCart';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const cartItemCount = 3; // Temporaire, sera remplacé par les données réelles
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="bg-primary shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">SportShop</Link>
          
          <div className="relative hidden md:block w-1/3">
            <input 
              type="text" 
              placeholder="Rechercher des produits..." 
              className="w-full py-2 px-4 pr-10 rounded focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/catalog" className="text-white hover:text-secondary transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <div className="relative">
                  <button 
                    className="text-white text-xl"
                    onClick={() => setShowCart(!showCart)}
                  >
                    <FaShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  </button>
                  {showCart && <MiniCart />}
                </div>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/orders" className="text-white hover:text-secondary transition-colors">
                    Mes commandes
                  </Link>
                </li>
              )}
              <li className="relative">
                <button 
                  className="text-white hover:text-secondary transition-colors flex items-center"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <FaUser className="mr-1" />
                  {isAuthenticated ? (user?.firstName || 'Compte') : 'Compte'}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Mon profil
                          </Link>
                          {user?.role === 'admin' && (
                            <Link to="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Tableau de bord
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Déconnexion
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            to="/login" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Connexion
                          </Link>
                          <Link 
                            to="/register" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Créer un compte
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;