'use client';

import React ,{ use }  from 'react';
// import SingleViewP from '../../../../components/collabs/SingleViewP'; // ton composant d'affichage
// import { notFound } from 'next/navigation';
import Parteners from '../../components/collabs/Parteners';
// import { useParams , usePathname  } from "next/navigation";

export default function PartenerPage() {
 
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
      <Parteners />
    </div>
  );
}
