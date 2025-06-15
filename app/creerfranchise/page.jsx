'use client';

import { useSearchParams } from 'next/navigation';

export default function CreerFranchisePage() {
  const searchParams = useSearchParams();
  const demande = searchParams.get('demande');

  return (
    
    <div className="p-4">
      <h1>Créer une Franchise</h1>
      <p>Demande : {demande}</p>

      {/* Contenu spécifique à la création de franchise */}
    </div>
  );
}
