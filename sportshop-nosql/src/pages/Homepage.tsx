import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark rounded-lg overflow-hidden shadow-xl">
        <div className="container mx-auto px-4 py-16">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Équipez-vous pour la victoire
            </h1>
            <p className="text-white text-lg mb-8">
              Découvrez notre sélection d'équipements sportifs de qualité pour tous vos besoins
            </p>
            <Link to="/catalog" className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow transition-colors">
              Parcourir le catalogue
            </Link>
          </div>
        </div>
      </section>
      
      {/* À compléter avec les autres sections */}
    </div>
  );
};

export default HomePage;