'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const dummyMannequins = [
  { id: 1, nom: 'Awa Koné', age: 22, taille: '1m78', ville: 'Abidjan' },
  { id: 2, nom: 'Fatou Diallo', age: 25, taille: '1m75', ville: 'Dakar' },
  { id: 3, nom: 'Nana Ama', age: 20, taille: '1m80', ville: 'Accra' },
];

export default function PageMannequins() {
  const [mannequins, setMannequins] = useState([]);

  useEffect(() => {
    // Remplace par un appel API réel plus tard
    setMannequins(dummyMannequins);
  }, []);

  return (
    <div className="mannequins_page">
      <div className="mannequins_header">
        <h2 className="page_title">Gestion des Mannequins</h2>
        <Link href="/admin/mannequins/nouveau" className="add_button">
          + Ajouter un mannequin
        </Link>
      </div>

      <div className="mannequins_table_wrapper">
        <table className="mannequins_table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Âge</th>
              <th>Taille</th>
              <th>Ville</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mannequins.map((m) => (
              <tr key={m.id}>
                <td>{m.nom}</td>
                <td>{m.age}</td>
                <td>{m.taille}</td>
                <td>{m.ville}</td>
                <td>
                  <button className="action_btn edit">✏️</button>
                  <button className="action_btn delete">🗑️</button>
                </td>
              </tr>
            ))}
            {mannequins.length === 0 && (
              <tr>
                <td colSpan="5">Aucune donnée disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
