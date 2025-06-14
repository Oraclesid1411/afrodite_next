'use client';

import { use } from 'react';
import React from 'react';
import CreerProfil from '../../../../components/comptes/CreerProfil'; // ton composant d'affichage
import { notFound } from 'next/navigation';

// import { useParams , usePathname  } from "next/navigation";

export default function CreerProfilPage({}) {
 
// const resolvedParams = use(params); // déstructure proprement la Promise
// const { type, id } = resolvedParams;

//   console.log(id)
//   console.log(type)
//   console.log("params" )
//   console.log(params )
//   // Tu peux ici filtrer selon le type pour charger la bonne source
//   if (!["1", "2", "3"].includes(type)) {
//     notFound(); // gestion 404
//   }

  return (
    <div className="container bgt_container">
      <CreerProfil />
    </div>
  );
}
