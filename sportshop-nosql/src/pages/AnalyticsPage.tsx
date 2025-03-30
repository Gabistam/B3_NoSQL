import React from 'react';

const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord d'analyse</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Les graphiques et statistiques seront affichés ici */}
        <p>Les données d'analyse seront affichées ici.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;