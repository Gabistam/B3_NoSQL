import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>
      <div className="space-y-4">
        {/* Les articles du panier seront affichés ici */}
        <p>Le contenu de votre panier sera affiché ici.</p>
      </div>
    </div>
  );
};

export default CartPage;